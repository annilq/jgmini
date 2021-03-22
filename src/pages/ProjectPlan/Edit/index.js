import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Button, notification, Input, Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { DataPicker, JgDatePicker, FilePreview } from '@/components/CustomForm';
import useRefresh from '@/hooks/useRefresh';

import styles from '@/components/CustomForm/index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

function BaseForm(props) {
  const {
    match: {
      params: { id },
    },
    dispatch,
    submitloading,
    // table,
  } = props;

  const [form] = Form.useForm();
  const refresh = useRefresh();
  const [data, setData] = useState({});
  // 如果有id就根据获取回显的详情数据
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'projectProcess/queryRemote',
        payload: { id },
        callback(data) {
          form.setFieldsValue(data);
          setData(data)
        },
      });
    }
  }, []);

  // 提交数据
  function handleSubmit(formValues) {
    const promise = new Promise(resolve => {
      // console.log(submitData);
      if (id) {
        dispatch({
          type: 'projectProcess/updateRemote',
          payload: {
            ...formValues,
            id,
          },
          callback(data) {
            if (data.code === 0) {
              resolve({ id });
            }
          },
        });
      } else {
        dispatch({
          type: 'projectProcess/addRemote',
          payload: formValues,
          callback(data) {
            if (data.code === 0) {
              resolve({ id: data.resp });
            }
          },
        });
      }
    });
    return promise;
  }

  // 保存表单数据
  function saveFormData(formValues) {
    handleSubmit(formValues).then(data => {
      notification.success({
        message: '操作成功', duration: 2, onClose() {
          NativeUtil.use("popWebHistory");
        }
      });
    });
  }

  // 发布表单
  function publishFormData(formValues) {
    dispatch({
      type: 'projectProcess/publishRemote',
      payload: { ...formValues, id },
      callback(data) {
        if (data.code === 0) {
          notification.success({
            message: '操作成功', duration: 2, onClose() {
              NativeUtil.use("popWebHistory");
            }
          });
        }
      },
    });
  }

  function onSelectProject(data) {
    form.setFieldsValue({ projectName: data.name });
    refresh();
  }
  const { recordStatus } = data
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
                  <FormItem label="项目名称" name="projectId" rules={[{ required: true, message: '请选择项目' }]} shouldUpdate>
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
                  <FormItem
                    name="projectName"
                    style={{ display: 'none' }}
                  >
                    <span />
                  </FormItem>
                  <FormItem label="合同工期开始时间" name="contractStartDate">
                    <JgDatePicker style={{ width: "100%" }} className="single" />
                  </FormItem>
                  <FormItem label="合同工期结束时间" name="contractEndDate">
                    <JgDatePicker style={{ width: "100%" }} className="single" />
                  </FormItem>
                  <FormItem label="计划说明" name="remark" className="mutiple">
                    <TextArea
                      placeholder="请输入计划说明"
                      row={6}
                    />
                  </FormItem>
                  <FormItem label="附件" name="attachId" className="single" noStyle>
                    <FilePreview value={data.attachId} label="附件" />
                  </FormItem>
                </div>
              </div>
            </div>
          </Form>
          <div className="actionBtns" style={{ backgroundColor: "#fafafa" }}>
            <Button
              type="primary"
              style={{ marginRight: '16px', padding: '0 20px', }}
              onClick={() => form.validateFields().then(saveFormData)}
              disabled={submitloading}
            >
              保存
            </Button>

            {recordStatus !== "publish" && (
              <Button
                style={{
                  padding: '0 20px',
                  backgroundColor: '#ffa646',
                  color: '#fff',
                  border: 'none',
                }}
                disabled={submitloading}
                onClick={() => form.validateFields().then(publishFormData)}
              >
                发布
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageHeaderWrapper>);
}

export default connect(({ projectProcess, loading }) => ({
  formdata: projectProcess.item,
  submitloading:
    loading.effects['projectProcess/approve'] ||
    loading.effects['projectProcess/updateRemote'] ||
    loading.effects['projectProcess/addRemote'] ||
    false,
}))(BaseForm);
