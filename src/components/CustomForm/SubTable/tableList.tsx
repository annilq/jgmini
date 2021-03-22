import React from 'react';
import { Table, Popconfirm } from 'antd';

import FormItemData from '@/components/CustomForm/FormItem/detail';

interface IProps {
  editcols?: boolean;
  value: any[] | any;
  editDetail?: () => void;
  remove?: () => void;
  containers: any[];
  loading: boolean;
}

function TableList(props: IProps) {
  const { containers = [], value, editcols, loading } = props;
  const initValue = value || [];
  const getTableColumns = function(columnsData, isSum) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (text, record, index) => {
        return isSum && index === initValue.length ? (
          <span style={{ fontWeight: 'bold' }}>{text}</span>
        ) : (
          <FormItemData data={item} formdata={record} />
        );
      },
      dataIndex: item.controlCode,
      width: 200,
    }));
    return columns;
  };

  const getColumnsFromContainers = function() {
    const columnsData = containers.reduce(
      (acc, container) => acc.concat(container.controls.filter(item => item.isdisplayInList)),
      []
    );
    return columnsData;
  };

  const getSumRows = function(controls) {
    const sumRows = [];
    controls.forEach(item => {
      const {
        extraProps: { sum },
      } = item;
      if (sum) {
        sumRows.push(item.controlCode);
      }
    });
    return sumRows;
  };

  const getSumData = function(controls) {
    const sumcontrols = getSumRows(controls);
    let newData = initValue || [];
    if (sumcontrols.length > 0) {
      const firstCol = controls[0].controlCode;
      const sumData: any = {
        [firstCol]: '合计',
      };

      sumcontrols.forEach(sumitem => {
        let num = 0;
        newData.forEach(item => {
          num += Number(item[sumitem]);
        });
        sumData[sumitem] = num;
      });
      newData = initValue.concat(sumData);
    }
    return newData;
  };

  const controls = getColumnsFromContainers();
  const newData = getSumData(controls);
  const newcolumns = getTableColumns(controls, getSumRows(controls).length);

  const columns = [
    {
      title: '操作',
      dataIndex: 'operation',
      width: 200,
      render: (text, record, index) => {
        // console.log(newData.length, index);
        if (getSumRows(controls).length > 0 && newData.length - 1 === index) {
          return false;
        }
        return (
          <span>
            <a onClick={() => props.editDetail(index)} style={{ marginRight: 8 }}>
              编辑
            </a>
            <Popconfirm title="是否要删除此行？" onConfirm={() => props.remove(index)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={newData}
      rowKey="id"
      loading={loading}
      rowKey="id"
      style={{ width: '100%', overflow: 'scroll' }}
      columns={editcols ? [...newcolumns, ...columns] : newcolumns}
      pagination={false}
      className="table"
    />
  );
}

export default TableList;
