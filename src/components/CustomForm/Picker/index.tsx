import React from 'react';
import { Cell } from 'annar';

interface Iprops {
  value: string;
  data: { label: string; value: string }[];
  readOnly?: boolean;
  placeholder: string;
  onChange: (id: string) => void;
}

function Picker(props: Iprops) {
  const { data, value, onChange = () => { }, placeholder, ...rest } = props;
  let defaultValue;
  if (typeof value === "string" && value) {
    defaultValue = value.split(',');
  } else if (typeof value === "number") {
    // 数据字典都是字符串类型
    defaultValue = [`${value}`]
  } else {
    defaultValue = []
  }
  console.log(data);
  return (
    <Cell.Picker
      label={placeholder}
      align="left"
      arrow
      range={data}
      rangeKey="label"
      value={defaultValue}
      border={false}
      onChange={(v: any) => onChange(v)}
    />
  );
}
export default Picker;
