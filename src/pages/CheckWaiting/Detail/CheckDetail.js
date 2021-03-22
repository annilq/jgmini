import React from 'react';
import { FilePreview, ImagePreview } from '@/components/CustomForm';
import StatusButton from '@/components/StatusButton';
import styles from './index.less';

function CheckDetail(props) {
  const { data = {}, ...rest } = props;
  return (
    <div {...rest}>
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
        <div className="form-info-label">附件</div>
        <div className="form-info-value">
          <FilePreview value={data.attachId} />
        </div>
      </div>
      <div className={styles.formItem}>
        <div className="form-info-label">图片</div>
        <div className="form-info-value">
          <ImagePreview value={data.picId} />
        </div>
      </div>
      <div className={styles.formItem}>
        <div className="form-info-label">检查状态</div>
        <div className="form-info-value">
          <StatusButton data={data} active/>
        </div>
      </div>
    </div>
  );
}

export default CheckDetail;
