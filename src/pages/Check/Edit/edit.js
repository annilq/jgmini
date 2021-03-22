import React from 'react';
import { connect } from 'react-redux';

import { Input, Button, message, Form } from 'antd';
import { ImageUpload, DataSelecter } from '@/components/CustomForm';
import Picker from '@/components/Picker';
import styles from '@/components/CustomForm/index.less';

@connect(({ qualitySetting, loading, menu }) => ({
  curRouter: menu.curRouter,
  loading: loading.effects['qualitySetting/listRemote'] || false,
  listdata: qualitySetting.listdata,
}))
class Edit extends React.Component {

  formRef = React.createRef();

  columns = [
    {
      title: '检查项',
      dataIndex: 'content',
      render: text => <a>{text}</a>,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  componentDidMount() {
    this.search();
  }

  search = data => {
    const { dispatch, curRouter } = this.props;
    // 质量1，安全2
    // category: 1
    // category: 2
    dispatch({ type: 'qualitySetting/listRemote', payload: { ...data, ...curRouter.params } });
  };

  handleSubmit = values => {
    const { data, onSubmit } = this.props;
    onSubmit({ ...data, ...values });
  };

  validateFields = (fn) => {

    this.formRef.current
      .validateFields()
      .then(values => {
        fn(values);
      })
      .catch(err => {
        const { errorFields } = err;
        message.error(errorFields[0].errors.toString());
      });
  }

  render() {
    const { data, onDelete } = this.props;
    const formdata = data || {};

    return (
      <div className={styles.baseForm}>
        <Form
          initialValues={formdata}
          onFinish={this.handleSubmit}
          layout="vertical"
          ref={this.formRef}
          style={{ padding: "10px" }}
        >
          <Form.Item
            name="content"
            label="检查内容"
            rules={[{ required: true, message: '请输入检查内容' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="result"
            label="检查结果"
            rules={[{ required: true, message: '请输入检查结果' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="judgeType"
            label="结果判定"
            rules={[{ required: true, message: '请选择结果判定' }]}
          >
            <DataSelecter
              extraProps={{
                flag: 'inspectStatusMap',
                // flag: 'inspectReformStatusMap',
                type: 2,
              }}
              store={window.g_app._store}
            >
              {(candidates, rest) => <Picker data={candidates} {...rest} />}
            </DataSelecter>
          </Form.Item>
          <Form.Item name="picId">
            <ImageUpload label="图片" />
          </Form.Item>
        </Form>
        <div className="actionBtns">
          {onDelete && (
            <Button type="danger" onClick={onDelete}>
              删除
            </Button>)}
          <Button type="primary" onClick={() => this.validateFields(this.handleSubmit)}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default Edit;
