import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'remax/wechat';

import styles from './index.less';

interface IProps {
  data: any;
  columns: any[];
  // 编辑按钮回调
  onEdit?: () => void;
  // 默认是展开收起模式，遇到表格嵌套，则展示方式切换为右侧滑出页面
  onDetail?: () => void;
  index?: number
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {}, index, onDetail, onEdit } = props;
  // 默认显示三条
  const defalutColsLength = 3;
  const showExpandBtn = columns.length > defalutColsLength;
  const defalutCols = columns.slice(0, defalutColsLength);
  const [cols, setCols] = useState(defalutCols);
  const [isToggle, setToggle] = useState(false);
  // 默认展开
  const toggle = useCallback(
    () => {
      if (!isToggle) {
        setCols(columns);
        setToggle(true);
      } else {
        setCols(defalutCols);
        setToggle(false);
      }
    },
    [cols, isToggle]
  );
  useEffect(
    () => {
      setCols(defalutCols);
    },
    [columns, onEdit]
  );
  const { exceedFlag } = data
  return (
    <View className={`${styles['list-item']} ${styles["subtable-item"]} ${exceedFlag === "Y" ? styles["warnRow"] : ""}`} style={{ margin: "0 4px" }}>
      <View className={styles['list-item-container']}>
        {cols.map((column) => (
          <View className={styles['list-item-content']} data-from="detail">
            <View>{column.title}:</View>
            <View>
              {column.render
                ? column.render(data[column.dataIndex], data, index)
                : (data[column.dataIndex] || "无数据")}
            </View>
          </View>
        ))}
      </View>
      {
        // 有编辑或者展开按钮都显示footer
        (showExpandBtn || onEdit) && (
          <View className={styles.indicator} >
            {showExpandBtn && (
              <View onClick={(e) => {
                e.stopPropagation();
                if (onDetail) {
                  onDetail()
                } else {
                  toggle()
                }
              }}
                className={styles.expondBtn}
              >
                {isToggle ? "收起" : "查看"}
              </View>)}
            {showExpandBtn && onEdit && <Text>|</Text>}
            {onEdit && (
              <View onClick={onEdit} className={styles.editBtn}>
                编辑
              </View>
            )}
          </View>
        )
      }
    </View>
  );
}

export default TableItemCell;
