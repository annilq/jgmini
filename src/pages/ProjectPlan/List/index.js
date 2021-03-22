import React from 'react';
import moment from "moment"
import ProgressRing from '@/components/ProgressRing';
import List from '@/components/DataList';
import Loading from '@/components/Loading';
import styles from "@/common/styles/projectplan.less"

const listHeight = {
  "height": 'calc(100vh - 56px)',
  "overflowY": 'scroll'
};

function Main(props) {
  const { data, showDetail, loading, onPaginationChange } = props;
  return (
    <>
      <Loading loading={loading}>
        <div style={listHeight}>
          <List
            renderItem={(item) => (
              <List.Item>
                <ProjectItemCard data={item} key={item.id} onItemClick={showDetail} />
              </List.Item>
            )}
            loading={loading}
            data={data}
            loadMore={(params) => {
              onPaginationChange(params)
            }}
          />
        </div>
      </Loading>
    </>
  );
}

function ProjectItemCard(props) {
  const { data, onItemClick } = props;

  const { finishRate = 0, projectName, planStartDate, planEndDate, lastReportTime, recordStatus } = data
  return (
    <div className={styles.planCard} onClick={() => onItemClick(data)}>
      <div className={styles.progress}>
        <ProgressRing value={(finishRate || 0)} status={recordStatus} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {projectName}
        </div>
        <div>
          计划开始时间：{planStartDate}
        </div>
        <div>
          计划结束时间：{planEndDate}
        </div>
        {lastReportTime &&
          (
            <div>
              最新填报日期：{lastReportTime && moment(lastReportTime).format("YYYY-MM-DD")}
            </div>
          )
        }
      </div>
    </div>
  );
}



export default Main;
