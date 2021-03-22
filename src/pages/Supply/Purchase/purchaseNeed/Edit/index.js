import React from 'react';
import { Form } from 'antd';
import TableForm from '../TableForm';

const FormItem = Form.Item;

function Main({ form }) {
  return (
    <FormItem
      name="list"
      label="需求明细"
      className="scroll-table"
      style={{ width: '100%' }}
      rules={[{ required: true, message: '请添加明细' }]}
    >
      <TableForm form={form} />
    </FormItem>
  );
}

export default Main;
