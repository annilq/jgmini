import React from 'react';
import { View } from 'remax/wechat';
interface Iprops {
  dataSource: any[];
  renderItem: (data: any, index: number) => React.ReactElement;
  rowKey: string
}
const List = (props: Iprops) => {
  const { dataSource, renderItem } = props
  return (
    <>
      {dataSource.map((item, index) => renderItem(item, index))}
    </>
  );
};
List.Item = View
export default List