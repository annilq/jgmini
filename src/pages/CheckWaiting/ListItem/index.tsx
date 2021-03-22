import React from 'react';
import CheckStatusButton from '@/components/StatusButton/CheckStatusButton';
import IndexItemCell from '@/components/TableItem/IndexItem';


interface IProps {
  data: any;
  showIndicator?: boolean;
  columns: any[];
  onItemClick?: (params: any) => void;
  children?: any
}

function TableItemCell(props: IProps) {
  const { data = {}, columns, onItemClick } = props;
  return (
    <IndexItemCell data={data} columns={columns} onItemClick={onItemClick} >
      <CheckStatusButton data={data.status} />
    </IndexItemCell>
  );
}

export default TableItemCell;
