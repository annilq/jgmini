import React from 'react';
import { Button, notification, Form } from 'antd';
import { connect } from 'react-redux';

import { ConTypes } from '@/components/CustomForm/controlTypes';
import useFormConfig from '@/hooks/useFormConfig';
import Layer from '@/components/Layer';

import Edit from '@/components/CustomForm/edit/edit';
import Extra from '../Edit/index';

import styles from '@/components/CustomForm/index.less';

function TaskModal({ dispatch, parentId, onClose, visible, data = {} }) {
  function addTask(params) {
    const callback = function (response) {
      if (response && response.info) {
        notification.success({ message: response.info });
        onClose();
      }
    };
    if (data.id) {
      dispatch({ type: 'task/updateRemote', payload: { ...params, id: data.id }, callback });
    } else {
      dispatch({
        type: 'task/addRemote',
        payload: { ...params, parentId: parentId },
        callback,
      });
    }
  }
  return (
    <Layer
      title="任务"
      visible={visible}
      onClose={() => onClose()}
      width="80vw"
      footer={null}
      className={styles.baseForm}
      getContainer={() => document.fullscreenElement || document.body}
    >
      <Task onSubmit={formdata => addTask(formdata)} data={data} onClose={onClose} />
    </Layer>
  );
}

function Task({ onSubmit, onClose, data = {} }) {
  const [form] = Form.useForm();
  const { tableConfig: config } = useFormConfig('Task');
  if (!config) {
    return false;
  }

  function getSubmitData(formValues) {
    const { versionId, sysVersionId, containers } = config;
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
    onSubmit({
      ...newData,
      // 判断是否有用户自定义表单
      exts: JSON.stringify({ controls, versionId, sysVersionId }),
    });
  }
  return (
    <>
      <Edit containers={config.containers} formCode="Task" formdata={data} form={form}>
        {Extra}
      </Edit>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Button type="primary" onClick={() => form.validateFields().then(getSubmitData)}>
          保存
        </Button>
        <Button onClick={onClose} style={{ marginLeft: '10px' }}>
          取消
        </Button>
      </div>
    </>
  );
}

export default connect()(TaskModal);
