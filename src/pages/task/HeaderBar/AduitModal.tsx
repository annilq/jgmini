import React from 'react';
import { Button, Input, Form } from 'antd';
import { connect } from 'react-redux';

import Layer from '@/components/Layer';

import { ImageUpload } from '@/components/CustomForm';

const FormItem = Form.Item;
const { TextArea } = Input;

interface IProps {
  // 审核类型,1审核 ，2提交,3暂停，4取消，5开始
  // 每种类型的接口不一样，文案与title也不一样
  formType: 1 | 2 | 3 | 4 | 5;
  // 任务id
  taskId: string;
  visible: boolean;
  onClose: () => void;
}

@connect(({ loading }) => ({
  loading: loading.effects['task/approveTask'] ||
    loading.effects['task/rejectTask'] ||
    loading.effects['task/submitTask'] ||
    loading.effects['task/cancelTask'] ||
    loading.effects['task/beginTask'] ||
    loading.effects['task/stopTask']
}))
class AuditForm extends React.Component<IProps> {
  formRef = React.createRef();
  config = [
    { type: 1, title: '是否通过审核', confirm: '通过审核', cancel: '不通过', btntype: 'danger' },
    { type: 2, title: '是否确定任务完成并完成审核', confirm: '完成审核', cancel: '取消' },
    { type: 3, title: '是否暂停任务', confirm: '暂停任务', cancel: '取消' },
    { type: 4, title: '是否取消任务', confirm: '取消任务', cancel: '取消' },
    { type: 5, title: '是否开始任务', confirm: '开始任务', cancel: '取消' },
  ];

  submit = type => {
    const { dispatch, formType, data, onClose, taskId } = this.props;
    // 点击了取消按钮
    if (formType !== 1 && type === 0) {
      onClose()
      return;
    }
    const callback = function () {
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: data.id,
      });
      dispatch({
        type: 'jgTableModel/listRemote',
      });
      dispatch({
        type: 'task/getProgressList',
        payload: { taskId },
      });
      onClose()
    };
    this.formRef.current.validateFields().then(values => {
      values.taskId = taskId;
      switch (formType) {
        case 1:
          if (type === 1) {
            dispatch({
              type: 'task/approveTask',
              payload: values,
              callback,
            });
          } else if (type === 0) {
            dispatch({
              type: 'task/rejectTask',
              payload: values,
              callback,
            });
          }
          break;
        case 2:
          dispatch({
            type: 'task/submitTask',
            payload: values,
            callback,
          });
          break;
        case 3:
          dispatch({
            type: 'task/stopTask',
            payload: values,
            callback,
          });
          break;
        case 4:
          dispatch({
            type: 'task/cancelTask',
            payload: values,
            callback,
          });
          break;
        case 5:
          dispatch({
            type: 'task/beginTask',
            payload: values,
            callback,
          });
          break;
        default:
          break;
      }
    });
  };

  render() {
    const { visible, onClose, formType, loading } = this.props;
    if (!visible) {
      return null;
    }
    const modalConfig = this.config.find(item => item.type === formType);
    return (
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
      >
        <div style={{ backgroundColor: '#fff' }}>
          <Form
            style={{ padding: '0 10px' }}
            ref={this.formRef}
          >
            <FormItem name="remark">
              <TextArea rows={4} placeholder="请输入备注" />
            </FormItem>
            <FormItem name="picId">
              <ImageUpload />
            </FormItem>
          </Form>
          <div className="actionBtns" >
            <Button
              type="primary"
              onClick={() => this.submit(1)}
              disabled={loading}
            >
              {modalConfig.confirm}
            </Button>
            <Button
              onClick={() => this.submit(0)}
              type={modalConfig.btntype}
            >
              {modalConfig.cancel}
            </Button>
          </div>
        </div>
      </Layer >
    );
  }
}
export default AuditForm;
