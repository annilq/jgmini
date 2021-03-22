import React from 'react';
import { Form } from 'antd';
import Edit from './edit';

const FormItem = Form.Item;

function Main({ form }) {
  return (
    <div className="containers">
      <div className="form-container-content">
        <FormItem
          style={{ display: 'block', width: '100%' }}
          rules={[{ required: true, message: '请输入明细' }]}
          name="depotInOutDetailList"
        >
          <Edit form={form} />
        </FormItem>
      </div>
    </div>
  );
}
export default Main;
