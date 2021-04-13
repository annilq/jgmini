import React from 'react';
import { DatePicker, Cell } from 'annar';

interface DateProps extends JgFormProps.IFormProps {
  extraProps?: { formatId: number };
}

function JgDatePicker(props: DateProps) {

  const { extraProps, value, onChange, placeholder } = props;
  const formatId = extraProps && extraProps.formatId;
  // format
  // 0 :YYYY-MM-DD'
  // 1 :YYYY-MM-DD HH:mm:ss'
  const getDateFormat = () => {
    let dateFormat;
    switch (formatId) {
      case 0:
        dateFormat = 'date';
        break;
      case 1:
        dateFormat = 'datetime';
        break;
      default:
        dateFormat = 'date';
        break;
    }
    return dateFormat;
  };
  return (
    <DatePicker
      value={value}
      type={getDateFormat()}
      // 放到最后面避免被rest覆盖
      onChange={onChange}
    >
      <Cell arrow border={false} valueAlign="left">
        {value}
      </Cell>
    </DatePicker>
  );
}


export default JgDatePicker;
