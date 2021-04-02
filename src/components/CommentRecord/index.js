import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'remax/wechat';
import { Cell } from "annar"
import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import List from '@/components/DataList';

import styles from './index.less';
import Avatar from './avatar.png';
import CommentForm from './comment';


class CommentRecord extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, entity, formCode } = this.props;
    dispatch({
      type: 'comment/listRemote',
      payload: { entityId: entity.id, moduleCode: formCode },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'comment/reset',
    });
  }

  remove = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'comment/removeRemote', payload: { id: params.id } });
  };

  render() {
    const {
      comment: { data = {} },
      entity,
      formCode,
      dispatch,
    } = this.props;
    const listHeight = {
      height: '100vh',
      overflow: 'auto',
    };
    return (
      <View className={styles.list} style={listHeight}>
        <CommentForm entity={entity} formCode={formCode} />
        <List
          data={data}
          loadMore={params => {
            dispatch({ type: 'comment/listRemote', payload: { ...params, entityId: entity.id, moduleCode: formCode } });
          }}
          renderItem={item => (
            <View style={{ display: "flex", padding: "0 20px", marginTop: "20px" }}>
              <Image
                src={item.avatar || Avatar}
                style={{
                  borderRadius: '50%',
                  width: '120px',
                  height: '120px',
                }}
                alt="头像"
              />
              <View style={{ padding: "20px", flex: 1 }}>
                <View>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>
                    {item.creatorName}
                  </Text>
                  <Text>
                    {item.content}
                  </Text>
                </View>
                {item.picId ? (
                  <ImagePreview value={item.picId} />
                ) : null}
                {item.attachId ? (
                  <FilePreview value={item.attachId} />
                ) : null}
                <Text style={{ color: '#999', marginTop: '10px' }}>{item.createTime}</Text>
              </View>
              <View
                style={{ padding: "20px 0",color:"#f00" }}
                onClick={() => this.remove(item)}
              >
                删除
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

export default connect(({ comment, loading }) => ({
  comment,
  editLoading:
    loading.effects['comment/listRemote'] ||
    loading.effects['comment/addRemote'] ||
    loading.effects['comment/removeRemote'] ||
    false,
}))(CommentRecord);
