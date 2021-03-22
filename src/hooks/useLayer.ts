import { useState, useEffect } from 'react';

function useLayer(initVisible = false) {
  const [visible, setVisible] = useState(initVisible);
  // layer显示控制逻辑
  const setVisibleWrapper = function (value: boolean) {
    if (value) {
      NativeUtil.pushWebHistory(() => setVisible(false));
      setVisible(value)
    } else {
      NativeUtil.use("popWebHistory");
    }
  }

  useEffect(() => {
    if (initVisible) {
      NativeUtil.pushWebHistory(() => setVisible(false));
      setVisible(true);
    }
    return () => initVisible && NativeUtil.use("popWebHistory");
  }, []);

  return [visible, setVisibleWrapper] as const;
}
export default useLayer;
