import React, { PureComponent } from 'react';
import styles from './index.less';

interface IProps {
  files: string;
}

class FilePreview extends PureComponent<IProps> {
  fileItem = file => {
    return (
      <div key={file.id} className={styles['file-item']}>
        <a href={file.url} download target="_blank">
          {file.name}
        </a>
      </div>
    );
  };

  render() {
    const { files } = this.props;
    const FileList = files && JSON.parse(files).map(this.fileItem);

    return <div>{FileList}</div>;
  }
}
export default FilePreview;
