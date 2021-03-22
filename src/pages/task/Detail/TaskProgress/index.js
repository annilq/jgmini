import React, { useEffect, useState, useCallback } from 'react';
import List from '@/components/DataList';

import { connect } from 'react-redux';

import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import Avatar from './avatar.png';

function TaskProgress(props) {
  const { taskId, dispatch } = props;
  const [datalist, setData] = useState({ list: [], currentPage: 1, });
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      if (taskId) {
        dispatch({
          type: 'task/getProgressList',
          payload: { taskId },
          callback(response) {
            setData(response);
          }
        });
      }
    },
    [taskId]
  );
  const loadMore = (params) => {
    setLoading(true)
    dispatch({
      type: 'task/getProgressList', payload: { ...params, taskId }, callback(data) {
        setData({ ...data, list: datalist.list.concat(data.list) });
        setLoading(false)
      }
    });
  }

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <List
        data={datalist}
        loadMore={loadMore}
        style={{ background: '#fafafa' }}
        loading={loading}
        renderItem={item => (
          <List.Item style={{ marginBottom: '8px', padding: 0, backgroundColor: '#fff' }}>
            <div
              style={{
                fontSize: '14px',
                padding: '10px 12px',
                display: 'flex',
                width: "100%"
              }}
            >
              <img
                src={item.avatar || Avatar}
                style={{
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                }}
                alt={item.name}
              />
              <div style={{ marginLeft: '10px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>
                    {item.creatorName}
                    {item.typeDesc}
                  </span>
                  <div style={{ color: '#999' }}>{item.createTime}</div>
                </div>
                {item.remark ? (
                  <div
                    style={{
                      color: '#000',
                      backgroundColor: '#fff',
                      lineHeight: '24px',
                    }}
                  >
                    {item.remark}
                  </div>
                ) : null}
                {item.attachId ? <FilePreview value={item.attachId} /> : null}
                {item.picId ? <ImagePreview value={item.picId} /> : null}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default connect(({ loading }) => ({
  editLoading: loading.effects['task/getProgressList'] || false,
}))(TaskProgress);
