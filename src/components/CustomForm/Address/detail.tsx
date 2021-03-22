import React, { PureComponent } from 'react';
import addressData from './address';

class Address extends PureComponent<JgFormProps.IFormProps> {
  render() {
    const { value = [] } = this.props;
    let curtList = addressData;
    const address =
      value &&
      value.reduce((acc, cur, index) => {
        const current = curtList.find(item => item.value === cur);
        acc += `${index > 0 ? '/' : ''}${current.label}`;
        curtList = current.children;
        return acc;
      }, '');
    return <span>{address}</span>;
  }
}

export default Address;
