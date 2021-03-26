/* eslint-disable no-undef */
import React from 'react';
import { Button, Form, Textarea } from 'annar';
import { connect } from 'react-redux';
import { View } from "remax/wechat"

import { ImageUpload, DataPicker } from '@/components/CustomForm';
import SectionHeader from '@/components/SectionHeader';
import useFormConfig from '@/hooks/useFormConfig';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';
import { ConTypes } from '@/components/CustomForm/controlTypes';
import RejectTo from './RejectTo';
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
  const [formInstance] = Form.useForm();
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
      wx.showModal({
        title: '审批预警提示',
        content: '部分数据可能超出计划,是否继续执行审批',
        confirmText: '是',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            fn(formValues)
          }
        }
      })
    } else {
      fn(formValues)
    }
  };
  const getFormValue = async () => {
    const value = await formInstance.getFieldsValue();
    console.log(value);
    return Promise.resolve(value)
  }
  const approval = (formValues) => {
    getFormValue().then((values) => {
      dispatch({
        type: 'workflow/approval',
        payload: {
          taskId,
          id,
          ...values,
          ...(canModifyColumn.length > 0 && { canModifyColumn: getModifyData(formValues) }),
        },
        callback: () => {
          wx.showModal({
            title: `审批成功`,
            content: '审批成功',
            duration: 2,
            success(res) {
              wx.navigateBack()
              // NativeUtil.use("updateProcess");
            }
          });
        },
      });
    });
  };

  const reject = (formValues, rejectParam) => {
    getFormValue().then((values) => {
      // 驳回时候填写审批意见
      console.log(values);
      if (!values.remark) {
        wx.showToast({
          title: '请输入审批意见',
          iocn: "none"
        })
        return;
      }
      dispatch({
        type: 'workflow/reject',
        payload: {
          id,
          taskId,
          ...rejectParam,
          ...values,
          ...(canModifyColumn.length > 0 && { canModifyColumn: getModifyData(formValues) }),
        },
        callback: () => {
          wx.showModal({
            title: `审批成功`,
            content: '审批成功',
            duration: 2,
            success(res) {
              wx.navigateBack()
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
    getFormValue().then((values) => {
      dispatch({
        type: 'workflow/pass',
        payload: { taskId, id, ...values },
        callback: () => {
          wx.showModal({
            title: `审批成功`,
            content: '审批成功',
            duration: 2,
            success(res) {
              wx.navigateBack()
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
    const [valid] = approveForm.validateFields()
    if (valid) {
      fn(approveForm.getFieldsValue())
    }
  };

  return (
    <View className="aduit-content" style={{ backgroundColor: '#fff', position: "relative", marginTop: "20px" }}>
      <SectionHeader
        title="审批"
        style={{ marginLeft: 40, marginBottom: 0, lineHeight: "60px" }}
      />
      <Form form={formInstance}>
        <FormItem name="remark" valueAlign="left">
          <Textarea rows={4} placeholder="请输入审批意见" />
        </FormItem>
        <FormItem name="picId" valueAlign="left">
          <ImageUpload label="图片" />
        </FormItem>
        {!loading && (
          <View className="actionBtns">
            <Button
              shape="square"
              onTap={() => validateUpdateForm((values) => notify(values, pass))}
              style={{ backgroundColor: "#08ba7c", color: "#fff", border: "none" }}
            >
              保留意见
              </Button>
            <RejectTo
              taskId={taskId}
              handleReject={(data) => {
                validateUpdateForm((values) => reject(values, data));
              }}
            />
            <Button
              shape="square"
              type="primary"
              onTap={() => validateUpdateForm((values) => notify(values, approval))}
            >
              通过
              </Button>
          </View>
        )}
      </Form>
    </View>
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
