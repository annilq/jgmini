import React from 'react';
import { Form } from 'antd';

import Edit from './edit.js';

const FormItem = Form.Item;

function Main({ form, formCode, parentformdata }) {
  return (
    <div className="containers">
      <div className="form-container-content">
        <FormItem
          name="bizFinPaymentDetails"
          style={{ display: 'block', width: '100%' }}
          className="scroll-table"
        >
          <Edit form={form} formCode={formCode} parentformdata={parentformdata} />
        </FormItem>
      </div>
    </div>
  );
}
export default Main;
