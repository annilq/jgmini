import React from 'react';
import { List, Table } from 'antd';
import SubTableItemCell from '@/components/TableItem/SubTableItem';

function DetailList(props) {
  const { value = [] } = props;

  const columns = [
    {
      title: '编码',
      dataIndex: 'recordNo',
    },
    {
      title: '物料或设备名称',
      dataIndex: 'materialName',
    },
    {
      title: '规格型号',
      dataIndex: 'specs',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '总量',
      dataIndex: 'planNum',
    },
    {
      title: '单价（元）',
      dataIndex: 'price',
    },
    {
      title: '本次提交量',
      dataIndex: 'submitAmount',
    },
    {
      title: '已使用量',
      dataIndex: 'useNum',
    },
    {
      title: '完成率',
      dataIndex: 'finishRate',
      render: (text, record, index) => {
        return text ? `${Number(text).toFixed(2) * 100}%` : '0%';
      },
    },
  ];
  return (
    <List
      renderItem={item => (
        <List.Item>
          <SubTableItemCell
            data={item}
            columns={columns}
            // {...onItemClick && { onItemClick: () => onItemClick(index) }}
            showIndicator
          />
        </List.Item>
      )}
      locale={{ emptyText: '暂无数据' }}
      dataSource={value}
      split={false}
      style={{width: '100%'}}
    />
  );
}

export default DetailList;
