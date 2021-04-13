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
  const { data, value, onChange = () => { }, placeholder } = props;
  const handleChange = (index) => {
    onChange(data[index].value)
  }
  const valueIndex = data.findIndex(item => item.value === value)
  return (
    <Cell.Picker
      label={placeholder}
      align="left"
      arrow
      range={data}
      rangeKey="label"
      value={valueIndex}
      border={false}
      onChange={(v: any) => { handleChange(v) }}
    />
  );
}
export default Picker;
