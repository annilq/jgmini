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
      render: (_, record) => <FormItemData
        data={{
          controlCode: "id",
          controlType: ConTypes.DATAPICKER,
          controlLabel: "项目",
          extraProps: { formCode: "Settle", formType: "system", nameCode: "recordNo", linkable: true }
        }}
        formdata={record}
      />
    }, {
      dataIndex: "projectName",
      title: "项目名称",
    },
    {
      dataIndex: "amount",
      title: "结算金额",
    },
    {
      dataIndex: "paidAmount",
      title: "已付款金额",
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
