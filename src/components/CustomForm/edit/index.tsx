// 编辑或者查看详情的时候根据提交的拓展字段中的sysVersionId,versionId字段查表单配置用来显示，没有就不用查了
// 提交数据的时候要在拓展字段exts里面新增sysVersionId,versionId字段方便对拓展字段做版本控制
// 如果是修改sysVersionId,versionId取值来源拓展字段，新增的话取表单配置

import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { View } from 'remax/wechat';
import { Button, Form } from 'annar';
import { useQuery } from 'remax';

import { ConTypes } from '@/components/CustomForm/controlTypes';
import Approve from '@/components/CustomForm/Approve';
import CopyTo from '@/components/CopyTo';
import SectionHeader from '@/components/SectionHeader';
import useFormConfig from '@/hooks/useFormConfig';
import useRefresh from '@/hooks/useRefresh';
import { getConfigFormPath } from '@/components/CustomForm/routerConfig'

import styles from '../index.less';

import Edit from './edit';

interface IProps {
  formCode: string;
  // 是否完全用户自定义
  ISUSERCREATE: boolean;
  [index: string]: any;
}

const initialState = {
  form: null,
  approveProcessId: '',
  sendUsers: null,
  nextNodeApprovers: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'approveProcessId':
      return { ...state, approveProcessId: action.data };
    case 'sendUsers':
      return { ...state, sendUsers: action.data };
    case 'nextNodeApprovers':
      return { ...state, nextNodeApprovers: action.data };
    default:
      throw new Error();
  }
}

