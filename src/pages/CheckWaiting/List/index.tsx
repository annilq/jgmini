import React from 'react';
import CheckStatusButton from '@/components/StatusButton/CheckStatusButton';
// 1-通过
// 2-口头警告
// 3-书面整改（未发）
// 4-书面整改（已发）
const actionColumns = [{
  title: '检查结果',
  // width: 200,
  dataIndex: 'status',
  render: text => {
    return <CheckStatusButton data={text} />;
  },
},
];

export default actionColumns;
