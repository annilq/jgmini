import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

interface constants {
  key: string;
  value: string;
}

interface SelectorProps {
  flag: string;
  type: number;
  candidates?: [];
}

interface IProps {
  extraProps: SelectorProps;
  global?: { ConstantMap: { [index: string]: constants[] } };
}
interface ConnectProps {
  constantloading?: boolean;
  children: (data: any, formProps: any) => React.ReactElement;
  dispatch?: (params: any) => void;
}
function maptoProps({ global, loading }) {
  return {
    global,
    constantloading: loading.effects['global/fetchGlobalConstant'] || false,
  };
}
@connect(maptoProps)
class DataSelector extends PureComponent<IProps & ConnectProps> {
  queryData = () => {
    const {
      extraProps: { flag, type, candidates },
      global: { ConstantMap },
      constantloading,
      dispatch,
    } = this.props;
    let data = [];
    if (type === 1) {
      data = candidates;
      return data;
    } else if (type === 2) {
      if (flag && ConstantMap[flag]) {
        data = ConstantMap[flag];
      } else if (!constantloading) {
        dispatch({ type: 'global/fetchGlobalConstant' });
      }
      return this.tranformData(data);
    }
  };

  // 将数据转换成antd数据源的格式
  tranformData = data => {
    return data.map(item => {
      const { value, key, ...rest } = item;
      return { label: value, value: key, ...rest };
    });
  };

  render() {
    const data = this.queryData();
    const { children, extraProps, ...rest } = this.props;
    return <>{children(data, rest)}</>;
  }
}

export default DataSelector;
