import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { Popover, Input, Icon, Button, Spin } from 'antd';

import useDebounce from '@/hooks/useDebounce';
import styles from './index.less';
import selectImg from '@/assets/selectImg.png';
import moreImg from '@/assets/more-1.png';

function ProjectSwitch({ project, data, loading, dispatch }) {
  const appCode = wx.getStorageSync('app-code');
  const [visible, setVisible] = useState(false);

  const { name, id } = project;
  useEffect(
    () => {
      if (id) {
        // 项目改变的时候重新渲染列表
        dispatch({ type: 'jgTableModel/listRemote', payload: { projectId: id } });
      }
    },
    [id]
  );

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const { searchParams } = urlParams;
    if (appCode === '07') {
      let projectId = wx.getStorageSync('projectId') || searchParams.get('projectId');
      // session中有就用session的,没有就用url上面的
      if (projectId) {
        wx.setStorageSync('projectId', projectId);
        dispatch({ type: 'project/queryRemote', payload: { id: projectId } });
        dispatch({ type: 'project/listRemote' });
      } else {
        console.info('session或者url中没有保存到项目信息');
      }
    } else {
      sessionStorage.removeItem('projectId');
    }
  }, []);

  // 不是项目面板就不显示
  if (appCode !== '07') {
    return null;
  }

  return (
    <div className={styles['project-switch']}>
      <Popover
        placement="bottomLeft"
        content={
          <ProjectList
            data={data}
            value={project}
            loading={loading}
            onChange={data => {
              setVisible(false);
              // 切换项目
              dispatch({ type: 'project/project', payload: data });
            }}
            onSearch={name => dispatch({ type: 'project/listRemote', payload: { name } })}
            loadMore={() => {
              dispatch({
                type: 'project/pageRemote',
                payload: { ...data.pagination, currentPage: data.pagination.currentPage + 1 },
              });
            }}
          />
        }
        trigger="click"
        onVisibleChange={setVisible}
        visible={visible}
        overlayClassName={styles['project-popover']}
      >
        <Input
          value={name || '项目名称'}
          readOnly
          suffix={<img src={moreImg} />}
          className={styles['project-seleced']}
          onClick={() => setVisible(true)}
        />
      </Popover>
    </div>
  );
}

function ProjectList({ onChange, loading, data, value, loadMore, onSearch }) {
  const listRef = useRef(null);
  const [project, setProject] = useState(value);
  const [searchTerm, setSearchTerm] = useState('');
  // API search results

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { list, pagination } = data;
  const { currentPage, totalPage } = pagination;
  function ListScrollHandle(event: Event) {
    const target = event.target as HTMLElement;
    // 加载更多
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      if (currentPage < totalPage) {
        loadMore();
      }
    }
  }

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        onSearch(debouncedSearchTerm);
      } else {
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  useEffect(
    () => {
      listRef.current.addEventListener('scroll', ListScrollHandle, false);
      return () => {
        // cleanup
        listRef.current.removeEventListener('scroll', ListScrollHandle);
      };
    },
    [currentPage]
  );

  return (
    <div className={styles['project-list-wrapper']}>
      <Input
        placeholder="查找项目"
        suffix={<Icon type="search" />}
        className={styles['project-search-input']}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className={styles['project-label']}>所有项目</div>
      <div className={styles['project-list']} ref={listRef}>
        {list.map(item => (
          <div key={item.id} className={styles['project-item']} onClick={() => setProject(item)}>
            <div className={styles['project-name']}> {item.name}</div>
            {item.id === project.id && <img src={selectImg} style={{ alignSelf: 'center' }} />}
          </div>
        ))}
        {currentPage < totalPage ? (
          <div className={styles['load-more']}>
            加载更多
            <Spin spinning={loading} />
          </div>
        ) : (
          <div className={styles['no-data']}>没有更多数据了</div>
        )}
      </div>
      <Button
        onClick={() => onChange(project)}
        type="primary"
        style={{ margin: '0 auto', display: 'block' }}
      >
        确定
      </Button>
    </div>
  );
}

export default connect(({ project, loading }) => ({
  project: project.project,
  data: project.data,
  loading: loading.effects['project/listRemote'] || loading.effects['project/pageRemote'] || false,
}))(ProjectSwitch);
