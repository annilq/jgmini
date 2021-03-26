import React from 'react';
import { View, Image, Text } from 'remax/wechat';
import styles from './index.less';

interface IProps {
  files: string;
  onDelete?: any;
  onPickPhoto?: any
}

class ImagePreview extends React.PureComponent<IProps> {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  //  附件预览
  handlePreview = file => {
    const { files } = this.props
    const filesUrls = files && JSON.parse(files).map(item => item.url) || []
    wx.previewImage({
      current: file.url, // 当前显示图片的http链接
      urls: filesUrls
    })
  };

  fileItem = file => {
    const { onDelete } = this.props
    return (
      <>
        { onDelete && <Text>删除</Text>}
        <Image key={file.id} className={styles['file-item']} src={file.thumbUrl} onClick={() => this.handlePreview(file)} />
      </>
    );
  };

  render() {
    const { onPickPhoto, files } = this.props
    const filesValue = files && JSON.parse(files) || [];
    const FileList = filesValue && filesValue.map(this.fileItem);
    return (
      <>
        <View className={styles['file-list']}>{FileList}</View>
        {onPickPhoto &&
          <View
            className={styles['file-item']}
            onClick={onPickPhoto}
          >
            添加
        </View>}
      </>
    );
  }
}
export default ImagePreview;
