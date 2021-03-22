import React, { PureComponent } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Checkbox, Button } from 'antd';
import { connect } from 'react-redux';

import { moveToIndex } from '@/utils/table';

import moveIcon from './move.png';

interface IProps {
  configKey: 'isSearchAble' | 'isdisplayInList';
  [index: string]: any;
}

interface IStates {
  visible: boolean;
  columns: any[];
}
// 根据key 是search还是tablelist，如果是search则请求接口，在接口的callback里面setState,
// 接口有数据就用接口的，没有数据就用默认配置的

class SearchSettingPanel extends PureComponent<IProps, IStates> {
  state = {
    columns: [],
    visible: false,
  };

  // 在更新的时候不会重新调用这个方法，有点逻辑问题
  componentDidMount() {
    const {
      table: { columnsState, searchListConfig },
      configKey,
    } = this.props;
    if (configKey === 'isdisplayInList') {
      const newState = columnsState.map(item => {
        // 设置默认值,如果不是false就是true
        item[configKey] = item[configKey] !== false;
        return item;
      });
      this.setState({ columns: newState });
    } else {
      this.setState({ columns: searchListConfig || [] });
    }
  }

  onSelect = (obj, e) => {
    const { configKey } = this.props;
    let { columns } = this.state;
    let compareKey;
    if (configKey === 'isdisplayInList') {
      compareKey = 'dataIndex';
    } else {
      compareKey = 'controlCode';
    }
    columns = columns.map(item => {
      if (item[compareKey] === obj[compareKey]) {
        item[this.props.configKey] = e.target.checked;
      }
      return item;
    });
    this.setState({ columns });
  };

  onCheckAllChange = e => {
    const { checked } = e.target;
    let { columns } = this.state;
    columns = columns.map(item => {
      item[this.props.configKey] = checked;
      return item;
    });
    this.setState({ columns });
  };

  get checkAll() {
    const { columns } = this.state;
    return columns.every(item => item[this.props.configKey] === true);
  }

  onSorted = e => {
    const { columns } = this.state;
    const newColos = moveToIndex(columns, e);
    this.setState({ columns: newColos });
    this.props.onChange(newColos);
  };

  onChange = () => {
    const { columns } = this.state;
    this.props.onChange(columns);
  };

  render() {
    const { columns } = this.state;
    return (
      <div className="simple-page-scroller" style={{ lineHeight: '44px' }}>
        <div style={{ backgroundColor: '#e6f7ff', padding: '0 11px', marginTop: '17px' }}>
          <Checkbox onChange={this.onCheckAllChange} checked={this.checkAll}>
            全选
          </Checkbox>
          <span style={{ color: '#1890ff', float: 'right' }}>
            已显示项目:{columns.filter(item => item[this.props.configKey] === true).length}
          </span>
        </div>
        <Container onDrop={this.onSorted}>
          {columns.map(item => (
            <Draggable key={item.controlCode || item.dataIndex}>
              <Checkbox
                className="draggable-item"
                onChange={e => this.onSelect(item, e)}
                checked={item[this.props.configKey] === true}
                style={{ padding: '0 11px', width: '100%' }}
              >
                {item.controlLabel || item.title}
                <img src={moveIcon} style={{ float: 'right', marginTop: '14px' }} />
              </Checkbox>
            </Draggable>
          ))}
        </Container>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={this.onChange} style={{ marginRight: '10px' }}>
            确认
          </Button>
          <Button onClick={this.props.onClose}>取消</Button>
        </div>
      </div>
    );
  }
}

export default connect(({ table }) => ({
  table,
}))(SearchSettingPanel);
