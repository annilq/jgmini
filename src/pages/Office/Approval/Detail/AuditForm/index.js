/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import { Button, Input, Popover, notification, Modal, Form } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { connect } from 'react-redux';
import { layerContentStyle } from '@/common/styles/layer';

import { ImageUpload, DataPicker } from '@/components/CustomForm';
import SectionHeader from '@/components/SectionHeader';
import useFormConfig from '@/hooks/useFormConfig';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';
import { ConTypes } from '@/components/CustomForm/controlTypes';
import RejectTo from './RejectTo';
import Comment from './comment';

const FormItem = Form.Item;

function AuditForm(props) {

  const {
    dispatch,
    formCode,
    flowdata: { taskDetailId: taskId, id },
    approveForm,
    data: { canAddApprover, exceedFlag },
    canModifyColumn,
    loading,
  } = props;
  const formRef = useRef();

  const [{ names, value }, setApprovers] = useState({ names: "", value: "" });
  const { tableConfig } = useFormConfig(formCode);
  const columnsData = getColumnsFromContainersByFliter(tableConfig.containers, () => true);

  const getModifyData = formValues => {
    const data = canModifyColumn.reduce((acc, cur) => {
      acc[cur] = formValues[cur];
      const col = columnsData.find(item => item.controlCode === cur);
      if (col.controlType === ConTypes.DATAPICKER) {
        acc[col.extraProps.nameCode] = formValues[col.extraProps.nameCode]
      }
      return acc;
    }, {});
    return data;
  };

  const notify = (formValues, fn) => {

    if (exceedFlag === "Y") {
      Modal.confirm({
        title: '审批预警提示',
        icon: <ExclamationCircleOutlined />,
        content: '部分数据可能超出计划,是否继续执行审批',
        okText: '是',
        cancelText: '取消',
        onOk: () => {
          fn(formValues)
        }
      })
    } else {
      fn(formValues)
    }
  };

  const approval = (formValues) => {
    formRef.current.validateFields().then((values) => {
      dispatch({
        type: 'workflow/approval',
        payload: {
          taskId,
          id,
          ...values,
          ...(approveForm.isFieldsTouched() &&
            canModifyColumn.length > 0 && { canModifyColumn: getModifyData(formValues) }),
        },
        callback: () => {
          notification.info({
            message: `审批成功`,
            description: '审批成功',
            duration: 2,
            onClose() {
              NativeUtil.use("close");
              // NativeUtil.use("updateProcess");
            }
          });
        },
      });
    });
  };

  const reject = (formValues, rejectParam) => {
    formRef.current.validateFields().then((values) => {
      // 驳回时候填写审批意见
      if (!values.remark) {
        notification.warn({
          message: '请输入审批意见',
        });
        return;
      }
      dispatch({
        type: 'workflow/reject',
        payload: {
          id,
          taskId,
          ...rejectParam,
          ...values,
          ...(approveForm.isFieldsTouched() &&
            canModifyColumn.length > 0 && { canModifyColumn: getModifyData(formValues) }),
        },
        callback: () => {
          notification.info({
            message: `审批成功`,
            description: '审批成功',
            duration: 2,
            onClose() {
              NativeUtil.use("close");
              // NativeUtil.use("updateProcess");
            }
          });
        },
      });
    });
    // rejectType: 2 默认驳回到发起人
    // rejectType: 3 默认驳回到指定节点
  };

  const pass = () => {
    formRef.current.validateFields().then((values) => {
      dispatch({
        type: 'workflow/pass',
        payload: { taskId, id, ...values },
        callback: () => {
          notification.info({
            message: `审批成功`,
            description: '审批成功',
            duration: 2,
            onClose() {
              NativeUtil.use("close");
              // NativeUtil.use("updateProcess");
            }
          });
        },
      });

    });
    // rejectType: 2 默认驳回到发起人
  };

  // 验证审批时候可以修改的表单
  const validateUpdateForm = (fn) => {
    approveForm.validateFields().then(fn);
  };

  const onSelectApprovers = (data) => {
    const names = data && data.map(item => item.name).join(',');
    const newData = data && data.map(({ name, id }) => ({
      name,
      id,
    }));
    formRef.current.setFieldsValue({ nextNodeApprovers: JSON.stringify(newData) });
    setApprovers({ names })
  }

  const onApproversValueChanged = (value) => {
    setApprovers({ value, names: null })
  }

  return (
    <div className="aduit-content" style={{ backgroundColor: '#fff', padding: '0 12px', position: "relative", marginTop: "10px" }}>
      <SectionHeader
        title="审批"
        style={{ marginLeft: 8, marginBottom: 0, lineHeight: "30px" }}
      />
      <Form
        layout="vertical"
        style={{ ...layerContentStyle }}
        ref={formRef}
      >
        <FormItem name="remark" label="审批意见">
          <Comment />
        </FormItem>
        {/* 
              <FormItem name="fileId" label="附件">
                <FileUpload />
              </FormItem>
            */}
        <FormItem name="picId">
          <ImageUpload label="图片" />
        </FormItem>
        {canAddApprover === "Y" && (
          <FormItem name="nextNodeApprovers" label="下一级审批人">
            <DataPicker
              extraProps={{
                formCode: 'User',
                multiple: true,
              }}
              placeholder="审批人"
              onSelect={data => onSelectApprovers(data)}
              onChange={data => onApproversValueChanged(data)}
              formdata={{ nextNodeApprovers: value }}
            >
              <Input
                value={names}
                placeholder="审批人"
                style={{ flex: 1, verticalAlign: 'middle' }}
              />
            </DataPicker>
          </FormItem>
        )
        }
        {!loading && (
          <div className="actionBtns">
            <Button
              onClick={() => validateUpdateForm((values) => notify(values, pass))}
              disabled={loading}
              style={{ backgroundColor: "#08ba7c", color: "#fff", border: "none" }}
            >
              保留意见
              </Button>
            <Popover
              content={
                <RejectTo
                  taskId={taskId}
                  handleReject={(data) => {
                    validateUpdateForm((values) => reject(values, data));
                  }}
                />
              }
              title="驳回到"
              trigger="click"
            >
              <Button
                type="danger"
                disabled={loading}
              >
                驳回
                </Button>
            </Popover>
            <Button
              type="primary"
              onClick={() => validateUpdateForm((values) => notify(values, approval))}
              disabled={loading}
            >
              通过
              </Button>
          </div>
        )}
      </Form>
    </div>
  );
}


export default connect(({ workflow, loading }) => ({
  loading:
    loading.effects['workflow/approval'] ||
    loading.effects['workflow/reject'] ||
    loading.effects['workflow/pass'] ||
    false,
  canModifyColumn: workflow.canModifyColumn,
}))(AuditForm);
