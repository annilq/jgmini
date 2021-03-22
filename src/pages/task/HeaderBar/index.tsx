import React, { useState } from 'react';
import { Button } from 'antd';

import useLayerVisible from '@/hooks/useLayer';

import AduitModal from './AduitModal';
import TaskModal from './TaskModal';
import ProgressModal from './ProgressModal';
import TaskTransferoutModal from './TaskTransferoutModal';

function TaskBar({ data }) {

  const [submitTaskModalVisible, showSubmitTaskModal] = useLayerVisible(false);
  const [taskChangeModalVisible, showtaskChangeProgressModal] = useLayerVisible(false);
  const [taskProgressModalVisible, showTaskProgressModal] = useLayerVisible(false);
  // 审核类型,1审核 ，2提交,3暂停，4取消，5开始
  const [formType, setFormType] = useState(null);

  const {
    canApprove,
    canBegin,
    canCancel,
    canFeedback,
    canAddSubTask,
    canStop,
    canSubmit,
    canChange,
  } = data.operateAuthority || {};
  return (
    <div className="actionBtns">
      {/*  子任务不能添加子任务*/}
      {/* {canAddSubTask && (
        <Button onClick={() => dispatch({ type: 'showAddSubtaskModal', visible: true })}>
          添加子任务
        </Button>
      )} */}
      {canFeedback && (
        <Button onClick={() => showTaskProgressModal(true)}
          style={{
            backgroundColor: '#ffa646',
            color: '#fff',
            border: 'none',
          }}>
          进度反馈
        </Button>
      )}
      {/* {canStop && (
        <Button
          onClick={() => {
            dispatch({ type: 'showSubmitTaskModal', visible: true, formType: 3 });
          }}
        >
          暂停
        </Button>
      )} */}
      {/* {canCancel && (
        <Button
          onClick={() => {
            dispatch({ type: 'showSubmitTaskModal', visible: true, formType: 4 });
          }}
        >
          取消
        </Button>
      )} */}

      {canChange && (
        <Button
          onClick={() => {
            showtaskChangeProgressModal(true)
          }}
          style={{ backgroundColor: "#08ba7c", color: "#fff", border: "none" }}
        >
          转出
        </Button>
      )}
      {canApprove && (
        <Button
          onClick={() => {
            showSubmitTaskModal(true);
            setFormType(1)
          }}
          type="primary"
        >
          审核
        </Button>
      )}
      {canSubmit && (
        <Button
          onClick={() => {
            showSubmitTaskModal(true)
            setFormType(2)
          }}
          type="primary"
        >
          提交
        </Button>
      )}
      {canBegin && (
        <Button
          onClick={() => {
            showSubmitTaskModal(true)
            setFormType(5)
          }}
          type="primary"
        >
          开始
        </Button>
      )}
      {/* 子任务 */}
      {/* <TaskModal
        parentId={data.id}
        visible={addSubtaskModalVisible}
        onClose={() => {
          dispatch({ type: 'showAddSubtaskModal', visible: false });
        }}
      /> */}
      {/* 审核，提交，暂停，开始，取消等操作都在这个对话框 */}
      <AduitModal
        formType={formType}
        taskId={data.id}
        visible={submitTaskModalVisible}
        data={data}
        onClose={() => {
          showSubmitTaskModal(false);
        }}
      />
      {/* 任务进展对话框 */}
      <ProgressModal
        taskId={data.id}
        data={data}
        visible={taskProgressModalVisible}
        onClose={() => {
          showTaskProgressModal(false)
        }}
      />
      {/* 任务转出对话框 */}
      <TaskTransferoutModal
        taskId={data.id}
        data={data}
        visible={taskChangeModalVisible}
        onClose={() => {
          showtaskChangeProgressModal(false)
        }}
      />
    </div>
  );
}

export default TaskBar;
