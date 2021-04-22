import React, { useMemo } from 'react';
import { Cell } from 'annar';

type labelKey = string;
type valueKey = string;
interface Iprops {
  value: string;
  data: { label: string; value: string }[];
  readOnly?: boolean;
  label: string;
  onChange: (id: string) => void;
  optionKeys?: [labelKey, valueKey]
}

function Picker(props: Iprops) {
  const { data, value, onChange = () => { }, optionKeys = ["label", "value"], label } = props;

  const options = useMemo(() => {
    const [label, value] = optionKeys;
    // 如果data是字符串数组，则label和value都为本身值
    return data.map(item => ({ label: item[label] || item, value: item[value] || item }))
  }, [data, optionKeys]);
  
  const handleChange = (index) => {
    onChange(options[index].value)
  }
  const valueIndex = options.findIndex(item => item.value === value)
  return (
    <Cell.Picker
      label={label}
      align="left"
      arrow
      range={options}
      rangeKey="label"
      value={valueIndex}
      border={false}
      onChange={(v: any) => { handleChange(v) }}
    />
  );
}
export default Picker;
