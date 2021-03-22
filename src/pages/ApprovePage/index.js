import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ApproveDetail from '@/pages/Office/Approval/Detail';

function Main(props) {
  const {
    dispatch,
    location: {
      query: { bizId, id, formCode, type, taskDetailId },
    },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'workflow/flowData',
      payload: { bizId, id, formCode, type, taskDetailId },
    });
  }, []);
  return (
    <>
      <ApproveDetail />
    </>
  );
}

export default connect()(Main);
