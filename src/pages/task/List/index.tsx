import React from 'react';
import TaskStatusButton from '@/components/StatusButton/TaskStatusButton';

const actionColumns = [
  {
    title: '任务状态',
    width: 100,
    dataIndex: 'taskStatusDesc',
    render: (text, record) => {
      return (
        <TaskStatusButton data={record} />
      );
    },
  },
  {
    title: '是否延期',
    width: 100,
    dataIndex: 'delayDesc',
    render: (text, record) => {
      return text ? <span style={{ color: '#ff4d4f' }}> {text}</span> : '否';
    },
  },
  {
    title: '负责人',
    width: 100,
    dataIndex: 'principalName',
  },
  {
    title: '审核人',
    width: 100,
    dataIndex: 'approverName',
  },
  //   {
  //     title: '任务状态',
  //     width: 200,
  //     dataIndex: 'status',
  //   },
];

export default actionColumns;
