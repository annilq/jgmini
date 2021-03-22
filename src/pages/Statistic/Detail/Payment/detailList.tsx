import React from 'react';
import TableWithPagination from '@/components/TableWithPagination';

function Detail(props) {
  const { data, loading, onPaginationChange } = props;
  const columns = [
    {
      dataIndex: "recordNo",
      title: "编号",
    },
    {
      dataIndex: "operatorName",
      title: "经办人",
    },
    {
      dataIndex: "paymentTime",
      title: "付款日期",
    },
    {
      dataIndex: "amount",
      title: "付款金额",
    },
    {
      dataIndex: "invoiceAmount",
      title: "已开发票金额",
    }
  ];

  return (
    <TableWithPagination
      loading={loading}
      data={data}
      columns={columns}
      onPaginationChange={onPaginationChange}
      rowClassName={(record, index) => {
        let className = '';
        if (index % 2 === 1) className = "darkRow";
        return className;
      }}
      showOrder
    />)
}

export default Detail;
