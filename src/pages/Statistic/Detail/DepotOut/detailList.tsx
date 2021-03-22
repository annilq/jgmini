import React from 'react';

import { TreePicker } from "@/components/CustomForm"
import TableWithPagination from '@/components/TableWithPagination';

function Detail(props) {
  const { data, loading, onPaginationChange } = props;

  const columns = [
    {
      dataIndex: "recordNo",
      title: "编号",
    },
    {
      dataIndex: "materialName",
      title: "物资名称",
    },
    {
      dataIndex: "specs",
      title: "规格",
    },
    {
      dataIndex: "unit",
      title: "单位",
      render: (text) =>
        <TreePicker
          extraProps={{
            url: "/api/v1/system/unit/getAllUnit",
            parentNodeDisable: true,
          }}
          readOnly
          placeholder="单位"
          value={text}
          style={{ width: 140 }}
        />
    },
    {
      dataIndex: "quantity",
      title: "出库数量",
    },
    {
      dataIndex: "price",
      title: "单价",
    },
    {
      dataIndex: "amount",
      title: "总金额",
    },

  ];

  return (
    <TableWithPagination
      loading={loading}
      data={data}
      columns={columns}
      onPaginationChange={onPaginationChange}
      rowClassName={(_, index) => {
        let className = '';
        if (index % 2 === 1) className = "darkRow";
        return className;
      }}
      showOrder
    />
  );
}

export default Detail;
