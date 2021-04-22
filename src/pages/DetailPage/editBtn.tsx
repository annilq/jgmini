import React from 'react';
import { Image } from "remax/wechat"
import { getConfigFormFormCode } from '@/components/CustomForm/routerConfig';

function EditBtn(props) {
  const { data, formCode, showEdit, onToggle } = props;
  const { actionType } = data;
  const { operations = [] } = getConfigFormFormCode(formCode)

  const writeable = actionType === 'write' && operations.includes("EDIT");
  return (
    writeable && !showEdit && (
      <Image src="/images/edit.png"
        style={{
          position: "fixed",
          bottom: "100px",
          right: 10,
          zIndex: 99,
          width: 160,
          height: 160,
        }}
        onClick={onToggle}
      />
    )
  )
}
export default EditBtn;
