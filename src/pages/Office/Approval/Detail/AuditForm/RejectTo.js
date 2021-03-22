import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './rejectto.less';

function RejectTo({ taskId, handleReject, prevApprovers, dispatch }) {
  useEffect(
    () => {
      dispatch({ type: 'workflow/getPrevNodesRemote', payload: { taskId } });
    },
    [taskId]
  );
  const ListCom = prevApprovers.map(item => (
    <div
      key={item.nodeId}
      onClick={() => handleReject({ rejectType: 3, rejectToNodeId: item.nodeId })}
    >
      {item.nodeName}
    </div>
  ));
  ListCom.unshift(
    <div key={-1} onClick={() => handleReject({ rejectType: 2 })}>
      发起人
    </div>
  );
  return <div className={styles.rejectList}>{ListCom}</div>;
}

export default connect(({ workflow }) => ({
  prevApprovers: workflow.prevApprovers,
}))(RejectTo);
