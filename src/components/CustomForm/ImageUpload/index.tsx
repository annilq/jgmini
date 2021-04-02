import React from 'react';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import Services from '@/services';
import { file as api } from '@/services/api';

function transformData(item) {
  return {
    uid: item.id,
    id: item.id,
    name: item.fileName,
    url: item.key,
    thumbUrl: `${item.key}?x-oss-process=image/resize,m_fill,h_100,w_100`,
  };
}
class FileUpload extends React.PureComponent<JgFormProps.IFormProps> {

  onPickPhoto = () => {
    const { value, onChange } = this.props
    wx.chooseImage({
      count: 8,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: api.uploadPicture, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          header: {
            authorization: wx.getStorageSync('token'),
          },
          name: 'multipartFile',
          success(res) {
            const data = res.data;
            console.log(data);
            const response = JSON.parse(data);
            const { resp: files, code } = response;
            if (files && code === 0) {
              let filedata = []
              if (Array.isArray(files)) {
                filedata = files.map(transformData)
              } else {
                filedata = [files].map(transformData)
              }
              const propsValues = value && JSON.parse(value) || []
              propsValues.push(...filedata)
              console.log(propsValues);
              onChange(JSON.stringify(propsValues))
            }
          }
        })
      }
    })
  }

  onDelete = (file) => {
    const { value, onChange } = this.props
    Services.FileApi.del({ id: file.id }).then(() => {
      let files = JSON.parse(value)
      files = files.filter(curfile => curfile.id !== file.id)
      onChange(JSON.stringify(files))
    })
  }

  render() {
    const { value, label } = this.props;
    return (
      <ImagePreview files={value} onDelete={this.onDelete} label={label} onPickPhoto={this.onPickPhoto} />
    );
  }
}
export default FileUpload;
