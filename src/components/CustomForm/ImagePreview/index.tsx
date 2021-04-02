import React from 'react';
import { View, Image, Text } from 'remax/wechat';
import { Icon } from "annar"
import styles from './index.less';

interface IProps {
  label?: string;
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
      <View style={{ position: "relative" }}>
        { onDelete && (
          <View
            onTap={() => onDelete(file)}
            className={styles['file-item-delete']} 
          >
            <Icon type="delete" />
          </View>
        )}
        <Image key={file.id} className={styles['file-item']} src={file.thumbUrl} onClick={() => this.handlePreview(file)} />
      </View>
    );
  };

  render() {
    const { onPickPhoto, files, label } = this.props
    const filesValue = files && JSON.parse(files) || [];
    const FileList = filesValue && filesValue.map(this.fileItem);
    return (
      <>
        {label && <View className={styles['file-label']}>{label}</View>}
        <View className={styles['file-list']}>
          {onPickPhoto && <View
            className={styles['file-item']}
            style={{
              border: "1px dashed #e1e1e1",
              display: "flex",
              borderRadius: "10px",
              overflow: "hidden",
              justifyContent: "center"
            }}
            onClick={onPickPhoto}
          >
            <Text style={{
              color: "#c8c8c8",
              fontSize: "30px",
              alignSelf: "center"
            }}
            >添加</Text>
          </View>}
          {FileList}
        </View>
      </>
    );
  }
}
export default ImagePreview;
