import React from 'react'
import { Table } from 'antd';

function GanttList(props) {
  const { list, onExpandedChange } = props;
  const columns = [

    {
      title: '工作名称',
      dataIndex: 'workName',
      ellipsis: true,
    },
  ];


  function getNewList(data = []) {
    if (data.length === 0) {
      return
    }
    return data.map(({ children, ...item }) => ({ ...item, ...(children && children.length) && { children: getNewList(children) } }))
  }

  return (
    <Table
      columns={columns}
      dataSource={getNewList(list)}
      expandable={{ onExpandedRowsChange: onExpandedChange }}
      rowKey="id"
      pagination={false}
      rowClassName="gannt-list"
      className="gannt-table"
    />
  )
}

export default GanttList
