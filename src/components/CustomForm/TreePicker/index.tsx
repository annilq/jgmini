// 已经确认过树形结构中的父级选项可以作为选择2019/7/1
import React from 'react';
import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';

import { Selector, SelectorPopup, Cell } from 'annar';
import { baseUrl } from '@/services/api';
import { View, Text, Picker } from 'remax/wechat';
import { useNativeEffect } from 'remax';

function TreePicker(props) {
  const {
    dispatch,
    value = [],
    onChange,
    placeholder,
    BackEndData,
    disabled,
    readOnly,
    extraProps: { type, url, candidates },
    ...rest
  } = props;
  const queryData = () => {
    // 这里会存在多个不同的url请求，所以还不能用公共的fetchBackEndDataloading控制
    if (url && !BackEndData[baseUrl + url]) {
      dispatch({ type: 'global/fetchBackEndData', payload: { url: baseUrl + url } });
    }
  };

  const getTreeDataName = memoizeOne((data = [], value) => {
    // console.log(data, value);
    let name = '';
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // 后台格式不唯一
      if (element.id == value) {
        name = element.name;
        return name;
      } else if (element.children) {
        name = getTreeDataName(element.children, value);
        if (name) {
          return name;
        }
      }
    }
    return name;
  });

  useNativeEffect(() => {
    queryData()
  }, [])
  // 本来这里可以根据nameCode直接显示出来，但是查询的时候如果也根据nameCode查询会查不到数据的，提交的参数应该用id查，
  // select和project查询接口传的值不一样，一个需要id，一个需要name，这样会导致，用nameCode或者controlCode查都不能同时满足这两个
  // 所以统一select不需要nameCode了，显示的时候让组件根据id和数据做显示
  // 但是遇到个问题就是通过接口拿数据时候，接口会调用很多次，需要优化
  let data;
  if (type === 1) {
    data = candidates;
  } else {
    data = BackEndData[baseUrl + url];
  }
  let name
  if (data) {
    name = getTreeDataName(data, value);
  }
  if (disabled || readOnly) {
    return <Text>{name ? name : (value && value.toString() || false)}</Text>;
  }
  // console.log(data);
  const generatorRangeData = (data) => {
    const result = [];
    data.forEach(({ name, id, children }) => {
      const col = { name, id }
      result.push(col);
      // if (children) {
      //   const subRange = generatorRangeData(children);
      // }
    });
    return result
  }
  const range = generatorRangeData(data)
  const current = range.find(item => item.id === value);
  // console.log(current, value);
  return (
    <Picker
      mode="multiSelector"
      value={value[0]}
      range={[range]}
      rangeKey="name"
      onColumnChange={() => { }}
      onChange={(e) => { const index = e.detail.value[0]; onChange(range[index].id) }}
    >
      <view>
        {current && current.name || "当前选择"}
      </view>
    </Picker>
  );
}

export default connect(({ global, loading }) => ({
  BackEndData: global.BackEndData,
  fetchBackEndDataloading: loading.effects['global/fetchBackEndData'] || false,
}))(TreePicker);
