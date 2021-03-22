import React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Skeleton } from 'antd';

import FlowCommonComponent from '@/components/FlowCommonComponent';

import useFormConfig from '@/hooks/useFormConfig';
import Detail from '@/components/CustomForm/detail';

import styles from '@/components/CustomForm/index.less';

function DetailPage(props) {
  const { item, formCode, editLoading, detailActions: DetailActions, route } = props;
  const { sysVersionId, versionId, id } = item;

  const { tableConfig: config } = useFormConfig(formCode, { sysVersionId, versionId });

  return (
    <Provider store={window.g_app._store}>
      <Skeleton loading={editLoading} active>
        <div className={styles.baseForm}>

          {/* 审批和查看详情用不同的模板 */}
          <Detail item={item} containers={config.containers} formCode={formCode} route={route} />

          {/* 公共模块 */}
          <FlowCommonComponent id={id} formCode={formCode} data={item} />

          {/* 底部操作栏，包含撤回，催办等逻辑 */}
          {DetailActions && <DetailActions formCode={formCode} data={item} config={config} store={window.g_app._store} />}
        </div>
      </Skeleton>
    </Provider>
  );
}

export default connect(({ loading }) => ({
  editLoading: loading.effects['jgTableModel/queryRemote'] || false,
}))(DetailPage);