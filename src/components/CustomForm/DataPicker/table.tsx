import React from 'react';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import List from '@/components/DataList';
import PickerItemCell from '@/components/TableItem/PickerItem';

import useFormConfig from '@/hooks/useFormConfig';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';

interface IProps {
  formCode: string;
  data: any;
  loadMore: (opthions: any) => void;
  [index: string]: any;
}

function Index(props: IProps) {
  const {
    data = {},
    formCode,
    loadMore,
    loading: dataloading,
    rowSelection,
    rowKey = "id"
  } = props;
  const { tableConfig, loading: tableloading } = useFormConfig(formCode);

  // 根据配置获取表格列表项目
  function getTableColumns(columnsData) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (text, record) => <FormItemData data={item} formdata={record} />,
      dataIndex: item.controlCode,
      // width: 200,
    }));
    return columns;
  }
  const columnsData = getColumnsFromContainersByFliter(tableConfig.containers);
  const columns = getTableColumns(columnsData);

  return (
    <List
      renderItem={data => (
        <PickerItemCell data={data} columns={columns} />
      )}
      loading={tableloading || dataloading}
      data={data}
      loadMore={loadMore}
      rowSelection={rowSelection}
      rowKey={rowKey}
    />
  );
}

export default Index;
