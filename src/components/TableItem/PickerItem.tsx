import React, { useState, useEffect } from 'react';
import { View, Text, } from "remax/wechat"

import styles from './index.less';

interface IProps {
  showIndicator?: boolean;
  customCols?: any[];
  [index: string]: any;
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {} } = props;
  // 默认显示三条
  const defalutColsLength = 3
  const cols = columns.slice(0, defalutColsLength);
  return (
    <View className={styles['list-item']} style={{ padding: "10px 0" }}>
      <View className={styles['list-item-content']}>
        {cols.map((column, index) => (
          <View key={column.title} data-from="datapicker" style={{ display: "flex" }}>
            <View style={{ maxWidth: 120, minWidth: 70 }}>{column.title}:</View>
            {column.render
              ? column.render(data[column.dataIndex], data, index)
              : (data[column.dataIndex] || "无数据")}
          </View>
        ))}
      </View>
    </View >
  );
}

export default TableItemCell;
