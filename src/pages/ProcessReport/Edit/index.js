import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from "moment"

import { Button, notification, Input, Form, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { DataPicker, JgDatePicker, ImageUpload } from '@/components/CustomForm';
import useRefresh from '@/hooks/useRefresh';

import styles from '@/components/CustomForm/index.less';

import Plans from "./planList"

const FormItem = Form.Item;
const { TextArea } = Input;

function BaseForm(props) {
  const {
    match: {
      params: { id },
    },
    location: {
      query: { projectId }
    },
    dispatch,
    submitloading,
    // table,
  } = props;
  const [form] = Form.useForm();
  const refresh = useRefresh();
  // 如果有id就根据获取回显的详情数据
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'projectProcessReport/queryRemote',
        payload: { id },
        callback(data) {
          form.setFieldsValue(data);
        },
      });
    }
  }, []);

  // 如果有projectId就根据获取回显的详情数据
  useEffect(() => {
    if (projectId) {
      dispatch({
        type: 'project/queryRemote',
        payload: { id: projectId },
        callback({ name, id }) {
          form.setFieldsValue({ projectId: id, projectName: name });
          refresh();
        },
      });
    }
  }, [projectId]);

  // 提交数据
  function handleSubmit(formValues) {
    dispatch({
      type: 'projectProcessReport/addRemote',
      payload: formValues,
      callback(data) {
        notification.success({ message: '操作成功' });
        NativeUtil.use("popWebHistory");
      },
    });
  }

  function onSelectProject(data) {
    form.setFieldsValue({ projectName: data.name });
    refresh();
  }

  function validateFields(fn) {
    form
      .validateFields()
      .then(values => {
        fn(values);
      })
      .catch(err => {
        const { errorFields } = err;
        message.error(errorFields[0].errors.toString());
      });
  }

  return (
    <PageHeaderWrapper>
      <div className={styles.baseForm}>
        <div style={{ flex: 1 }}>
          <Form layout="horizontal" form={form}>
            <div
              className="containers"
            >
              <div className="form-container-content">
                <div data-controlcode>
                  <FormItem className="single" label="项目名称" name="projectId" rules={[{ required: true, message: '请选择项目' }]} shouldUpdate>
                    <DataPicker
                      extraProps={{
                        formCode: 'Project',
                      }}
                      formdata={{ ...form.getFieldsValue() }}
                      onSelect={data => onSelectProject(data)}
                      // 清空作用
                      onChange={() => onSelectProject({})}
                      placeholder="项目"
                    />
                  </FormItem>
                </div>
                <FormItem
                  name="projectName"
                  style={{ display: 'none' }}
                >
                  <span />
                </FormItem>
                <div data-controlcode>
                  <FormItem className="mutiple" label="填报标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
                    <Input />
                  </FormItem>
                </div>
                <div data-controlcode>
                  <FormItem className="mutiple" label="填报周期开始时间" name="startDate" rules={[{ required: true, message: '请填写填报周期开始时间' }]}>
                    <JgDatePicker
                      style={{ width: "100%" }}
                      disabledDate={(current) => {
                        return current > Moment().endOf('day');
                      }}
                    />
                  </FormItem>
                </div>
                <div data-controlcode>
                  <Form.Item className="mutiple" label="填报周期结束时间" name="endDate" rules={[{ required: true, message: '请填写填报周期结束时间' }]}>
                    <JgDatePicker
                      style={{ width: "100%" }}
                      disabledDate={(current) => {
                        return current > Moment().endOf('day');
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div
              className="containers"
            >
              <div className="form-container-content">
                <div data-controlcode>
                  <Form.Item className="mutiple" shouldUpdate={(prevValues, curValues) => prevValues.projectId !== curValues.projectId}>
                    {(formInstance) => {
                      const formValues = formInstance.getFieldsValue()
                      return (
                        <FormItem name="details">
                          <Plans projectId={formValues.projectId} />
                        </FormItem>
                      );
                    }}
                  </Form.Item>
                </div>
                <div data-controlcode>
                  <FormItem className="mutiple" label="填报说明" name="remark">
                    <TextArea
                      placeholder="请输入填报说明"
                      row={6}
                    />
                  </FormItem>
                </div>
                <div data-controlcode>
                  <FormItem className="mutiple" label="图片" name="picId">
                    <ImageUpload />
                  </FormItem>
                </div>
              </div>
            </div>
          </Form>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              type="primary"
              style={{ marginRight: '16px', padding: '0 20px', }}
              onClick={() => validateFields(handleSubmit)}
              disabled={submitloading}
            >
              提交
            </Button>
          </div>
        </div>
      </div>
    </PageHeaderWrapper>);
}

export default connect(({ projectProcessReport, loading }) => ({
  formdata: projectProcessReport.item,
  submitloading:
    loading.effects['projectProcessReport/approve'] ||
    loading.effects['projectProcessReport/updateRemote'] ||
    loading.effects['projectProcessReport/addRemote'] ||
    false,
}))(BaseForm);
