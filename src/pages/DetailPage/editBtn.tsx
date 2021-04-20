import React from 'react';
import { Image } from "remax/wechat"
import { getConfigFormFormCode } from '@/components/CustomForm/routerConfig';

function EditBtn(props) {
  const { data, formCode, showEdit, onToggle } = props;
  const { actionType } = data;
  const { operations = [] } = getConfigFormFormCode(formCode)

  const writeable = actionType === 'write' && operations.includes("EDIT");
  return (
    writeable && (
      <>
        {/* 如果显示了详情，则需要点击返回按钮返回 */}
        {!showEdit && (
          <Image src="/images/edit.png"
            alt="编辑"
            style={{
              position: "fixed",
              bottom: "100px",
              right: 10,
              zIndex: 999,
              width: 160,
              height: 160,
            }}
            onClick={onToggle}
          />
        )}
      </>
    )
  );
}
export default EditBtn;
