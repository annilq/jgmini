import React from 'react';
import { Button, Input, message, Form } from 'antd';
import { connect } from 'react-redux';
import Layer from '@/components/Layer';
import { ImageUpload } from '@/components/CustomForm';
import styles from '@/components/CustomForm/index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

interface IProps {
  data: object;
  visible: boolean;
  onClose: () => void;
  // 1复检，2整改
  type: 1 | 2;
  [index: string]: any;
}

@connect(({ jgTableModel, loading }) => ({
  data: jgTableModel.item,
  loading: loading.effects['qualityReform/checkReject'] ||
    loading.effects['qualityReform/checkPass'] ||
    loading.effects['qualityReform/feedback']
}))
class ReformModal extends React.Component<IProps> {
  formRef = React.createRef();
  submit = cb => {
    this.formRef.current.validateFields().then(cb).catch(err => {
      const { errorFields } = err;
      message.error(errorFields[0].errors.toString());
    });
  };

  reject = values => {
    const { dispatch, data, onClose } = this.props;
    dispatch({
      type: 'qualityReform/checkReject',
      payload: { ...values, reformId: data.id },
      callback() {
        dispatch({
          type: 'jgTableModel/queryRemote',
          payload: data.id,
        });
        dispatch({
          type: 'jgTableModel/listRemote',
        });
        onClose()
      },
    });
  };

  pass = values => {
    const { dispatch, data, onClose } = this.props;
    dispatch({
      type: 'qualityReform/checkPass',
      payload: { ...values, reformId: data.id },
      callback() {
        dispatch({
          type: 'jgTableModel/queryRemote',
          payload: data.id,
        });
        dispatch({
          type: 'jgTableModel/listRemote',
        });
        onClose()
      },
    });
  };

  feedback = values => {
    const { dispatch, data, onClose } = this.props;
    dispatch({
      type: 'qualityReform/feedback',
      payload: { ...values, reformId: data.id },
      callback() {
        dispatch({
          type: 'jgTableModel/queryRemote',
          payload: data.id,
        });
        onClose()
      },
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { visible, type, onClose, loading } = this.props;
    return (
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
      >
        <div style={{ padding: "0 12px" }}>
          <div className="containers">
            <Form {...formItemLayout} ref={this.formRef}>
              <FormItem
                name="remark"
                label="备注"
                rules={[{ required: true, message: '请输入本次完成量' }]}
              >
                <TextArea rows={4} />
              </FormItem>
              <FormItem name="picId" label="图片">
                <ImageUpload />
              </FormItem>
            </Form>
            <div className="actionBtns">
              {type === 2 && (
                <>
                  <Button onClick={() => onClose()} style={{ marginRight: '16px', padding: '0 20px' }}>
                    取消
                </Button>
                  <Button
                    type="primary"
                    onClick={() => this.submit(this.feedback)}
                    style={{ marginRight: '16px', padding: '0 20px' }}
                  >
                    确定
                </Button>
                </>
              )}
              {type === 1 && (
                <>
                  <Button
                    type="danger"
                    onClick={() => this.submit(this.reject)}
                    style={{
                      marginRight: '16px',
                      padding: '0 20px',
                      backgroundColor: '#ff4d4f',
                      color: '#fff',

                    }}
                    disabled={loading}
                  >
                    驳回
                </Button>
                  <Button
                    type="primary"
                    onClick={() => this.submit(this.pass)}
                    style={{ marginRight: '16px', padding: '0 20px' }}
                    disabled={loading}
                  >
                    通过
                </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Layer>
    );
  }
}
export default ReformModal;
