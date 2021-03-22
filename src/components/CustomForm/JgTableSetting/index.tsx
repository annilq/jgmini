import React, { PureComponent } from 'react';
import { Button, Icon, Modal, Tabs } from 'antd';
import { connect } from 'react-redux';

import { setLocalCols } from '@/utils/table';

import SettingConfig from './SettingConfig';

import styles from './index.less';

const { TabPane } = Tabs;

interface IProps {
  formCode: string;
  [index: string]: any;
}

interface IStates {
  visible: boolean;
}

@connect()
class TableSettingPanel extends PureComponent<IProps, IStates> {
  state = {
    visible: false,
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  tableListChange = columns => {
    const { formCode, dispatch } = this.props;
    setLocalCols(formCode, columns);
    dispatch({
      type: 'table/setCurCols',
      payload: { columns },
    });
    this.onClose();
  };

  saveToRemote = async searchArr => {
    const { formCode, dispatch } = this.props;
    if (searchArr) {
      dispatch({
        type: 'table/saveSearchConfig',
        payload: { formCode, content: JSON.stringify(searchArr) },
        callback() {
          dispatch({ type: 'table/searchConfig', payload: { formCode } });
        },
      });
      this.onClose();
    }
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Button
          onClick={this.showModal}
          style={{
            paddingLeft: '12px',
            paddingRight: '12px',
            fontSize: '8px',
            color: '#2e3033',
            border: '1px solid #e0e0e0',
          }}
        >
          <Icon type="setting" style={{ color: '#52C41A' }} />
          设置
        </Button>
        <Modal
          visible={visible}
          maskClosable={false}
          onCancel={this.onClose}
          className={styles['setting-modal']}
          footer={null}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="列表配置" key="1">
              <SettingConfig
                configKey="isdisplayInList"
                onChange={this.tableListChange}
                onClose={this.onClose}
              />
            </TabPane>
            <TabPane tab="搜索框配置" key="2">
              <SettingConfig
                configKey="isSearchAble"
                onChange={this.saveToRemote}
                onClose={this.onClose}
              />
            </TabPane>
          </Tabs>
        </Modal>
      </>
    );
  }
}

export default TableSettingPanel;
