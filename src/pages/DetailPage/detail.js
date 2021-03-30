import React from 'react';
import { connect } from 'react-redux';
import { View } from 'remax/wechat';

import FlowCommonComponent from '@/components/FlowCommonComponent';

import useFormConfig from '@/hooks/useFormConfig';
import Detail from '@/components/CustomForm/detail';

import styles from '@/components/CustomForm/index.less';

function DetailPage(props) {
  const { item, formCode, detailActions: DetailActions } = props;
  const { sysVersionId, versionId, id } = item;

  const { tableConfig: config } = useFormConfig(formCode, { sysVersionId, versionId });
  console.log(item);
  return (
    <View className={styles.baseForm} style={{ height: "100%" }}>
      {/* 审批和查看详情用不同的模板 */}
      <Detail item={item} formCode={formCode} />
      {/* 公共模块 */}
      <FlowCommonComponent id={id} formCode={formCode} data={item} />
      {/* 底部操作栏，包含撤回，催办等逻辑 */}
      {DetailActions && <DetailActions formCode={formCode} data={item} config={config} />}
    </View>
  );
}

export default connect(({ loading }) => ({
  editLoading: loading.effects['jgTableModel/queryRemote'] || false,
}))(DetailPage);