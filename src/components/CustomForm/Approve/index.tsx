import React, { PureComponent } from 'react';
import { Modal, Icon, Input, Radio } from 'antd';
import { findProcessList } from '@/services/workflow/approval';

import FlowChart from '@/components/FlowChart/flowDefine';

import styles from './index.less';

interface SelectProps extends JgFormProps.IFormProps {
  formCode: string;
}

class ApproveSelect extends PureComponent<SelectProps> {
  state = { data: [], visible: false, value: '', instanceId: '' };
  async componentDidMount() {
    const { formCode } = this.props;
    const data = await findProcessList({ formCode });
    if (data) {
      this.setState({ data: data.resp });
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  showModal = () => {
    const { value } = this.props;
    this.setState({ visible: true, value });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onConfirm = () => {
    const { value } = this.state;
    if (value) {
      this.props.onChange(value);
    }
    this.handleCancel();
  };

  onDoubleClick = value => {
    this.props.onChange(value);
    this.handleCancel();
  };

  render() {
    const { data = [], visible, value } = this.state;
    const { value: propsValue } = this.props;
    const flow = data.find(item => item.id === propsValue);
    return (
      <>
        <Input
          value={flow ? flow.definitionName : ''}
          placeholder="请选择审批流程版本"
          onClick={this.showModal}
          readOnly
          suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />}
        />
        <Modal
          destroyOnClose
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.onConfirm}
          width={'80vw'}
          style={{ paddingBottom: '0', height: 'auto', maxHeight: '820px', overflow: 'hidden' }}
        >
          <h1 style={{ fontSize: '20px' }}>请选择审批流程版本</h1>
          <div className={styles.approve}>
            <div className={styles['approve-section']}>
              <div className={styles['approve-title']}>流程名称</div>
              <Radio.Group
                onChange={this.onChange}
                value={value}
                className={styles['approve-group']}
              >
                {data.map(item => (
                  <div
                    className={styles['approve-item']}
                    key={item.id}
                    style={{ backgroundColor: item.id === value ? '#f5f5f5' : '#fff' }}
                    onDoubleClick={e => {
                      e.stopPropagation();
                      this.onDoubleClick(item.id);
                    }}
                  >
                    <Radio value={item.id} className={styles['approve-item-radio']}>
                      {item.definitionName}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className={styles['approve-section']} style={{ backgroundColor: '#f5f5f5' }}>
              <div className={styles['approve-title']}>流程图</div>
              <div>{value ? <FlowChart instanceId={value} /> : ''}</div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ApproveSelect;
