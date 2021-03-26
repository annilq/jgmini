import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Cell } from 'annar';
import { View, Text } from 'remax/wechat';

import Layer from '@/components/Layer';
import AuditRecord from '@/components/AuditRecord';
import CommentRecord from '@/components/CommentRecord';
import RelationModule from '@/components/RelationModule';

import useLayerVisible from '@/hooks/useLayer';

function App({ id, formCode, data }) {
  const [visible, setVisible] = useLayerVisible(false);
  const [type, setType] = useState(null);
  const { approveInstanceId, relateCount = 0 } = data;

  let modalCom = null;

  switch (type) {
    case 'RelationModule':
      modalCom = <RelationModule domainFormCode={formCode} domainId={id} />;
      break;
    case 'AuditRecord':
      modalCom = (
        <AuditRecord
          instanceId={approveInstanceId}
          title="审批记录"
          key="log"
        />
      );
      break;
    case 'CommentRecord':
      modalCom = (
        <CommentRecord
          entity={data}
          formCode={formCode}
          title="评论"
          key="comment"
        />
      );
      break;
    default:
      break;
  }
  const commonModule =
    (
      <View>
        {relateCount > 0 && (
          <Cell style={{ marginTop: "20px" }} label="关联模块" arrow border={false} onTap={() => {
            setType("RelationModule")
            setVisible(true);
          }}>
            <Text style={{ color: "#ccc", marginLeft: 20 }}>已关联{relateCount}条数据</Text>
          </Cell>
        )}
        {approveInstanceId && (
          <Cell style={{ marginTop: "20px" }} label="审批记录" arrow border={false} onTap={() => {
            setType("AuditRecord")
            setVisible(true);
          }} />
        )}
        <Cell style={{ marginTop: "20px" }} label="评论" arrow border={false} onTap={() => {
          setType("CommentRecord")
          setVisible(true);
        }} />
      </View>
    );

  return (
    <>
      {commonModule}
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
        onClose={()=>setVisible(false)}
      >
        {modalCom}
      </Layer>
    </>
  );
}
export default connect(({ workflow }) => ({
  flowData: workflow.flowData,
}))(App);
