import React, { PureComponent } from 'react';
// import { Cascader } from 'antd';
import addressData from './address';

class Address extends PureComponent<JgFormProps.IFormProps> {
  onChange = record => {
    const { onChange } = this.props;
    onChange(record);
  };

  render() {
    const { value } = this.props;
    return (
      // <Cascader options={addressData} value={value} onChange={this.onChange} placeholder="请选择" />
      false
    );
  }
}

export default Address;
