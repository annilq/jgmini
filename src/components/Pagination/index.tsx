import React from 'react';
import { Pagination } from 'antd';

function Main(props) {
  const { data, onPaginationChange, ...rest } = props;

  function onShowSizeChange(current, pageSize) {
    const nextPagi = {
      pageSize,
      currentPage: current,
    };
    onPaginationChange(nextPagi);
  }

  function paginationChange(pageNumber) {
    const nextPagi = {
      pageSize: paginationProps.pageSize,
      currentPage: pageNumber,
    };
    onPaginationChange(nextPagi);
  }

  const pagination = {
    current: data.currentPage || 0,
    pageSize: data.pageSize || 0,
    total: data.totalSize || 0,
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    ...pagination,
  };
  return (
    <Pagination
      style={{ height: 'auto', overflow: 'hidden', textAlign: 'right', marginTop: '10px' }}
      onShowSizeChange={onShowSizeChange}
      onChange={paginationChange}
      {...paginationProps}
      {...rest}
    />
  );
}
export default Main;
