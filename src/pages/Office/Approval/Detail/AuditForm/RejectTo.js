import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActionSheet, Button } from 'annar';
function RejectTo({ taskId, handleReject, prevApprovers = [], dispatch }) {
  const [visible, setVisible] = useState(false)
  useEffect(
    () => {
      dispatch({ type: 'workflow/getPrevNodesRemote', payload: { taskId } });
    },
    [taskId]
  );
  const data = prevApprovers.map(item => (
    {
      value: item.nodeId,
      text: item.nodeName,
      nodeId: item.nodeId,
      rejectType: 3
    }
  ))
  data.unshift(
    {
      text: "发起人",
      value: "1",
      rejectType: 2
    }

  );
  return (
    <>
      <ActionSheet
        open={visible}
        title="驳回到"
        actions={data}
        onCancel={() => setVisible(false)}
        cancelText="取消"
        onChange={(a, g, e) => {
          setVisible(false);
          const { nodeId, rejectType } = a
          handleReject({ value: nodeId, rejectType });
        }}
      />
      <Button
        shape="square"
        danger
        type="primary"
        onTap={() => setVisible(true)}
      >
        驳回
        </Button>
    </>)
}

export default connect(({ workflow }) => ({
  prevApprovers: workflow.prevApprovers,
}))(RejectTo);
