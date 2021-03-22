// 已经确认过树形结构中的父级选项可以作为选择2019/7/1
import React from 'react';
import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';

import { TreeSelect } from 'antd';
import { baseUrl } from '@/services/api';

const { TreeNode } = TreeSelect;

interface TreeSelectorProps {
  type: number;
  url?: string;
  nameCode?: string;
  parentNodeDisable?: boolean;
  candidates?: any;
}

interface IProps extends JgFormProps.IFormProps {
  extraProps: TreeSelectorProps;
  disabled: boolean;
  placeholder: string;
}

interface IStates {
  data: { id: string; name: string }[];
}

function maptoProps({ global, loading }) {
  return {
    BackEndData: global.BackEndData,
    fetchBackEndDataloading: loading.effects['global/fetchBackEndData'] || false,
  };
}
@connect(maptoProps)
class TreePicker extends React.PureComponent<IProps, IStates> {
  state = {
    data: [],
  };
  componentDidMount() {
    // 获取数据
    this.queryData();
  }

  queryData = async () => {
    const {
      extraProps: { url },
      BackEndData,
      fetchBackEndDataloading,
      dispatch,
    } = this.props;
    if (url && !BackEndData[baseUrl + url] && !fetchBackEndDataloading) {
      dispatch({ type: 'global/fetchBackEndData', payload: { url: baseUrl + url } });
    }
  };

  getOptions = memoizeOne(data => {
    const {
      extraProps: { parentNodeDisable },
    } = this.props;
    return (
      data &&
      data.map(item => {
        return (
          <TreeNode
            value={item.id}
            title={item.name}
            key={item.id}
            disabled={!!(parentNodeDisable && item.children)}
          >
            {this.getOptions(item.children)}
          </TreeNode>
        );
      })
    );
  });

  getTreeDataName = memoizeOne((data = [], value) => {
    // console.log(data, value);
    let name = '';
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // 后台格式不唯一
      if (element.id == value) {
        name = element.name;
        return name;
      } else if (element.children) {
        name = this.getTreeDataName(element.children, value);
        if (name) {
          return name;
        }
      }
    }
    return name;
  });
  onChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };
  // 本来这里可以根据nameCode直接显示出来，但是查询的时候如果也根据nameCode查询会查不到数据的，提交的参数应该用id查，
  // select和project查询接口传的值不一样，一个需要id，一个需要name，这样会导致，用nameCode或者controlCode查都不能同时满足这两个
  // 所以统一select不需要nameCode了，显示的时候让组件根据id和数据做显示
  // 但是遇到个问题就是通过接口拿数据时候，接口会调用很多次，需要优化
  render() {
    let data;
    const {
      value,
      placeholder,
      disabled,
      BackEndData,
      extraProps: { type, url, candidates },
      readOnly,
    } = this.props;
    if (type === 1) {
      data = candidates;
    } else {
      data = BackEndData[baseUrl + url];
    }
    if (disabled || readOnly) {
      if (data) {
        const name = this.getTreeDataName(data, value);
        return name;
      }
      return false;
    }
    return (
      <TreeSelect
        value={value}
        onChange={this.onChange}
        placeholder={placeholder}
        allowClear
        // disabled={disabled}
      >
        {this.getOptions(data)}
      </TreeSelect>
    );
  }
}

export default TreePicker;
