import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'remax/wechat';
import { useQuery } from 'remax';

import ApproveDetail from '@/pages/Office/Approval/Detail';

function Main(props) {
  const {
    dispatch,
  } = props;
  const query = useQuery();
  const bizId = query.bizId
  useEffect(() => {
    console.log(query);
    dispatch({
      type: 'workflow/flowData',
      payload: query,
    });
  }, [bizId]);
  return (
    <View>
      <ApproveDetail />
    </View>
  );
}

export default connect()(Main);
