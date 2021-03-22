import React from 'react';
import { connect } from 'react-redux';

import EditPng from '../../../public/edit.png';

function EditBtn(props) {
  const { data, operations = [], showEdit, onToggle } = props;
  const { actionType } = data;

  const writeable = actionType === 'write' && operations.includes("EDIT");
  return (
    writeable && (
      <>
        {/* 如果显示了详情，则需要点击返回按钮返回 */}
        {!showEdit && (
          <img src={EditPng}
            alt="编辑"
            style={{
              position: "fixed",
              bottom: "100px",
              right: 10,
              zIndex: 999,
              width: 80,
              height: 80,
            }}
            onClick={onToggle}
          />
        )}
      </>
    )
  );
}
export default connect(({ menu }) => ({
  operations: menu.curRouter.operations,
}))(EditBtn);
