import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import { connect } from 'react-redux';

import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import SectionHeader from '@/components/SectionHeader';

import TaskModal from '../HeaderBar/TaskModal';

const formConfig = {
  controlCode: 'id',
  controlLabel: '任务',
  controlType: ConTypes.DATAPICKER,
  extraProps: { formCode: 'Task', nameCode: 'title', linkable: true },
};

function SubTask({ taskId, list = [], dispatch }) {
  const [data, setData] = useState({});

  const [visible, setVisible] = useState(false);

  useEffect(
    () => {
      if (taskId) {
        dispatch({
          type: 'task/listRemote',
          payload: { id: taskId },
        });
      }
    },
    [taskId]
  );

  function removeTask(record) {
    dispatch({
      type: 'task/removeRemote',
      payload: { data: record },
    });
  }

  const columns = [
    // {
    //   title: '任务标题',
    //   dataIndex: 'title',
    //   render: (text, record, index) => {
    //     return <FormItemData data={formConfig} formdata={record} />;
    //   },
    // },
    {
      title: '任务标题',
      dataIndex: 'title',
      render: (text, record, index) => {
        return (
          <span
            style={{
              color: '#4095ff',
              cursor: 'pointer',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis',
            }}
            // 关联数据查看详情
            onClick={() =>
              dispatch({
                type: 'jgTableModel/queryRemote',
                payload: record.id,
              })
            }
          >
            {text}
          </span>
        );
      },
    },
    {
      title: '负责人',
      dataIndex: 'principalName',
    },
    {
      title: '参与人',
      dataIndex: 'participantUserName',
    },
    {
      title: '抄送人',
      dataIndex: 'copyToUserName',
    },
    {
      title: '开始时间',
      dataIndex: 'beginDate',
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   width: 200,
    //   render: (text, record, index) => {
    //     const { canUpdate, canDelete, canSubmit } = record.operateAuthority;
    //     return (
    //       <>
    //         <span
    //           onClick={() => {
    //             setData(record);
    //             setVisible(true);
    //           }}
    //         >
    //           <a style={{ margin: '5px' }} >编辑</a>
    //         </span>
    //         <Popconfirm
    //           title="是否要删除此行？"
    //           // 子任务只能在任务列表，所以可以直接发起删除
    //           onConfirm={() => removeTask(record)}
    //         >
    //           <a>删除</a>
    //         </Popconfirm>
    //       </>
    //     );
    //   },
    // },
  ];

  if (list.length < 1) {
    return false;
  }
  return (
    <div
      className="containers"
      style={{
        textAlign: 'left',
      }}
    >
      <SectionHeader
        title="子任务"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
      />
      <Table
        dataSource={list}
        style={{ width: '100%', overflow: 'scroll' }}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="table"
      />
      <TaskModal
        parentId={data.id}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        data={data}
      />
    </div>
  );
}

export default connect(({ task }) => ({
  list: task.list,
}))(SubTask);
