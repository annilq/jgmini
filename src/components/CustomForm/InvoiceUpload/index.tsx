import React, { PureComponent } from 'react';
import { Modal, Input, Upload, Button, Row, Col, notification } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { bizInvoiceInput as api } from '@/services/api';
import Service from '@/services';
import pick from 'lodash/pick';

interface IProps extends JgFormProps.IFormProps {
  form: WrappedFormUtils;
}

interface IStates {
  visible: boolean;
  loading: boolean;
  previewImage: string;
  value: string;
}

class InvoiceUpload extends PureComponent<IProps, IStates> {
  state = {
    visible: false,
    loading: false,
    previewImage: '',
    value: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value && props.value !== state.value) {
      return {
        value: props.value,
        previewImage: '',
      };
    }
    return null;
  }

  showModal = async () => {
    const { value, previewImage } = this.state;
    if (!value) return;
    let url;
    if (previewImage) {
      url = previewImage;
    } else {
      const response = await Service.FileApi.viewFile({ fileId: value });
      if (response) {
        url = response.resp;
      }
    }
    if (url) {
      this.setState({ visible: true, previewImage: url });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleChange = ({ fileList }) => {
    const { onChange } = this.props;
    let file = fileList[fileList.length - 1];
    if (file.status === 'done') {
      // 上传成功则用返回对象显示文件预览列表
      const {
        response: { resp },
        ...rest
      } = file;
      file = { ...rest, ...resp };
      onChange(file.fileId);
      this.finishUpload(resp);
    } else if (file.status === 'error') {
      notification.error({
        message: '上传图片失败',
        description: '上传图片失败，请重新上传',
      });
      this.finishUpload();
    }
  };

  //  上传附件
  beforeUpload = () => {
    this.setState({ loading: true });
  };

  //  完成上传
  finishUpload = (resp?: any) => {
    const { form } = this.props;
    const data = form.getFieldsValue();
    // console.log(data);
    const pickData = pick(resp, Object.keys(data));
    // console.log(pickData);
    form.setFieldsValue(pickData);
    this.setState({ loading: false });
  };

  render() {
    const { visible, previewImage, value, loading } = this.state;
    const { readOnly } = this.props;
    const uploadProps = {
      name: 'multipartFile',
      accept: 'image/*',
      // 自定义展示文件列表
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      headers: {
        authorization: localStorage.getItem('token'),
      },
      action: api.uploadInvoice,
    };
    return (
      <>
        <Row>
          {readOnly ? (
            <div
              onClick={this.showModal}
              style={{
                color: '#4095ff',
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              点击查看发票
            </div>
          ) : (
            <>
              <Col md={16}>
                <Input value={value && '点击查看发票'} readOnly onClick={this.showModal} />
              </Col>
              <Col md={8} style={{ textAlign: 'right' }}>
                <Upload {...uploadProps} onChange={this.handleChange}>
                  <Button icon="upload" type="primary" loading={loading}>
                    {loading ? '上传中' : '图片识别'}
                  </Button>
                </Upload>
              </Col>
            </>
          )}
        </Row>
        <Modal width={1200} visible={visible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default InvoiceUpload;
