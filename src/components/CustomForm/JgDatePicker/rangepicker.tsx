import React, { PureComponent } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface DateProps extends JgFormProps.IFormProps {
  extraProps?: { formatId: number };
}
class JgRangePicker extends PureComponent<DateProps> {
  onChange = value => {
    const { onChange } = this.props;
    const format = this.getDateFormat();
    let datearr = [];
    if (value.length > 0) {
      datearr = value.map(date => moment(date).format(format));
    }
    onChange && onChange(datearr);
  };

  // format
  // 0 :YYYY-MM-DD'
  // 1 :YYYY-MM-DD HH:mm:ss'
  getDateFormat = () => {
    const { extraProps } = this.props;
    const formatId = extraProps && extraProps.formatId;
    let dateFormat;
    switch (formatId) {
      case 0:
        dateFormat = 'YYYY-MM-DD';
        break;
      case 1:
        dateFormat = 'YYYY-MM-DD HH:mm:ss';
        break;
      default:
        dateFormat = 'YYYY-MM-DD';
        break;
    }
    return dateFormat;
  };

  render() {
    const { className, value, readOnly, ...rest } = this.props;
    if (readOnly && value) {
      return value.map(item => moment(item).format(this.getDateFormat())).join('~');
    }
    if (!value) {
      this.onChange([moment(),moment()]);
    }
    return (
      <RangePicker
        className={className}
        value={value ? value.map(item => moment(item)) : []}
        format={this.getDateFormat()}
        {...rest}
        // 放到最后面避免被rest覆盖
        onChange={this.onChange}
      />
    );
  }
}

export default JgRangePicker;
