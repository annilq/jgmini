import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';

import SectionHeader from '@/components/SectionHeader';

import CheckList from './list';
import CheckDetail from './CheckDetail';

const FormItem = Form.Item;

function Main({ form, project }) {
  const formdata = form.getFieldsValue()
  const projectId = project.id || formdata.projectId;
  return (
    <div className="containers">
      <SectionHeader
        title="检查明细"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: 20 }}
      />
      <div className="form-container-content">
        <div data-controlcode>
          <FormItem
            name="inspectionItemName"
            label="检查项"
            rules={[{ required: true, message: '请选择检查项' }]}
          >
            <CheckDetail form={form} projectId={projectId} />
          </FormItem>
        </div>
        <FormItem
          name="inspectionItemId"
          style={{ display: 'none' }}
        >
          <span />
        </FormItem>
        <div data-controlcode>
          <FormItem
            name="inspectionDetails"
            style={{ display: 'block', width: '100%' }}
            rules={[{ required: true, message: '请添加检查明细' }]}
          >
            <CheckList form={form} />
          </FormItem>
        </div>
      </div>
    </div>
  );
}
export default connect(({ project }) => ({
  project: project.project,
}))(Main);
