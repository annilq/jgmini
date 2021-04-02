import * as React from 'react';
import { View } from 'remax/ali';
export default props => {
  React.useEffect(() => {
    // 可以从 props.error 拿到错误信息用来做上报
    console.log(props.error);
  }, []);
  return <View>出错啦</View>;
};