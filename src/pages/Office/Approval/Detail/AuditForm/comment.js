import React from 'react';
import { Input } from 'antd';
import Template from '@/components/CustomForm/Template';

const { TextArea } = Input;

function Comment({ onChange, ...rest }) {

  return (
    <>
      <TextArea rows={4} placeholder="请输入审批意见" onChange={onChange} {...rest} />
      <Template onChange={value => onChange(value)} controlCode="approval" formCode="Approval" />
    </>
  );
}

export default Comment;
