import React from 'react';
import { Tag } from 'annar';

import List from '@/components/DataList';
import { View, Text } from 'remax/wechat';
import classNames from 'classnames';

import { getApprovalTypeTextColor } from '@/utils/utils';
import { connect } from 'react-redux';
import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';

import styles from './index.less';
import Avatar from './avatar.png';


class AuditList extends React.Component {
  componentDidMount() {
    const { dispatch, instanceId } = this.props;
    dispatch({ type: 'workflow/queryAuditList', payload: { instanceId } });
  }

  render() {
    const {
      workflow: { auditList },
      editLoading,
      ...rest
    } = this.props;
    return (
      <View {...rest}>
        <List
          data={{ list: auditList }}
          renderItem={(item) => (
            <List.Item className={styles.auditItem}>
              <View
                style={{
                  padding: '20px',
                  flex: 1
                }}
                className={classNames({
                  [styles.tagDivCss]: item && item.operateType === 4,
                })}
              >
                <View style={{ display: 'flex' }}>
                  <img
                    src={item.avatar || Avatar}
                    style={{
                      borderRadius: '50%',
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                    }}
                    alt="头像"
                  />
                  <View
                    style={{
                      marginLeft: '15px',
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: 'bold', color: '#333' }}>{item.operatorName}</Text>
                      <Text style={{ color: '#999' }}>({item.nodeName})</Text>
                      <Text style={{ fontWeight: 'bold', color: '#333' }}>({item.spendTime})</Text>
                    </View>
                    <View style={{ color: '#999' }}>{item.operateTime}</View>
                    {item.operateType === 4 ? (
                      <View>
                        <Tag className={styles.tagColor}>{item.operateTypeDesc}</Tag>
                      </View>
                    ) : (
                        <View style={{
                          color: getApprovalTypeTextColor(item.operateType),
                          marginTop: '3px'
                        }}
                        >
                          [{item.operateTypeDesc}]
                        </View>
                      )
                    }
                  </View>
                </View>
                {item.opinion && (
                  <View className={styles.auditItemContent}>
                    <View className={styles.label}>
                      审批意见：
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>{item.opinion}</Text>
                  </View>
                )}
                {item.fileId && (
                  <View className={styles.auditItemContent}>
                    <View className={styles.label}>
                      附件：
                    </View>
                    <FilePreview value={item.fileId} />
                  </View>
                )}
                {item.picId && (
                  <View className={styles.auditItemContent}>
                    <View className={styles.label}>
                      图片：
                    </View>
                    <ImagePreview value={item.picId} />
                  </View>
                )}
                {item.changeHistory && (
                  <View className={styles.auditItemContent}>
                    <View className={styles.label}>
                      修改记录：
                    </View>
                    {item.changeHistory}
                  </View>
                )}
              </View>
            </List.Item>
          )}
        />
      </View>
    );
  }
}

export default connect(({ workflow, loading }) => ({
  workflow,
  editLoading: loading.effects['workflow/queryAuditList'] || false,
}))(AuditList);
