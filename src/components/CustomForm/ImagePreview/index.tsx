import React from 'react';
import { Modal, Icon } from 'antd';
import styles from './index.less';

interface IProps {
  files: string;
}

interface IStates {
  previewVisible: boolean;
  previewImage: string;
}

class FilePreview extends React.PureComponent<IProps, IStates> {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  //  附件预览
  handlePreview = file => {
    this.setState({ previewImage: file.url, previewVisible: true });
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  fileItem = file => {
    return (
      <div key={file.id} className={styles['file-item']}>
        <img alt="example" src={file.thumbUrl} onClick={() => this.handlePreview(file)} />
      </div>
    );
  };

  findCurIndex = () => {
    const { previewImage } = this.state;
    const files = (this.props.files && JSON.parse(this.props.files)) || [];
    return files.findIndex(file => file.url === previewImage);
  };

  goPrev = () => {
    const files = (this.props.files && JSON.parse(this.props.files)) || [];
    const previewImageIndex = this.findCurIndex();
    const goIndex = previewImageIndex === 0 ? files.length - 1 : previewImageIndex - 1;
    this.handlePreview(files[goIndex]);
  };

  goNext = () => {
    const files = (this.props.files && JSON.parse(this.props.files)) || [];
    const previewImageIndex = this.findCurIndex();
    const goIndex = previewImageIndex === files.length - 1 ? 0 : previewImageIndex + 1;
    this.handlePreview(files[goIndex]);
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const files = (this.props.files && JSON.parse(this.props.files)) || [];
    const FileList = files && files.map(this.fileItem);

    return (
      <>
        <div className={styles['file-list']}>{FileList}</div>
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
export default FilePreview;
