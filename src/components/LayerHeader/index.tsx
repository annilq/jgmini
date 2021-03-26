import React, { useEffect } from 'react';
import { View } from "remax/wechat"
// 用这个组件来记录页面跳转了几次
function LayerHeader(props) {
  const { onClose = () => wx.navigateBack(), children, data = {}, title, rightButton = false } = props;
  // useEffect(() => {
  //   onClose && NativeUtil.pushWebHistory(onClose);
  //   return () => { };
  // }, []);
  return (
    <View style={{ textAlign: 'center', position: 'relative', display: "none" }}>
      {children}
      <View onClick={onClose} style={{ position: 'absolute' }}>
        返回
      </View>
      <View style={{ flex: '1' }}>{title || data.name || '详情'}</View>
      {rightButton && (
        <View style={{ position: 'absolute', right: '0', top: '0' }}>{rightButton}</View>
      )}
    </View>
  );
}
export default LayerHeader;
