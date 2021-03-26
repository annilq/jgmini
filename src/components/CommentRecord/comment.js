import React from 'react';
import { Button, Input, Form } from 'annar';
import { connect } from 'react-redux';
import { ImageUpload } from '@/components/CustomForm';

const FormItem = Form.Item;

class CommentForm extends React.Component {

  handleSubmit = values => {
    const { dispatch, entity, formCode } = this.props;
    dispatch({
      type: 'comment/addRemote',
      payload: {
        entityId: entity.id,
        moduleCode: formCode,
        ...values,
      },
      callback: info => {
        wx.showToast({
          title: info,
        });
      },
    });
  };

  render() {
    return (
      <Form
        onFinish={this.handleSubmit}
      >
        <FormItem label="" name="content" rules={[{ required: true, message: '请输入评论' }]}>
          <Input placeholder="发表你的看法吧" />
        </FormItem>
        <FormItem label="" name="picId">
          <ImageUpload />
        </FormItem>
        <Form.Item noStyle style={{ marginTop: 10, padding: '0 20px' }}>
          <Button
            type="primary"
            size="large"
            shape="square"
            look="secondary"
            block
            nativeType="submit"
          >
            发表评论
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ comment }) => ({
  comment,
}))(CommentForm);
