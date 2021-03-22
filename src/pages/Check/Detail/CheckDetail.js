import React from 'react';
import { ImagePreview, FilePreview } from '@/components/CustomForm';
import StatusButton from '@/components/StatusButton';
import styles from './index.less';

function CheckDetail(props) {
  const { data = {}, style } = props;
  return (
    <div style={style}>
      <div className={styles.formItem}>
        <div className="form-info-label">检查内容</div>
        <div
          className="form-info-value"
          dangerouslySetInnerHTML={{
            __html: data.content && data.content.replace('\r\n', '<br/>'),
          }}
        />
      </div>
      <div className={styles.formItem}>
        <div className="form-info-label">检查结果</div>
        <div
          className="form-info-value"
          dangerouslySetInnerHTML={{
            __html: data.result && data.result.replace('\r\n', '<br/>'),
          }}
        />
      </div>
      <div className={styles.formItem}>
        <div className="form-info-label">检查状态</div>
        <div className="form-info-value">
          <StatusButton data={data} active />
        </div>
      </div>
      {data.picId &&
        <ImagePreview value={data.picId} />
      }

      {data.attachId &&
        <FilePreview value={data.attachId} />
      }
    </div>
  );
}

export default CheckDetail;
