import React from 'react';
import { Form } from 'antd';

import Edit from './detailList.js';
import EditInvoiceList from './invoiceList.js';

const FormItem = Form.Item;

function Main({ form, formCode, parentformdata }) {
  return (
    <div className="containers">
      <div className="form-container-content">
        <FormItem
          name="materialList"
          style={{ display: 'block', width: '100%' }}
          className="scroll-table"
        >
          <Edit form={form} formCode={formCode} parentformdata={parentformdata} />
        </FormItem>
      </div>
      <div className="form-container-content">
        <FormItem
          name="invoiceList"
          style={{ display: 'block', width: '100%' }}
          className="scroll-table"
        >
          <EditInvoiceList form={form} formCode={formCode} parentformdata={parentformdata} />
        </FormItem>
      </div>
    </div>
  );
}
export default Main;
