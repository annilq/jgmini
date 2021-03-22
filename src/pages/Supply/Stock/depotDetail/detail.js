import React, { PureComponent } from 'react';
import { getDepotDetailType, getDepotDetailTransferNum } from '@/utils/utils';
import TableWithPagination from '@/components/TableWithPagination';
import { TreePicker } from '@/components/CustomForm';

class TableForm extends PureComponent {

  render() {
    const { data, loading, onPageRemote } = this.props;
    const columns = [
      {
        title: '物资名称',
        dataIndex: 'materialName',
      },
      {
        title: '计量单位',
        dataIndex: 'unit',
        render: (text, record) =>
          <TreePicker
            extraProps={{
              url: '/api/v1/system/unit/getAllUnit',
              parentNodeDisable: true,
            }}
            placeholder="单位"
            value={text}
            readOnly
            style={{ width: 140 }}
          />,
      },
      {
        title: '数量',
        dataIndex: 'num',
        render: (text, record) => {
          return <span>{getDepotDetailTransferNum(record.formType) + text}</span>;
        },
      },
      {
        title: '类型',
        dataIndex: 'formType',
        render: (text, record) => {
          return <span>{getDepotDetailType(text)}</span>;
        },
      },
      {
        title: '单价',
        dataIndex: 'price',
      },
      {
        title: '总金额',
        dataIndex: 'totalAmount',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
    ];
    return (
      <>
        <TableWithPagination columns={columns} data={data} loading={loading} onPaginationChange={onPageRemote} />
      </>
    );
  }
}

export default TableForm;
