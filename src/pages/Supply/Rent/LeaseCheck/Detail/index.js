import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { query } from '@/services/rent/leaseInDetail';
import TableWithPagination from '@/components/TableWithPagination';
import { TreePicker } from '@/components/CustomForm';

const cols = [
  {
    title: '设备名称',
    dataIndex: 'machineName',
  },
  {
    title: '规格型号',
    dataIndex: 'specs',
  },
  {
    title: '进场\\退场总数量',
    dataIndex: 'totalNum',
    render: (text, record) => (
      <>
        {record.isInOrOut === '1' && '-'} {record.totalNum}{' '}
        <TreePicker
          extraProps={{
              nameCode: 'unit',
              url: '/api/v1/system/unit/getAllUnit',
              combineType: 2,
            }}
          readOnly
          value={record.unit}
        />
      </>
      ),
  },

  {
    title: '创建人',
    dataIndex: 'creatorName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

function Main(props) {
  const { id } = props;

  const [data, setData] = useState([]);

  async function queryData(params = {}) {
    const newparams = { machineId: id, ...params };
    const response = await query(newparams);
    if (response && response.resp) {
      const { resp } = response;
      setData(resp);
    }
  }

  function paginationChange(params) {
    queryData(params);
  }

  useEffect(
    () => {
      queryData();
    },
    [id]
  );

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <TableWithPagination
        data={data}
        // rowKey="id"
        columns={cols}
        onPaginationChange={paginationChange}
      />
    </div>
  );
}

export default connect(({ jgTableModel }) => ({
  id: jgTableModel.dataId
}))(Main);
