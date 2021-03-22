import React, { PureComponent } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { FilePreview, ImagePreview } from '@/components/CustomForm';

import Avatar from '@/assets/avatar.png';
import styles from './index.less';

class Main extends PureComponent {
  render() {
    const { data = [] } = this.props;
    return (
      <div className="containers">
        <SectionHeader
          title="整改情况"
          style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
        />
        <div className="form-container-content">
          {data.map((item, index) => (
            <Detail
              data={item}
              key={index}
              style={{
                ...(index === 0 && { borderBottom: 'dashed 1px #d9d9d9' }),
                padding: '20px 0',
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

function Detail({ data }) {
  let Tip = null;
  switch (data.type) {
    case 0:
      Tip = <span style={{ color: '#999' }}> [进行了整改反馈]</span>;
      break;
    case 1:
      Tip = <span style={{ color: '#1893ff' }}>[复检通过]</span>;
      break;
    case 2:
      Tip = <span style={{ color: '#ff5546' }}>[复检驳回]</span>;
      break;

    default:
      break;
  }
  return (
    <div className={styles.comment}>
      <div className={styles.leftPart}>
        <div className={styles.avatar}>
          <img
            src={data.avatar || Avatar}
            alt={data.inspectorName}
            width="60px"
            height="60px"
            style={{ borderRadius: '50%', overflow: 'hidden' }}
          />
          {data.inspectorName}
        </div>
      </div>
      {/* 1.反馈 2通过 3拒绝 */}
      <div className={styles.content}>
        <div>
          <span style={{ fontWeight: 'bold' }}> {data.userName}</span>

          {Tip}
        </div>
        <div>{data.content}</div>
        <ImagePreview value={data.picId} />
        <FilePreview value={data.attachId} />
        <div style={{ color: '#999' }}>{data.createTime}</div>
      </div>
    </div>
  );
}
export default Main;
