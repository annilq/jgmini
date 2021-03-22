import React from 'react';
import { Form } from 'antd';

import Edit from './edit.js';

const FormItem = Form.Item;

function Main({ form, formCode }) {
  const formdata = form.getFieldsValue();

  const { contractCate } = formdata;
  // 施工合同隐藏掉
  if (!contractCate || contractCate === "5") {
    return false
  }
  return (
    <div className="containers">
      <div className="form-container-content">
        <FormItem
          name="detailList"
          style={{ display: 'block', width: '100%' }}
          className="scroll-table"
          // rules={[{ required: true, message: '请输入明细' }]}
        >
          <Edit form={form} formCode={formCode} />
        </FormItem>
      </div>
    </div>
  );
}
export default Main;
