import React from 'react';
import { Button, Input, InputNumber, Form } from 'antd';

import { connect } from 'react-redux';

import Layer from '@/components/Layer';

import { ImageUpload, TreePicker } from '@/components/CustomForm';

const FormItem = Form.Item;
const { TextArea } = Input;

interface IProps {
  // 任务明细
  data: any;
  taskId: string;
  visible: boolean;
  onClose: () => void;
}

@connect(({ loading }) => ({
  loading: loading.effects['task/feedBack']
}))
class ProgressModal extends React.Component<IProps> {
  submit = values => {
    const { dispatch, data, taskId,onClose } = this.props;
    dispatch({
      type: 'task/feedBack',
      payload: {
        taskId,
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
        dispatch({
          type: 'task/getProgressList',
          payload: { taskId },
        });
        onClose()
      },
    });
  };

  render() {
    const { visible, onClose, data, loading } = this.props;
    return (
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
      >
        <Form onFinish={this.submit}>
          <div style={{ padding: '0 10px' }}>
            <FormItem
              label="本次完成量"
              rules={[{ required: true, message: '请输入本次完成量' }]}
              style={{ display: 'flex' }}
            >
              <FormItem name="workload" noStyle>
                <InputNumber min={0} />
              </FormItem>
              <TreePicker
                extraProps={{
                  nameCode: 'unit',
                  url: '/api/v1/system/unit/getAllUnit',
                  parentNodeDisable: true,
                }}
                readOnly
                value={data.unit}
                style={{ marginLeft: '10px' }}
              />
            </FormItem>
            <div>
              累积已完成
            <span style={{ padding: '0 5px', color: '#4195ff' }}>
                {data.finishWorkload && data.finishWorkload.toFixed(2)}
              </span>
              <TreePicker
                extraProps={{
                  nameCode: 'unit',
                  url: '/api/v1/system/unit/getAllUnit',
                  parentNodeDisable: true,
                }}
                readOnly
                value={data.unit}
              />
            ，完成
            <span style={{ padding: '0 5px', color: '#4195ff' }}>{`${data.finishRate &&
                data.finishRate.toFixed(2) * 100}/%`}</span>
            </div>
            <FormItem name="remark">
              <TextArea rows={4} placeholder="请输入备注" />
            </FormItem>
            <FormItem name="picId">
              <ImageUpload />
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
            <Button onClick={() => onClose()}>
              取消
            </Button>
          </div>
        </Form>
      </Layer>
    );
  }
}
export default ProgressModal;
