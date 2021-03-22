import React from 'react';
import { List, Popconfirm, Icon, Card } from 'antd';
import { connect } from 'react-redux';
import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import styles from './index.less';
import classNames from 'classnames';
import Avatar from './avatar.png';
import CommentForm from './comment';
@connect(({ comment, loading,account }) => ({
  user:account.user,
  comment,
  editLoading: loading.effects['comment/listRemote'] ||
    loading.effects['comment/addRemote'] ||
    loading.effects['comment/removeRemote'] ||false,
}))
class CommentRecord extends React.Component {
  componentDidMount() {
    const { dispatch, entity, formCode } = this.props;
    dispatch({ type: 'comment/listRemote', payload: { entityId:entity.id ,moduleCode:formCode} });
  }

  remove = params =>{
    const { dispatch } = this.props;
    dispatch({ type: 'comment/removeRemote', payload: { id:params.id } });
  };
  render() {
    const {
      comment: { data={} },
      editLoading,
      entity,
      formCode,
      user
    } = this.props;
    
    const {list,pagination }= data;    
    return (
      <div className={styles.list}>
        <div style={{display:'flex', flexDirection: 'column', width:'100%',padding: '24px',background: '#ffffff',}}>
          <div style={{ display: 'flex', flexDirection: 'row',marginBottom:'10px',marginLeft:'10px' }}>
                          <span style={{ fontWeight: 'bold', color: '#333' }}>
                            {`共 ${pagination.total} 条`}
                          </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img
              src={user.avatar||Avatar}
              style={{
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                objectFit: 'cover',
              }}
            />
            <CommentForm
              entity={entity}
              formCode={formCode}
            />
          </div>
        </div>

        <List
          loading={editLoading}
          itemLayout="horizontal"
          split={false}
          pagination={{
            ...pagination,
            showTotal: total => { return `共 ${total} 条`},
            onChange: page => {
                const {dispatch} = this.props;
                dispatch({type: 'comment/pageRemote', payload: page});
            },
          }}
          dataSource={list}
          style={{ background: '#00000000' }}
          renderItem={item => (
            <List.Item style={{ padding: 0 }} >
              <Card
                bodyStyle={{ padding: 0}}
                hoverable
              >
              <div style={{display:'flex', flexDirection: 'row', width:'100%',padding: '21px 80px 16px 40px' }}>
                <img
                  src={item.avatar || Avatar}
                  style={{
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', flex:1 , fontSize: '14px',fontFamily:'Microsoft YaHei UI',marginLeft: '15px',marginRight: '100px',marginTop: '15px', }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span style={{ fontWeight: 'bold', color: '#333' }}>
                            {item.creatorName}
                          </span>
                      </div>
                        <div
                          style={{
                            marginTop: '3px',
                            fontWeight: 'bold',
                          }}
                        >
                          {item.content}
                        </div>
                    </div>

                  {item.picId ? (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                      <ImagePreview files={item.picId} />
                    </div>
                  ) : null}
                  {item.attachId ? (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>

                      <FilePreview files={item.attachId} />
                    </div>
                  ) : null}
                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <div style={{ color: '#999' }}>{item.createTime}</div>
                  </div>

                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <Popconfirm title="确认删除？" onConfirm={() => this.remove(item)} disabled={item.actionType==='readonly'}>
                    <a><Icon type="delete" style={{color:'#B1B1B1'}}/></a>
                  </Popconfirm>
                </div>
              </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CommentRecord;
