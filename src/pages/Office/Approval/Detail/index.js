import React from 'react';
import { connect } from 'react-redux';
import { useNativeEffect } from 'remax';
import { Form } from 'annar';
import { View } from 'remax/wechat';


import FlowCommonComponent from '@/components/FlowCommonComponent';
import DetailActions from '@/components/LayerHeader/detailActions';

import styles from '@/components/CustomForm/index.less';
import Detail from '@/components/CustomForm/detail';
import { getConfigFormFormCode } from '@/components/CustomForm/routerConfig'

import AuditForm from './AuditForm';

function App({ flowData, dispatch, item }) {
  const [form] = Form.useForm();
  const { bizId, id, formCode, type, taskDetailId } = flowData;
  const { flag } = item;
  // 如果id不同调用详情接口
  let newformCode = formCode;
  // 获取审批服务
  if (type === 'biz_allinone') {
    newformCode = 'USERCREATE';
    // 用户全自定义
  }
  const config = getConfigFormFormCode(newformCode);
  const { path } = config
  useNativeEffect(
    () => {
      if (!bizId) {
        return;
      }
      // 根据服务获取审批详情
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: { id: bizId, taskDetailId },
        path,
        callback: async (data) => {
          // 设置表单信息
          await form.setFieldsValue(data)
        },
      });
      // 获取可编辑字段
      dispatch({ type: 'workflow/getCanModifyColumn', payload: { instanceId: id } });
    },
    [bizId]
  );

  // 先去各个模块的目录下找detail组件，如果没有就用默认的公共Detail组件

  return (
    <View className={styles.baseForm}>
      <Detail
        formCode={formCode}
        item={item}
        ISUSERCREATE={type === 'biz_allinone'}
        approval
        form={form}
      />
      <FlowCommonComponent id={flowData.bizId} formCode={flowData.formCode} data={item} />
      {
        // flowData 中flag Y表示需要审批N表示不需要
        flowData && flag === 'Y'
          ? <AuditForm data={item} flowdata={flowData} approveForm={form} formCode={formCode} />
          : null
      }
      <DetailActions formCode={formCode} data={item} />
    </View>
  );
}
export default connect(({ workflow, jgTableModel }) => ({
  flowData: workflow.flowData,
  item: jgTableModel.item,
}))(App);
// 调用window.g_app._store.dispatch({ type: 'workflow/flowData', payload: record });
