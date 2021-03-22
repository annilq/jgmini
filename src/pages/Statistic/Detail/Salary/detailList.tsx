import React from 'react';
import TableWithPagination from '@/components/TableWithPagination';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { ConTypes } from '@/components/CustomForm/controlTypes';

function Detail(props) {
  const { data, loading, onPaginationChange } = props;
  const columns = [
    {
      dataIndex: "recordNo",
      title: "编号",
    },
    {
      dataIndex: "year",
      title: "年份",
    },
    {
      dataIndex: "month",
      title: "月份",
      render: (_, record) =>
        <FormItemData
          data={{
            controlCode: 'month',
            controlType: ConTypes.SELECT,
            controlLabel: "月份",
            extraProps: {
              flag: "monthMap",
              multiple: true,
              type: 2,
            },
          }}
          formdata={record}
        />
    },
    {
      dataIndex: "amount",
      title: "金额",
    },
    {
      dataIndex: "invoiceAmount",
      title: "已开票金额",
    },
    {
      dataIndex: "accountType",
      title: "账户类型",
      render: (_, record) =>
        <FormItemData
          data={{
            controlCode: 'accountType',
            controlType: ConTypes.SELECT,
            controlLabel: "账户类型",
            extraProps: {
              flag: "accountTypeMap",
              type: 2,
            },
          }}
          formdata={record}
        />
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
