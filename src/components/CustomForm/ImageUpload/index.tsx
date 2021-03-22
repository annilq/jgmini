import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { file as api } from '@/services/api';
import Services from '@/services';
import styles from './index.less';

// uid: '2',
// name: 'yyy.png',
// status: 'done',
// url: 'http://www.baidu.com/yyy.png',

// bucket: "jgoa-test"
// fileName: "湖南中耀交通合同.jpg"
// id: "316304977052733440"
// key: "data/f40cc46c2afa4064b9812bbd3b9d7474-湖南中耀交通合同.jpg"
// suffix: "jpg"

interface imageItem {
  uid: string;
  name: string;
  // status: string;
  url: string;
  size: number;
  type: string;
  [index: string]: any;
}

interface IStates {
  previewVisible: boolean;
  previewImage: string;
  value: imageItem[];
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

class FileUpload extends React.PureComponent<JgFormProps.IFormProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      value: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value && props.value !== state.value) {
      let data = JSON.parse(props.value) || [];
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

  //  附件预览
  handlePreview = file => {
    this.setState({ previewImage: file.url, previewVisible: true });
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  //  删除附件
  onRemove = file => {
    return Services.FileApi.del({ id: file.id });
  };

  findCurIndex = () => {
    const { value: files, previewImage } = this.state;
    return files.findIndex(file => file.url === previewImage);
  };

  goPrev = () => {
    const { value: files } = this.state;
    const previewImageIndex = this.findCurIndex();
    const goIndex = previewImageIndex === 0 ? files.length - 1 : previewImageIndex - 1;
    this.handlePreview(files[goIndex]);
  };

  goNext = () => {
    const { value: files } = this.state;
    const previewImageIndex = this.findCurIndex();
    const goIndex = previewImageIndex === files.length - 1 ? 0 : previewImageIndex + 1;
    this.handlePreview(files[goIndex]);
  };

  render() {
    const { previewVisible, previewImage, value } = this.state;
    const uploadProps = {
      name: 'multipartFile',
      accept: 'image/*',
      headers: {
        authorization: localStorage.getItem('token'),
      },
      action: api.uploadPicture,
      multiple: true,
    };
    return (
      <>
        <Upload
          {...uploadProps}
          listType="picture-card"
          fileList={value}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </Upload>

        <Modal
          width={1200}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          wrapClassName={styles['modal-previewer']}
        >
          <div className={styles.prev} onClick={this.goPrev}>
            <Icon type="left-circle" />
          </div>
          <div className={styles.next} onClick={this.goNext}>
            <Icon type="right-circle" />
          </div>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
export default FileUpload;
