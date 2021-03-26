import React from 'react';
import { View, Text, Image } from 'remax/wechat';
import styles from './index.less';

interface IProps {
  data: any;
  showIndicator?: boolean;
  columns: any[];
  onItemClick?: (params: any) => void;
  children?: any
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {}, onItemClick, children } = props;
  // 默认显示三条
  const defalutColsLength = 5
  const cols = columns.slice(0, defalutColsLength);
  return (
    <View
      className={styles['list-item']}
      onTap={onItemClick}
    >
      <View style={{ display: "flex" }}>
        <View
          className={styles['list-item-container']}
        >
          {cols.map((column, index) => (
            <View key={column.title} data-from="datalist" className={styles['list-item-content']} >
              {column.render
                ? column.render(data[column.dataIndex], data, index)
                : (data[column.dataIndex] || "无数据")}
            </View>
          ))}
        </View>
        <View> {children}</View>
      </View>
      <View
        className={styles['list-item-footer']}
      >
        <Text> 创建人: {data.creatorName || '无'}</Text> <Text style={{ float: "right" }}> 创建时间:{data.createTime || '无'}</Text>
      </View>
    </View>

  );
}

export default TableItemCell;
