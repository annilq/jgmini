import React from 'react';
import { Button, Form, Row, Col, Input, Popover,message } from 'antd';
import { connect } from 'react-redux';
import { layerContentStyle, layerFooterStyle } from '@/common/styles/layer';
import { FileUpload, ImageUpload } from '@/components/CustomForm';

const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({ comment }) => ({
  comment,
}))
@Form.create()
class CommentForm extends React.Component {

  handleSubmit = () => {
    const {
      dispatch,
      entity,
      form,
      formCode
    } = this.props;
    form.validateFields((err, values) => {
      if (values.content) {
        values.attachId = values.attachId==''? undefined : values.attachId;
        values.picId = values.picId==''? undefined : values.picId;
        dispatch({
          type: 'comment/addRemote',
          payload: {
            entityId:entity.id,
            moduleCode:formCode,
            ...values,
          },
          callback:(info)=>{
            message.success(info);
            form.resetFields();
          }
        });
      }
    });
  };


  render() {
    const {
      form: { getFieldDecorator,getFieldValue },
    } = this.props;
    return (
      <div style={{ paddingLeft: '24px',width:'100%',paddingRight:'24px' }}>
        <Form layout="inline" style={{ overflow: 'hidden', flex: 1 }}  >
          <Row gutter={16}>
            <Col span={24}>
              <FormItem label="">
                {getFieldDecorator('content', {
                  initialValue: "",
                })(<TextArea rows={4} placeholder="发表你的看法吧" style={{width:'100%'}}/>)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="">
                {getFieldDecorator('attachId', {
                  initialValue: '',
                })(<FileUpload />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="">
                {getFieldDecorator('picId', {
                  initialValue: '',
                })(<ImageUpload />)}
              </FormItem>
            </Col>
          </Row>
        </Form>

          <Button
            type="primary"
            onClick={() => this.handleSubmit()}
            style={{ padding: '0 20px' }}
            disabled={!getFieldValue('content')}
          >
            发表评论
          </Button>

      </div>
    );
  }
}

export default CommentForm;
