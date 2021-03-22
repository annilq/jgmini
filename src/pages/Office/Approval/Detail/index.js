import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Form } from 'antd';

import { useHeaderBar } from '@/hooks/useDetailCom';

import FlowCommonComponent from '@/components/FlowCommonComponent';

import styles from '@/components/CustomForm/index.less';
import { getRouterConfig } from '@/models/menu';
import Detail from '@/components/CustomForm/detail';

import AuditForm from './AuditForm';

function App({ flowData, dispatch, menu, loading, item }) {

  const [form] = Form.useForm();
  const { bizId, id, formCode, type, taskDetailId } = flowData;
  const { flag } = item;
  // 如果id不同调用详情接口
  useEffect(
    () => {
      if (!bizId) {
        return;
      }
      let curRouter;
      // 获取审批服务
      if (type === 'biz_allinone') {
        curRouter = getRouterConfig({ formCode: 'USERCREATE' });
        // 覆盖一下formCode
        // 用户自定义表单查询时候需要formCode
        curRouter.params = { formCode };
        curRouter.formCode = formCode;
        // 用户全自定义
      } else {
        curRouter = getRouterConfig({ formCode });
      }
      dispatch({
        type: 'menu/setCurRouter',
        payload: { curRouter },
      });
      // 根据服务获取审批详情
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: { id: bizId, taskDetailId },
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
  const { curRouter } = menu;
  const { headerBar: ButtonBar } = useHeaderBar(curRouter.componentPath);

  return (
    <Spin spinning={loading} tip="处理中...">
      <div className={styles.baseForm}>
        <Detail
          formCode={formCode}
          item={item}
          ISUSERCREATE={type === 'biz_allinone'}
          approval
          form={form}
          route={curRouter}
        />
        <FlowCommonComponent id={flowData.bizId} formCode={flowData.formCode} data={item} />
        {
          // flowData 中flag Y表示需要审批N表示不需要
          flowData && flag === 'Y'
            ? <AuditForm data={item} flowdata={flowData} approveForm={form} formCode={formCode} />
            : null
        }
        {ButtonBar && <ButtonBar formCode={formCode} data={item} store={window.g_app._store} />}
      </div>

    </Spin>
  );
}
export default connect(({ menu, workflow, jgTableModel, loading }) => ({
  flowData: workflow.flowData,
  item: jgTableModel.item,
  menu,
  loading:
    loading.effects['workflow/approval'] ||
    loading.effects['workflow/reject'] ||
    loading.effects['workflow/pass'] ||
    false,
}))(App);
// 调用window.g_app._store.dispatch({ type: 'workflow/flowData', payload: record });
