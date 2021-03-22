import React from 'react';
import { ReformStatusButton } from '@/components/StatusButton'; // 1-通过
// 2-口头警告
// 3-书面整改（未发）
// 4-书面整改（已发）
const actionColumns = [
  {
    title: '整改状态',
    // width: 200,
    dataIndex: 'status',
    render: (text, data) => {
      return <ReformStatusButton data={data} />;
    },
  },
];

export default actionColumns;
