import React from 'react';
import { Input, Icon } from 'annar';
import { View } from 'remax/wechat';

import DataPicker from '@/components/CustomForm/DataPicker';
function CopyTo({ onChange, value }) {
  const defaultValue = (value && JSON.parse(value)) || [];
  const names = defaultValue.map(item => item.name).join(',');
  const ids = defaultValue.map(item => item.id).join(',');
  function onChangeHandle(data) {
    const newData = data.map(({ name, id }) => ({
      name,
      id,
    }));
    onChange(JSON.stringify(newData));
  }
  const id = "copyToId"
  return (
    <DataPicker
      extraProps={{
        formCode: 'User',
        multiple: true,
      }}
      placeholder="抄送人"
      value={ids}
      id={id}
      formdata={{ [id]: ids, copyToName: names }}
      onSelect={data => onChangeHandle(data)}
    />
  );
}
export default CopyTo;
