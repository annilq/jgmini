import React from 'react';
import { useNativeEffect } from 'remax';
import { connect } from 'react-redux';
import FormEvent from '@/utils/formevent';
import { Picker } from '@/components/CustomForm';

interface SelectProps extends JgFormProps.IFormProps {
  formCode: string;
  processList: any[]
}

function ApproveSelect(props: SelectProps) {
  const {
    value: { approveProcessId },
    dispatch,
    formCode,
    processList: data = [],
    onChange,
    formdata
  } = props;
  const projectId = formdata.projectId

  function handler(params) {
    const { value, emitType } = params
    // 只响应onChange不响应onSelect
    if (emitType === 1) {
      if (value) {
        dispatch({ type: 'workflow/processListRemote', payload: { formCode, projectId: value } });
      } else {
        dispatch({ type: 'workflow/processListRemote', payload: { formCode } });
      }
    }
  }

  function handleProjectChange(data) {
    handler(data);
    onChange({ approveProcessId: null, nextNodeApprovers: null });
  }

  // 不是项目看板下监听表单的projectId来切换审批流程列表
  useNativeEffect(() => {
    FormEvent.on(`${formCode}.projectId`, handleProjectChange);
    return () => {
      FormEvent.removeListener(`${formCode}.projectId`, handleProjectChange);
      // 清除审批列表历史，否则默认选中的流程会显示在别的流程
      dispatch({ type: 'workflow/processList', payload: { processList: [] } });
    };
  }, []);

  // 只有一个流程定义时候默认选中
  useNativeEffect(() => {
    if (data && data.length === 1) {
      onChange({ approveProcessId: data[0].id, nextNodeApprovers: null });
    }
  }, [data]);
  
  useNativeEffect(
    () => {
      handler({ value: projectId, emitType: 1 });
    },
    [projectId]
  );
  function flowOnChange(value) {
    console.log(value);
    
    onChange({ approveProcessId: value, nextNodeApprovers: null });
  }

  const flow = data.find(item => item.id === approveProcessId);
  // 判断第二个节点是否是指定审批人类型
  return (
    <Picker
      value={flow && flow.id || ""}
      onChange={flowOnChange}
      label="审批流程版本"
      data={data}
      optionKeys={["definitionName", "id"]}
    />
  );
}

export default connect(({ workflow }) => ({
  processList: workflow.processList,
}))(ApproveSelect);
