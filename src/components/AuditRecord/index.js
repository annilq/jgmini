import React from 'react';
import { List, Tag } from 'antd';
import { getApprovalTypeTextColor } from '@/utils/utils';
import { connect } from 'react-redux';
import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import styles from './index.less';
import classNames from 'classnames';
import Avatar from './avatar.png';

@connect(({ workflow, loading }) => ({
  workflow,
  editLoading: loading.effects['workflow/queryAuditList'] || false,
}))
class AuditList extends React.Component {
  componentDidMount() {
    const { dispatch, instanceId } = this.props;
    dispatch({ type: 'workflow/queryAuditList', payload: { instanceId } });
  }

  render() {
    const {
      workflow: { auditList },
      editLoading,
    } = this.props;
    return (
      <div className={styles.approval}>
        <List
          loading={editLoading}
          itemLayout="horizontal"
          dataSource={auditList}
          style={{ background: '#fafafa' }}
          renderItem={item => (
            <List.Item style={{ marginBottom: '8px', background: '#ffffff', padding: 0 }}>
              <div
                className={classNames({
                  [styles.tagDivCss]: item && item.operateType === 4,
                })}
              >
                <div style={{ fontSize: '14px',fontFamily:'Microsoft YaHei UI', padding: '21px 40px 16px 40px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img
                      src={item.avatar || Avatar}
                      style={{
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: '15px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '400px' }}>
                          <span style={{ fontWeight: 'bold', color: '#333' }}>
                            {item.operatorName}
                          </span>
                          <span style={{ color: '#999' }}>({item.nodeName})</span>
                          <span style={{ fontWeight: 'bold', color: '#333' }}>
                            ({item.spendTime})
                          </span>
                        </div>
                        <div style={{ color: '#999' }}>{item.operateTime}</div>
                      </div>
                      {item.operateType === 4 ? (
                        <div>
                          <Tag className={styles.tagColor}>{item.operateTypeDesc}</Tag>
                        </div>
                      ) : (
                        <div
                          style={{
                            color: `${getApprovalTypeTextColor(item.operateType)}`,
                            marginTop: '3px',
                          }}
                        >
                          [{item.operateTypeDesc}]
                        </div>
                      )}
                    </div>
                  </div>
                  {item.opinion ? (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                      <div style={{ width: '75px', color: '#9e9e9e', textAlign: 'right' }}>
                        审批意见：
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{item.opinion}</span>
                    </div>
                  ) : null}
                  {item.fileId ? (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                      <div style={{ width: '75px', color: '#9e9e9e', textAlign: 'right' }}>
                        附件：
                      </div>
                      <FilePreview files={item.fileId} />
                    </div>
                  ) : null}
                  {item.picId ? (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                      <div style={{ width: '75px', color: '#9e9e9e', textAlign: 'right' }}>
                        图片：
                      </div>
                      <ImagePreview files={item.picId} />
                    </div>
                  ) : null}
                  {item.changeHistory ? (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                      <div style={{ width: '75px', color: '#9e9e9e', textAlign: 'right' }}>
                        修改记录：
                      </div>
                      {item.changeHistory}
                    </div>
                  ) : null}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default AuditList;
