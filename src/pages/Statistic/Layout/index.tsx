import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import { ExportOutlined, PrinterOutlined } from '@ant-design/icons';

import SearchForm from '@/components/SearchForm';
import TableWithPagination from '@/components/TableWithPagination';
import styles from '@/common/styles/tableList.less';

interface Iprops {
  data: JGListData;
  rowKey: string;
  loading: boolean;
  columns: { dataIndex: string, title: string, render?: (title: string, record: any, index: number) => React.ReactElement }[];
  searchArr?: { name: string, component: React.ReactElement }[];
  search: (params?: any, pageRemote?: boolean) => void;
}

function Layout(props: Iprops) {
  const { data, rowKey = "id", loading, columns, searchArr, search } = props;

  const [selectedState, setSelectedState] = useState({ selectedRowKeys: [], selectedRows: [] });
  const { selectedRowKeys, selectedRows } = selectedState;

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    checkStrictly: false,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedState({ selectedRowKeys, selectedRows })
    },
  }

  const exportData = () => {
    console.log(selectedRowKeys);
  }

  const onPaginationChange = pagination => {
    search(pagination, true)
  };

  return (
    <div className={styles.tableList}>
      <div className={styles.tableListForm}>
        <SearchForm
          loading={loading}
          searchArr={searchArr}
          submit={search}
          reset={() => search()}
        />
      </div>
      <Divider dashed className={styles.tableListDivider} />
      {/* <div className={styles.tableListOperator}>
              <Button onClick={exportData}>
                <ExportOutlined style={{ color: '#FAAD14' }} />导出
              </Button>
              <Button>
                <PrinterOutlined style={{ color: '#13C2C2' }} />打印
              </Button>
            </div> */}
      <TableWithPagination
        loading={loading}
        rowKey={rowKey}
        data={data}
        columns={columns}
        className="table"
        onPaginationChange={onPaginationChange}
        rowClassName={(record, index) => {
          let className = '';
          if (index % 2 === 1) className = "darkRow";
          return className;
        }}
        // rowSelection={rowSelection}
        showOrder
      />
    </div>
  );

}

export default Layout;
