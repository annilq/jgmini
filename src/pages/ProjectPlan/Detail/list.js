import React from 'react'
import { Table } from 'antd';
import { TreePicker } from "@/components/CustomForm"
import { StarFilled, StarOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

function PlanList(props) {
  const { list } = props;
  const columns = [
    {
      title: '是否为里程碑',
      dataIndex: 'isMilestone',
      render: (text) => {
        return text ? <StarFilled style={{ color: "#f6be1c" }} /> : <StarOutlined />
      }
    },
    {
      title: '工作名称',
      dataIndex: 'workName',
    },
    {
      title: '前置工作',
      dataIndex: 'prevWork',
      render: (text, record, index) => {
        const prevWorkJson = text && JSON.parse(text) || [];
        const preVworkName = prevWorkJson.map(item => `${item.preWorkName}(${item.prevType})`).join(",")
        return <>{preVworkName}</>
      }
    },
    {
      title: '计划工期(天)',
      dataIndex: 'days',
    },
    {
      title: '计划起止日期',
      dataIndex: 'status',
      render: (text, { startDate, endDate }, index) => {
        return <>{startDate}~{ endDate}</>
      }
    },
    {
      title: '计划工作量',
      dataIndex: 'workload',
      render: (text, record, index) => {
        return (
          <>
            {text || 0}
            <TreePicker
              extraProps={{
                url: "/api/v1/system/unit/getAllUnit",
                parentNodeDisable: true,
              }}
              readOnly
              placeholder="单位"
              value={record.unit}
              style={{ width: 140 }}
            />
          </>)
      }
    },
    {
      title: '已完成工作量',
      dataIndex: 'finishWorkload',
      render: (text, record, index) => {
        return (
          <>
            {text || 0}
            <TreePicker
              extraProps={{
                url: "/api/v1/system/unit/getAllUnit",
                parentNodeDisable: true,
              }}
              readOnly
              placeholder="单位"
              value={record.unit}
              style={{ width: 140 }}
            />
          </>)
      }
    },
    {
      title: '完成度',
      dataIndex: 'finishRate',
      render: (text, record, index) => {
        return <>{(Number(text) * 100).toFixed(0) || 0}%</>
      }
    },
    {
      title: '是否完成',
      dataIndex: 'isOver',
      render: (text, record, index) => {
        return text ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#f5222d" }} />
      }
    }
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
      rowKey="id"
      pagination={false}
      rowClassName="gannt-list"
      className="gannt-table"
    />
  )
}


export default PlanList
