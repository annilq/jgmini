import React from 'react';
import { Form } from 'antd';

import Edit from './edit.js';

const FormItem = Form.Item;

function Main({ form, formCode }) {
  return (
    <div className="containers">
      <div className="form-container-content">
        <FormItem
          name="detailList"
          style={{ display: 'block', width: '100%' }}
          rules={[{ required: true, message: '请输入明细' }]}
          className="scroll-table"
        >
          <Edit form={form} formCode={formCode} />
        </FormItem>
      </div>
    </div>
  );
}
export default Main;
