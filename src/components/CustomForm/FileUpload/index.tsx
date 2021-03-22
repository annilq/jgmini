import React, { PureComponent } from 'react';
import { Upload, Icon, Button } from 'antd';
import { file as api } from '@/services/api';
import Services from '@/services';

interface fileItem {
  uid: string;
  name: string;
  id: string;
  url: string;
  size: number;
  type: string;
  [index: string]: any;
}

interface IStates {
  value: fileItem[];
}

function transformData(item) {
  return {
    uid: item.id,
    id: item.id,
    name: item.fileName,
    url: `${api.imgOSS}${item.key}`,
    thumbUrl: `${api.imgOSS}${item.key}?x-oss-process=image/resize,m_fill,h_100,w_100`,
  };
}

class FileUpload extends PureComponent<JgFormProps.IFormProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value && props.value !== state.value) {
      let data = [];
      try {
        data = JSON.parse(props.value);
      } catch (error) {
        console.log(error);
      }
      // 把遗留数据过滤出去,新增uid标识
      data = data.filter(item => !!item).map(item => ({ ...item, uid: item.id || item.uid }));
      return {
        value: data,
      };
    }
    return null;
  }

  handleChange = ({ fileList = [] }) => {
    const { onChange } = this.props;

    fileList = fileList.map(file => {
      if (file.response) {
        // 上传成功则用返回对象显示文件预览列表
        file = transformData(file.response.resp);
      }
      return file;
    });
    onChange(JSON.stringify(fileList));
  };

  //  删除附件
  onRemove = file => {
    return Services.FileApi.del({ id: file.id });
  };

  render() {
    const { value } = this.state;
    const uploadProps = {
      name: 'multipartFile',
      accept: '.docx,.ppt,.doc,.xls,.zip,.rar,.xlsx,.et,.pptx,.pdf,.wps,.txt',
      headers: {
        authorization: localStorage.getItem('token'),
      },
      action: api.uploadFile,
      multiple: true,
    };
    return (
      <>
        <Upload
          {...uploadProps}
          fileList={value}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          <Button>
            <Icon type="upload" /> 上传文件
          </Button>
        </Upload>
      </>
    );
  }
}
export default FileUpload;