function BaseForm(props: IProps) {
  const {
    dispatch,
    ISUSERCREATE,
    formdata,
    children,
    submitloading,
    // table,
  } = props;
  const { path, id, formCode } = useQuery();
  const config = getConfigFormPath(path)

  const { sysVersionId, versionId } = formdata;
  const { tableConfig, loading } = useFormConfig(formCode, { sysVersionId, versionId });
  const { containers = [], approvable, cid } = tableConfig;
  const values = { ...formdata, ...(config.params || {}) };

  const refresh = useRefresh();

  const [{ approveProcessId, nextNodeApprovers, sendUsers }, reactDispatch] = useReducer(
    reducer,
    initialState
  );
  const [form] = Form.useForm();
  // 如果有id就根据获取回显的详情数据
  useEffect(
    () => {
      async function syncData() {
        if (formdata.approveProcessId) {
          reactDispatch({ type: 'approveProcessId', data: formdata.approveProcessId });
        }
        if (formdata.sendUsers) {
          reactDispatch({ type: 'sendUsers', data: formdata.sendUsers });
        }
        if (formdata.nextNodeApprovers) {
          reactDispatch({ type: 'nextNodeApprovers', data: formdata.nextNodeApprovers });
        }
        await form.setFieldsValue({ ...formdata, ...(config.params || {}) });
        refresh()
      }
      if (id && formdata.id) {
        syncData()
      }
    },
    [id, formdata]
  );

  // 拓展字段exts提交格式

  // 获取系统和用户自定义属性的key并且将formValue里面相关数据删除
  function getSubmitData(formValues) {
    const { versionId, sysVersionId, containers } = tableConfig;
    const newData = { ...formValues };
    const controls = {};
    containers.forEach(container => {
      // 用户自定义字段
      if (container.type === '1') {
        container.controls.forEach(item => {
          const {
            controlCode,
            controlType,
            extraProps: { nameCode },
          } = item;
          controls[controlCode] = formValues[controlCode];
          delete newData[controlCode];
          if (controlType === ConTypes.DATAPICKER) {
            controls[nameCode] = formValues[nameCode];
            delete newData[nameCode];
          }
        });
      }
    });
    return {
      ...newData,
      // 判断是否有用户自定义表单
      exts: JSON.stringify({ controls, versionId, sysVersionId, formCode }),
    };
  }

  // 提交数据
  function handleSubmit(formValues) {
    const promise = new Promise(resolve => {
      const { formName, approvable } = tableConfig;
      const submitData = getSubmitData(formValues);
      // console.log(submitData);
      if (id) {
        dispatch({
          type: 'jgTableModel/updateRemote',
          payload: {
            ...submitData,
            id,
            approveProcessId,
            sendUsers,
            nextNodeApprovers,
            formCode
          },
          path,
          callback(data) {
            if (data.code === 0) {
              resolve({ id });
            }
          },
        });
      } else {
        if (ISUSERCREATE) {
          submitData.approvable = approvable;
          submitData.formName = formName;
        }
        // 添加到提交数据中方便后台查询
        dispatch({
          type: 'jgTableModel/addRemote',
          payload: { ...submitData, approveProcessId, nextNodeApprovers, sendUsers, formCode },
          path,
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


  function deleteFlow() {
    dispatch({
      type: 'jgTableModel/removeRemote', payload: id, callback() {
        wx.showToast({ title: '删除成功' });
        wx.navigateBack()
        // NativeUtil.use("popWebHistory");
      }
    });
  }

  // 保存表单数据
  function saveFormData(formValues) {
    handleSubmit(formValues).then(() => {
      wx.showToast({ title: '操作成功' });
      wx.navigateBack()
      // NativeUtil.use("popWebHistory");
    });
  }

  // 提交审批表单数据
  function submitToApprove(formValues) {
    const submitData = getSubmitData(formValues);
    if (ISUSERCREATE) {
      const { formName, approvable } = tableConfig;
      submitData.approvable = !!approvable;
      submitData.formName = formName;
    }
    dispatch({
      type: 'jgTableModel/approve',
      payload: {
        ...submitData,
        id,
        approveProcessId,
        sendUsers,
        nextNodeApprovers,
        formCode
      },
      callback: () => {
        wx.showToast({ title: '提交审批成}功' })
        wx.navigateBack()
        // NativeUtil.use("popWebHistory");
      },
    });
  }

  function validateFields(fn) {
    const [valid] = form.validateFields();
    console.log(form.validateFields());
    // isPassed, errorState, errorFields, nullValuesObj
    if (valid) {
      console.log(form.getFieldsValue());
      fn(form.getFieldsValue())
    } else {
      wx.showToast({ title: "", icon: "none" })
    }
  }

  // 判断是否需要验证超出预警
  function checkExceed(formValues, fn) {
    // 目前只有合同、付款与结算需要预警,在这里写死
    const checkExceedArrFormcode = ["outContract", "PaymentFinance", "Settle"];
    // 如果不需要验证，直接走之前的逻辑
    if (!checkExceedArrFormcode.includes(formCode)) {
      fn(formValues)
      return
    }
    const submitData = getSubmitData(formValues);
    if (ISUSERCREATE) {
      const { formName, approvable } = tableConfig;
      submitData.approvable = !!approvable;
      submitData.formName = formName;
    }
    dispatch({
      type: 'jgTableModel/checkExceed',
      payload: {
        ...submitData,
        id: id,
        formCode
      },
      callback: (resp) => {
        if (resp === "Y") {
          // Modal.confirm({
          //   title: '审批预警提示',
          //   content: '部分数据可能超出计划,是否继续执行审批',
          //   okText: '是',
          //   cancelText: '取消',
          //   onOk: () => {
          //     fn(formValues)
          //   }
          // })
        } else {
          fn(formValues)
        }
      },
    });
  }
  return (
    // <Skeleton loading={loading} active>
    <View className={styles.baseForm}>
      <Edit
        iseditmode={id ? true : false}
        formCode={formCode}
        containers={containers}
        // 本来不需要formdata的，但是会导致DataPicker默认显示不出值
        formdata={values}
        form={form}
        constValues={config.params}
      >
        {children}
      </Edit>
      {approvable && (
        <View style={{ backgroundColor: '#fff', marginTop: "20px" }}>
          <SectionHeader
            title="选择审批流程"
            style={{ width: '100%', lineHeight: '80px', marginBottom: '0', paddingLeft: '40px' }}
          />
          <Approve
            formCode={formCode}
            onChange={({ approveProcessId, nextNodeApprovers }) => {
              reactDispatch({ type: 'approveProcessId', data: approveProcessId });
              reactDispatch({ type: 'nextNodeApprovers', data: nextNodeApprovers });
            }}
            formdata={values}
            value={{ approveProcessId, nextNodeApprovers }}
          />
          <CopyTo
            onChange={data => {
              reactDispatch({ type: 'sendUsers', data });
            }}
            formdata={values}
            value={sendUsers}
          />
        </View>
      )}
      <View className="actionBtns" style={{ backgroundColor: "#fafafa" }}>
        {approvable && (
          <Button
            type="primary"
            onTap={() => validateFields((values) => {
              if (!approveProcessId) {
                wx.showToast({ title: '请选择审批流程', icon: "none" });
                return;
              } checkExceed(values, submitToApprove)
            })}
            disabled={submitloading}
          >
            提交审批
          </Button>
        )}
        {cid && <Button
          style={{
            backgroundColor: '#ffa646',
            color: '#fff',
            border: 'none',
          }}
          disabled={submitloading}
          onTap={() => validateFields((values) => checkExceed(values, saveFormData))}
        >
          保存
            </Button>}
        {id && (
          <Button
            look="danger"
            onTap={deleteFlow}
            disabled={submitloading}
          >
            删除
          </Button>
        )}
      </View>
    </View>
    // </Skeleton>
  );
}

export default connect(({ jgTableModel, loading }) => ({
  formdata: jgTableModel.item,
  submitloading:
    loading.effects['jgTableModel/approve'] ||
    loading.effects['jgTableModel/updateRemote'] ||
    loading.effects['jgTableModel/addRemote'] ||
    false,
}))(BaseForm);
