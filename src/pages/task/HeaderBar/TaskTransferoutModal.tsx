import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { connect } from 'react-redux';

import Layer from '@/components/Layer';

import FormEditItem from '@/components/CustomForm/FormItem/edit';
import { ConTypes } from '@/components/CustomForm/controlTypes';

const FormItem = Form.Item;
const config = {
  extraProps: { formCode: 'User', nameCode: 'principalName' },
  controlLabel: '负责人',
  placeHolder: '负责人',
  controlType: ConTypes.DATAPICKER,
  controlCode: 'principalId',
};
interface IProps {
  // 任务明细
  taskId: string;
  visible: boolean;
  onClose: () => void;
}

@connect(({ loading }) => ({
  loading: loading.effects['task/changePrincipal']
}))
class ProgressModal extends React.Component<IProps> {
  submit = values => {
    const { dispatch, taskId, data,onClose } = this.props;
    dispatch({
      type: 'task/changePrincipal',
      payload: {
        id: taskId,
        ...values,
      },
      callback: () => {
        dispatch({
          type: 'jgTableModel/queryRemote',
          payload: data.id,
        });
        dispatch({
          type: 'jgTableModel/listRemote',
        });

        notification.success({ message: '转出成功', onClose: () => onClose() });
      },
    });
  };

  render() {
    const {
      controlCode,
      controlLabel,
      extraProps: { nameCode },
    } = config;

    const { visible, onClose, loading } = this.props;
    return (
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
      >
        <Form onFinish={this.submit}>
          <div style={{ padding: '0 10px' }}>

            <FormItem
              shouldUpdate={(prevValues, curValues) =>
                prevValues[controlCode] !== curValues[controlCode]
              }
            >
              {formInstance => {
                return (
                  <FormItem name={controlCode} label={controlLabel} labelCol={{ span: 3 }}>
                    <FormEditItem
                      data={config}
                      form={formInstance}
                      formdata={{ ...formInstance.getFieldsValue() }}
                      formCode="User"
                    />
                  </FormItem>
                );
              }}
            </FormItem>
            <FormItem name={nameCode} style={{ display: 'none' }}>
              <span />
            </FormItem>
            <FormItem name="remark" label="备注" labelCol={{ span: 3 }}>
              <Input.TextArea rows={4} />
            </FormItem>
          </div>
          <div className="actionBtns">
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
            >
              确定
            </Button>
            <Button onClick={() => onClose()} >
              取消
            </Button>
          </div>
        </Form>
      </Layer>
    );
  }
}
export default ProgressModal;
