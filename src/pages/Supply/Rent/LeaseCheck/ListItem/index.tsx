import React from 'react';
import SubTableItemCell from '@/components/TableItem/SubTableItem';

function Main(props) {
  const { data, columns } = props
  return <SubTableItemCell data={data} columns={columns} />
}

export default Main