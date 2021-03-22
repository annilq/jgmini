import React from 'react';
import { Table } from 'antd';
import Pagination from '@/components/Pagination';
interface Iprops {
  data: {
    list: any[];
  };
  columns: any[];
  onPaginationChange: (params:any) => void;
  [index:string]:any
}

function Main(props: Iprops) {
  const { data, columns, onPaginationChange, ...rest } = props;
  return (
    <>
      <Table dataSource={data.list} columns={columns} pagination={false} {...rest} />
      <Pagination
        data={data}
        onPaginationChange={onPaginationChange}
        style={{ height: 'auto', overflow: 'hidden', textAlign: 'right', marginTop: '10px' }}
      />
    </>
  );
}
export default Main;
