import React, { PureComponent } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

interface DateProps extends JgFormProps.IFormProps {
  extraProps?: { formatId: number };
}

class JgDatePicker extends PureComponent<DateProps> {
  onChange = value => {
    const { onChange } = this.props;
    const format = this.getDateFormat();
    let date = null;
    if (value) {
      date = moment(value).format(format);
    }
    onChange && onChange(date);
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
    const { className, value, ...rest } = this.props;
    if (!value) {
      this.onChange(moment());
    }
    return (
      <DatePicker
        className={className}
        value={value ? moment(value) : null}
        format={this.getDateFormat()}
        {...rest}
        // 放到最后面避免被rest覆盖
        onChange={this.onChange}
      />
    );
  }
}

export default JgDatePicker;
