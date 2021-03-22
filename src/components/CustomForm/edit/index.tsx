// 编辑或者查看详情的时候根据提交的拓展字段中的sysVersionId,versionId字段查表单配置用来显示，没有就不用查了
// 提交数据的时候要在拓展字段exts里面新增sysVersionId,versionId字段方便对拓展字段做版本控制
// 如果是修改sysVersionId,versionId取值来源拓展字段，新增的话取表单配置

import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import withRouter from 'umi/withRouter';
import { RouteComponentProps } from 'react-router';

import { Button, Col, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Loading from '@/components/Loading';

import { ConTypes } from '@/components/CustomForm/controlTypes';

import Edit from './edit';
import Approve from '@/components/CustomForm/Approve';
import CopyTo from '@/components/CopyTo';
import SectionHeader from '@/components/SectionHeader';
import styles from '../index.less';

import useFormConfig from '@/hooks/useFormConfig';

interface IProps extends FormComponentProps, RouteComponentProps {
  formCode: string;
  // 是否完全用户自定义
  ISUSERCREATE: boolean;
  [index: string]: any;
}

const initialState = {
  form: null,
  showPrompt: true,
  approveProcessId: '',
  sendUsers: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'form':
      return { ...state, form: action.data };
    case 'approveProcessId':
      return { ...state, approveProcessId: action.data };
    case 'sendUsers':
      return { ...state, sendUsers: action.data };
    case 'showPrompt':
      return { ...state, showPrompt: action.data };
    default:
      throw new Error();
  }
}

function BaseForm(props: IProps) {
  const {
    match: {
      params: { id },
    },
    dispatch,
    formCode,
    ISUSERCREATE,
    formdata,
    children,
    curRouter,
    submitloading,
    // table,
  } = props;
  const [{ form, approveProcessId, sendUsers, showPrompt }, reactDispatch] = useReducer(
    reducer,
    initialState
  );

  // 如果有id就根据获取回显的详情数据
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: id,
      });
    }
  }, []);

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
      exts: JSON.stringify({ controls, versionId, sysVersionId }),
    };
  }

  // 提交数据
  function handleSubmit(formValues, isDirty) {
    const promise = new Promise(resolve => {
      const { formName, approvable } = tableConfig;
      // 如果没有修改直接返回数据
      if (!isDirty) {
        resolve(formValues);
        return;
      }
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
          },
          callback(data) {
            if (data.code === 0) {
              resolve({ id });
            }
          },
        });
      } else {
        if (ISUSERCREATE) {
          submitData.approvable = approvable;
          submitData.formCode = formCode;
          submitData.formName = formName;
        }
        dispatch({
          type: 'jgTableModel/addRemote',
          payload: { ...submitData, approveProcessId, sendUsers },
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
  function saveFormData(formValues, isDirty) {
    handleSubmit(formValues, isDirty).then(data => {
      reactDispatch({ type: 'showPrompt', data: false });
      notification.success({ message: '操作成功' });
      props.history.goBack();
    });
  }

  // 提交审批表单数据
  function submitToApprove(formValues, isDirty) {
    if (!approveProcessId) {
      notification.warn({ message: '请选择审批流程' });
      return;
    }
    const submitData = getSubmitData(formValues);
    reactDispatch({ type: 'showPrompt', data: false });
    if (ISUSERCREATE) {
      const { formName, approvable } = tableConfig;
      submitData.approvable = !!approvable;
      submitData.formCode = formCode;
      submitData.formName = formName;
    }
    dispatch({
      type: 'jgTableModel/approve',
      payload: {
        ...submitData,
        id: id,
        approveProcessId,
        sendUsers,
      },
      callback: () => {
        notification.success({ message: '提交审批成功' });
        props.history.goBack();
      },
    });
    // handleSubmit(formValues, isDirty).then((data: any) => {
    //   reactDispatch({ type: 'showPrompt', data: false });
    //   dispatch({
    //     type: 'jgTableModel/approve',
    //     payload: {
    //       id: data.id,
    //       approveProcessId,
    //       sendUsers,
    //     },
    //     callback: () => {
    //       notification.success({ message: '提交审批成功' });
    //       props.history.goBack();
    //     },
    //   });
    // });
  }

  const { sysVersionId, versionId } = formdata;
  const { tableConfig, loading } = useFormConfig(formCode, { sysVersionId, versionId }, !!id);
  const { containers = [], approvable } = tableConfig;
  const values = { ...formdata, ...(curRouter.params || {}) };
  return (
    <Loading loading={loading}>
      <div className={styles.baseForm}>
        <Edit
          iseditmode={id ? 1 : 0}
          formCode={formCode}
          containers={containers}
          formdata={values}
          showPrompt={showPrompt}
          constValues={curRouter.params}
          wrappedComponentRef={formRef => {
            // 该函数调用过多，会持续触发reactDispatch
            // 如果有实例引用则不在触发reactDispatch
            // console.log(formRef);
            !form && formRef && reactDispatch({ type: 'form', data: formRef });
          }}
        >
          {children}
        </Edit>
        {approvable && (
          <div style={{ padding: '0 20px 20px', backgroundColor: '#fff' }}>
            <SectionHeader
              title="审批流程"
              style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
            />
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col span={24}>
                <Approve
                  formCode={formCode}
                  onChange={data => {
                    reactDispatch({ type: 'approveProcessId', data });
                  }}
                  value={approveProcessId}
                />
              </Col>
              <Col span={24}>
                <CopyTo
                  onChange={data => {
                    reactDispatch({ type: 'sendUsers', data });
                  }}
                  value={sendUsers}
                />
              </Col>
            </Row>
          </div>
        )}
        <div className="actionBtns" >
          <Button
            type="primary"
            style={{ padding: '0 20px' }}
            disabled={submitloading}
            onClick={() => form.validateFields(saveFormData)}
          >
            保存
          </Button>
          {approvable && (
            <Button
              type="danger"
              style={{ marginLeft: '16px' }}
              onClick={() => form.validateFields(submitToApprove)}
              disabled={submitloading}
            >
              提交审批
            </Button>
          )}
        </div>
      </div>
    </Loading>
  );
}

export default connect(({ jgTableModel, menu, loading }) => ({
  formdata: jgTableModel.item,
  curRouter: menu.curRouter,
  submitloading:
    loading.effects['jgTableModel/approve'] ||
    loading.effects['jgTableModel/updateRemote'] ||
    loading.effects['jgTableModel/addRemote'] ||
    false,
}))(withRouter(BaseForm));
