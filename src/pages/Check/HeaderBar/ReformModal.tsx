import React from 'react';
import { Button, message, Form } from 'antd';
import { connect } from "react-redux"
import Layer from '@/components/Layer';
import Edit from '@/components/CustomForm/edit/edit';
import useFormConfig from '@/hooks/useFormConfig';

import styles from '@/components/CustomForm/index.less';

interface IProps {
  data: object;
  visible: boolean;
  onClose: () => void;
  [index: string]: any;
}

function ReformModal(props: IProps) {
  const { visible, onClose, project, dispatch, data, loading } = props;
  const formCode = 'Reform';

  const { tableConfig } = useFormConfig(formCode);
  const [form] = Form.useForm();

  function submit(values) {
    const { versionId, sysVersionId } = tableConfig;
    // 质量1安全2
    dispatch({
      type: 'qualityReform/addRemote',
      payload: {
        ...values,
        projectId: project.id,
        inspectionId: data.id,
        formCode,
        exts: JSON.stringify({ versionId, sysVersionId, formCode }),
      },
      callback() {
        onClose();
        dispatch({
          type: 'jgTableModel/queryRemote',
          payload: data.id,
        });
        dispatch({
          type: 'jgTableModel/listRemote',
        });
      },
    });
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
    <Layer
      type="drawer"
      visible={visible}
      width="100%"
    >
      <div className={styles.baseForm} style={{ padding: '0' }}>
        <Edit
          formCode={formCode}
          containers={tableConfig.containers}
          form={form}
        />
        <div className="actionBtns">
          <Button onClick={() => onClose()}>
            取消
            </Button>
          <Button
            type="primary"
            disabled={loading}
            onClick={() => validateFields(submit)}>
            确定
            </Button>
        </div>
      </div>
    </Layer>
  );
}
export default connect(({ jgTableModel, project, loading }) => ({
  project: project.project,
  data: jgTableModel.item,
  loading: loading.effects['qualityReform/addRemote']
}))(ReformModal);
