import React from 'react';
import { ReformStatusButton } from '@/components/StatusButton'; // 1-通过
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
      <ReformStatusButton data={data} />
    </IndexItemCell>
  );
}

export default TableItemCell;
