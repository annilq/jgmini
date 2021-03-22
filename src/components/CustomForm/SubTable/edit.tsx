import React from 'react';
import { Button, Modal } from 'antd';

import Edit from '@/components/CustomForm/edit/edit';

import TableList from './tableList';
import styles from '../index.less';

interface SubTableStates {
  data: any;
  visible: boolean;
  showPrompt: boolean;
  // 用来判断是否是编辑
  editIndex: number;
}

class EditableTable extends React.Component<JgFormProps.IFormProps, SubTableStates> {
  state = {
    data: {},
    visible: false,
    showPrompt: true,
    editIndex: -1,
  };
  form: any;
  isSum: boolean;

  addRecord = () => {
    this.setState({ data: {}, visible: true, showPrompt: false, editIndex: -1 });
  };

  remove = index => {
    const { value } = this.props;
    value.splice(index, 1);
    this.onChange(value);
  };

  editDetail = index => {
    const { value } = this.props;
    // 修改的时候标注index，修改不跟进id判断，直接根据index判断
    this.setState({ data: value[index], visible: true, showPrompt: false, editIndex: index });
  };

  // 单个询价记录修改
  onConfirm = newData => {
    const { value = [], tableConfig = {} } = this.props;
    const { sysVersionId, versionId } = tableConfig;
    const { editIndex } = this.state;
    if (editIndex === -1) {
      value.push({ ...newData, exts: JSON.stringify({ sysVersionId, versionId }) });
    } else {
      value.splice(editIndex, 1, { ...newData, exts: JSON.stringify({ sysVersionId, versionId }) });
    }
    this.onChange(value);
  };

  onChange(value) {
    const { onChange } = this.props;
    onChange(value);
    this.onCancel();
  }

  onCancel = () => {
    this.setState({ visible: false, showPrompt: false });
  };

  render() {
    const { data, visible, showPrompt } = this.state;
    const { formdata, parentFormCode, tableConfig, value } = this.props;
    if (!tableConfig) {
      return false;
    }
    const { containers, formName, formCode } = tableConfig;
    return (
      <div>
        <TableList
          value={value}
          containers={containers}
          editcols
          editDetail={this.editDetail}
          remove={this.remove}
        />
        <Modal
          destroyOnClose
          title={formName}
          visible={visible}
          onCancel={this.onCancel}
          width="80vw"
          footer={null}
          className={styles.baseForm}
        >
          <Edit
            containers={containers}
            formCode={formCode}
            formdata={data}
            parentformdata={{ formCode: parentFormCode, formdata }}
            showPrompt={showPrompt}
            wrappedComponentRef={form => (this.form = form)}
          />
          <Button
            type="primary"
            onClick={() => this.form.validateFields(this.onConfirm)}
            style={{ marginBottom: '24px' }}
          >
            保存
          </Button>
        </Modal>
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.addRecord}
          icon="plus"
        >
          新增
        </Button>
      </div>
    );
  }
}

export default EditableTable;
