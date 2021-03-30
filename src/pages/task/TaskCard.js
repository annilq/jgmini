import React, { PureComponent } from 'react';
import { Card, Tabs, Empty } from 'antd';
import router from 'umi/router';
import styles from '@/pages/Dashboard/index.less';
import { connect } from 'react-redux';
import DashboardHeader from '@/components/DashboardHeader';
import { SectionHeader2 } from '@/components/SectionHeader';


const { TabPane } = Tabs;

const TaskItem = ({ item, onItemClick }) => (
  <Card
    bodyStyle={{ padding: 0, width: '200px' }}
    hoverable
    className={styles.dashboardItemCard}
    onClick={() => onItemClick(item)}
  >
    <div style={{ padding: '20px 12px 12px' }}>
      <Card.Meta
        title={
          <div style={{ fontSize: '15px', fontWeight: 'bold', margin: '5px 0 30px 0' }}>
            {item.title}
          </div>
        }
      />
      <div className={styles.item}>
        <span>项目: </span>
        <span className={styles.normal}>{item.projectName}</span>
      </div>

      <div className={styles.item}>
        <span>开始时间: </span>
        <span className={styles.normal}>{item.beginDate}</span>
      </div>
      <div className={styles.item}>
        <span>结束时间: </span>
        <span className={styles.normal}>{item.endDate}</span>
      </div>
      <div className={styles.item}>
        <span>负责人: </span>
        <span className={styles.normal}>{item.principalName}</span>
      </div>
      <div className={styles.item}>
        <span>创建人: </span>
        <span className={styles.normal}>{item.creatorName}</span>
      </div>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <span>{item.createTime}</span>
      </div>
    </div>
  </Card>
);

@connect(({ task, loading }) => ({
  pendingList: task.pendingList,
  loading: loading.effects['task/pendingListRemote'] || false,
}))
class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'task/pendingListRemote' });
  }

  onItemClick = item => {
    const { dispatch } = this.props;
    router.push('/taskManagement/task/pending');
    const curRouter = getRouterConfig({ name: 'pending' });
    dispatch({
      type: 'menu/setCurRouter',
      payload: {
        curRouter,
      },
    });
    dispatch({
      type: 'jgTableModel/queryRemote',
      payload: item.id,
    });
    dispatch({ type: 'jgTableModel/toggleDetail', payload: true });
  };

  render() {
    const { pendingList = [], loading } = this.props;
    return (
      <Card
        loading={loading}
        bordered={false}
        tabList={this.titleList}
        extra={
          <div className={styles.all}>
            <a
              onClick={() => this.onItemClick()}
            >
              全部
              </a>
          </div>
        }
        className={styles.dashboardCard}
        size="small"
        title={<SectionHeader2>任务</SectionHeader2>}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
        style={{
          marginTop: '16px',
        }}
      >
        {contentList[this.state.key]}
      </Card>
    );
  }
}

export default Index;
