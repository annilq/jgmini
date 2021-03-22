import React from 'react';
import TaskStatusButton from '@/components/StatusButton/TaskStatusButton';
import TaskLevelButton from '@/components/StatusButton/TaskLevelButton';

import styles from './index.less';
import RwIcon from "./ic_project-rw.png"

interface IProps {
  data: any;
  showIndicator?: boolean;
  columns: any[];
  onItemClick?: (params: any) => void;
  children?: any
}

function TableItemCell(props: IProps) {
  const { data = {}, onItemClick } = props;
  const { creatorName, createTime, title, content } = data
  return (
    <div
      className={styles['list-item']}
      onClick={onItemClick}
    >
      <div className={styles['list-item-content']}>
        <div style={{ marginRight: 16 }}>
          <img src={RwIcon} alt="任务"
            style={{
              width: 25, height: 25,
            }}
          />
        </div>
        <div style={{ flex: 1, width: "calc(100vw - 140px)" }}>
          <div className={styles.nowrap}>
            <TaskLevelButton data={data} style={{ lineHeight: "16px", marginRight: 5 }} />
            {title}
          </div>
          <div className={styles.nowrap}>{content}</div>
          <div>{creatorName || '无'}<span style={{ paddingLeft: 20 }}> {createTime || '无'}</span></div>
        </div>
        <TaskStatusButton data={data} style={{ alignSelf: "start", marginRight: 0, display: "block", width: "76px" }} />
      </div>
    </div >
  );
}

export default TableItemCell;
