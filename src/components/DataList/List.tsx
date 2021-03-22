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
    <View>
      {dataSource.map((item, index) => renderItem(item, index))}
    </View>
  );
};
List.Item = View
export default List