import React from 'react';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import TableWithPagination from '@/components/TableWithPagination';

import useFormConfig from '@/hooks/useFormConfig';

interface IProps {
  formCode: string;
  data: any;
  onPaginationChange: (opthions: any) => void;
  [index: string]: any;
}

function Index(props: IProps) {
  const { data = {}, parentformdata, formCode, onPaginationChange, ...rest } = props;
  const { tableConfig, loading } = useFormConfig(formCode, null, false);

  // 根据配置获取表格列表项目
  function getTableColumns(columnsData) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (text, record) => <FormItemData data={item} formdata={record} />,
      id: item.controlCode,
      width: 200,
    }));
    return columns;
  }

  function getColumnsFromContainers(containers) {
    const { parentformdata } = props;
    const columnsData = containers.reduce(
      (acc, container) =>
        acc.concat(
          container.controls.filter(item => {
            const {
              extraProps: { displayInListForms },
            } = item;
            // console.log(parentformdata);
            // console.log(displayInListForms);
            if (displayInListForms) {
              //  displayInListForms取值格式为 parentformCode.formCode|parentformCode.formCode...
              // 可以在关联数据列表显示，不在首页列表显示
              const displayMaps = displayInListForms.split('|').map(item => {
                const [parentformCode2, formCode2] = item.split('.');
                return { parentformCode2, formCode2 };
              });
              const obj =
                displayMaps.find(item => item.parentformCode2 === parentformdata.formCode) || {};
              const { parentformCode2, formCode2 } = obj;
              return (
                item.isdisplayInList ||
                (parentformCode2 === parentformdata.formCode &&
                  (!formCode2 || formCode === formCode2))
              );
            } else {
              return item.isdisplayInList;
            }
          })
        ),
      []
    );
    const columns = getTableColumns(columnsData);
    return columns;
  }

  const columns = getColumnsFromContainers(tableConfig.containers);

  return (
    <TableWithPagination
      loading={loading}
      rowKey="id"
      data={data}
      columns={columns}
      className="table"
      style={{ height: '420px', overflow: 'scroll' }}
      onPaginationChange={onPaginationChange}
      {...rest}
    />
  );
}

export default Index;
