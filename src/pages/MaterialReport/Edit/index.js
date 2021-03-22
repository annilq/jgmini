import React from 'react';
import { Form } from 'antd';

import Plans from './planList';

const FormItem = Form.Item;

function Main({ form }) {
  return (
    <div className="containers">
      <div className="form-container-content">
        <FormItem
          style={{ display: 'block', width: '100%' }}
          className="scroll-table"
          shouldUpdate={(prevValues, curValues) => prevValues.projectId !== curValues.projectId}
        >
          {(formInstance) => {
            const formValues = formInstance.getFieldsValue();
            return (
              <FormItem name="detailList">
                <Plans projectId={formValues.projectId} />
              </FormItem>
            );
          }}
        </FormItem>
      </div>
    </div>
  );
}
export default Main;
