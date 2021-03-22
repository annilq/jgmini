import React from 'react';
import { Form } from 'antd';
import EnquireList from './EnquireList';

const FormItem = Form.Item;

function Main({ form }) {
  return (
    <FormItem
      name="enquiryMaterialList"
      label="询价明细"
      noStyle
      rules={[{ required: true, message: '请输入明细' }]}
    >
      <EnquireList form={form} />
    </FormItem>
  );
}
export default Main;
