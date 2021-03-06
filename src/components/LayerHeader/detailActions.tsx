import React from 'react';
import { connect } from 'react-redux';
import { View } from 'remax/wechat';

import { Button } from 'annar';

function DetailActions(props) {
  const { data, dispatch, formCode,path, config = { approvable: "", formName: "" } } = props;
  const {
    id,
    approveProcessId,
    approveInstanceId,
    actionType,
    adminType,
    canUrge,
    canRevoke
  } = data;
  const { approvable, formName } = config;

  function handleClose() {
    // 如果从消息进入，则调用此方法可以直接关闭webView，所以不能用history.goBack
    wx.navigateBack()
  }

  function approve() {
    dispatch({
      type: 'jgTableModel/approve',
      path,
      payload: {
        ...data,
        id,
        approvable,
        formCode,
        formName,
        approveProcessId,
      },
      callback: () => {
        wx.showToast({
          success() {
            handleClose()
          },
          title: '提交审批成功'
        });
        dispatch({
          type: 'jgTableModel/listRemote',
          formCode
        });
      },
    });
  }

  function revoke() {    
    dispatch({
      type: 'workflow/revoke',
      payload: {
        instanceId: approveInstanceId,
      },
      callback: () => {
        wx.showToast({
          success() {
            handleClose()
          },
          title: '撤回审批成功'
        });
      },
    });
  }

  function forcePass() {
    dispatch({
      type: 'workflow/forcePass',
      payload: {
        instanceId: approveInstanceId,
      },
      callback: () => {
        wx.showToast({
          success() {
            handleClose()
          },
          title: '审批成功'
        });
        dispatch({ type: 'jgTableModel/pageRemote', formCode });
      },
    });
  }

  function remind() {
    dispatch({
      type: 'workflow/remind',
      payload: {
        instanceId: approveInstanceId,
      },
      callback: () => {
        wx.showToast({ title: '催办成功' });
      },
    });
  }

  let showApproveBtn = false;
  if (approvable && approveProcessId && actionType === 'write') {
    showApproveBtn = true;
  }
  return (
    <View className="actionBtns" style={{ boxShadow: "0 0 8px 0 #8c8c8c" }}>
      {adminType === 'Y' && (
        <Button
          shape="square" block look="warning"
          onTap={() => forcePass()}>
          强制通过
        </Button>
      )}
      {showApproveBtn && (
        <Button
          shape="square"
          type="primary"
          onTap={() => approve()}>
          提交审批
        </Button>
      )}
      {canUrge === "Y" && (
        <Button
          shape="square"
          type="primary"
          onTap={() => remind()}>
          催办
        </Button>)}
      {canRevoke === 'Y' && (
        <Button
          shape="square" block look="warning"
          onTap={() => revoke()}>
          撤回
        </Button>
      )}
    </View>
  );
}
export default connect()(DetailActions);
