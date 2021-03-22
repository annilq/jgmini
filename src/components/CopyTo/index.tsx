import React from 'react';
import { Input, Icon } from 'antd';

import DataPicker from '@/components/CustomForm/DataPicker';
function CopyTo({ onChange, value }) {
  const defaultValue = (value && JSON.parse(value)) || [];
  const names = defaultValue.map(item => item.name).join(',');
  function onChangeHandle(data) {
    const newData = data.map(({ name, id }) => ({
      name,
      id,
    }));
    onChange(JSON.stringify(newData));
  }
  return (
    <DataPicker
      extraProps={{
        formCode: 'User',
        multiple: true,
      }}
      placeholder="抄送人"
      onSelect={data => onChangeHandle(data)}
    >
      <div style={{ lineHeight: '30px' }}>
        抄送给
        <Input
          value={names}
          readOnly
          placeholder="抄送人"
          suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />}
          style={{ flex: 1, verticalAlign: 'middle' }}
        />
      </div>
    </DataPicker>
  );
}
export default CopyTo;
