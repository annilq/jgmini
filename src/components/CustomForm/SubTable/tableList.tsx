import React, { useState } from 'react';
import List from '@/components/DataList';
import { View, Text } from 'remax/wechat';
import SubTableItemCell from '@/components/TableItem/SubTableItem';
import Layer from '@/components/Layer';
import useLayerVisible from '@/hooks/useLayer';

import Detail from '@/components/CustomForm/detail/detail';
import styles from '@/components/CustomForm/index.less';

import FormItemData from '@/components/CustomForm/FormItem/detail';
import { getColumnsFromContainersByFliter, getSumRows, getSumRowsRender, getSumData } from '@/components/CustomForm/FormUtil';

interface IProps {
  value: any[] | any;
  title: string;
  onEdit?: (index: any) => void;
  showDetail?: (index: any) => void;
  containers: any[];
  omitCols?: string[]
  // 是否可展开(子表中包含子表)
  expandable?: {
    expandedRowRender: (record: any) => React.ReactElement;
    rowExpandable: (record: any) => boolean,
  }
}

function TableList(props: IProps) {
  const { containers = [], title, value, onEdit, omitCols, expandable: {
    rowExpandable = (record: any) => false,
    expandedRowRender = (record: any) => false
  } = {} } = props;

  const [visible, setVisible] = useLayerVisible(false);
  const [recordIndex, setRecordIndex] = useState(-1);
  const record = value[recordIndex]

  const showDetail = function (index: number) {
    setVisible(true);
    setRecordIndex(index);
  }

  const getTableColumns = function (columnsData) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (_, record) => <FormItemData data={item} formdata={record} />,
      dataIndex: item.controlCode,
    }));
    return columns;
  };

  const controls = getColumnsFromContainersByFliter(containers);
  const sumCols = getSumRowsRender(controls);
  const sumData = getSumData(value, controls, getSumRows(controls));
  let newcolumns = getTableColumns(controls);
  // start 过滤掉需要删除的列 (added by hmy)
  if (omitCols) {
    newcolumns = newcolumns.filter((item) => omitCols.indexOf(item.dataIndex) < 0);
  }
  return (
    <>
      <List
        renderItem={(item, index) => {
          const { exceedFlag } = item
          return (
            <List.Item style={{ padding: "12px 0px" }}>
              <SubTableItemCell
                data={item}
                columns={newcolumns}
                {...onEdit && { onEdit: () => onEdit(index) }}
                // 有嵌套子表的则用新页面展示详情
                {...rowExpandable(item) && { onDetail: () => showDetail(index) }}
              />
              {exceedFlag === "Y" && <Text style={{ color: "#ff4d4d", fontSize: "12px", width: "100%", lineHeight: "40px" }}>*数据已超过计划份额</Text>}
            </List.Item>
          )
        }}
        data={{ list: value }}
      />
      {/* 合计 */}
      {sumCols.length > 0 && value.length > 0 && (
        <>
          <Text>合计</Text>
          <SubTableItemCell
            data={sumData}
            columns={sumCols}
          />
        </>
      )}
      <Layer
        visible={visible}
        style={{ width: "100%" }}
      >
        {record && (
          <View className={styles.baseForm}>
            <Detail
              containers={containers}
              formdata={record}
            >
              {rowExpandable(record) && expandedRowRender(record)}
            </Detail>
          </View>)}
      </Layer>
    </>
  );
}

export default TableList;
