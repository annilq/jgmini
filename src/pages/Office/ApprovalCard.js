import React, { PureComponent } from 'react';
import { Card, Tabs, Empty } from 'antd';
import router from 'umi/router';
import { connect } from 'react-redux';

import { SectionHeader2 } from '@/components/SectionHeader';
import ApproveStatusButton from '@/components/StatusButton/ApproveStatusButton';
import styles from '@/pages/Dashboard/index.less';

import { diffTime } from '../../utils/utils';

const { TabPane } = Tabs;

const ApprovalItem = ({ item, onItemClick }) => (
  <Card
    bodyStyle={{ padding: 0, width: '200px' }}
    hoverable
    className={styles.dashboardItemCard}
    onClick={() => onItemClick(item)}
  >
    <div style={{ textAlign: 'right' }}>
      <ApproveStatusButton
        status={item.status}
        style={{
          marginRight: 0,
          borderRadius: " 0 10px 10px 10px",
          width: "6em"
        }}
      />
    </div>
    <div style={{ padding: '0 12px 12px' }}>
      <Card.Meta
        title={
          <div style={{ fontSize: '15px', fontWeight: 'bold', margin: '5px 0 30px' }}>
            {item.instanceName}
          </div>
        }
      />
      <div className={styles.item} style={{ marginBottom: '20px' }}>
        <span>申请内容: </span>
        <span className={styles.normal}>{item.instanceName}</span>
      </div>
      <div className={styles.item}>
        <span>申请人: </span>
        <span className={styles.normal}>{item.creatorName}</span>
      </div>
      <div className={styles.item}>
        <span>流程名称: </span>
        <span className={styles.normal}>{item.processName}</span>
      </div>
      <div className={styles.item}>
        <span>创建时间: </span>
        <span className={styles.normal}>{diffTime(item.createTime)}</span>
      </div>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <span>{item.createTime}</span>
      </div>
    </div>
  </Card>
);

const titleList = [
  {
    key: 'waiting',
    tab: '待我审批',
  },
  {
    key: 'start',
    tab: '我发起的',
  },
  {
    key: 'reject',
    tab: '被驳回的',
  },
];

@connect(({ dashboard, loading }) => ({
  dashboard,
  approvalLoading:
    loading.effects['dashboard/approvalRemote'] ||
    loading.effects['dashboard/approvalRejectRemote'] ||
    loading.effects['dashboard/approvalCreateRemote'] ||
    false,
}))
class Index extends PureComponent {
  state = {
    key: 'waiting',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'dashboard/approvalRemote' });
    dispatch({ type: 'dashboard/approvalRejectRemote' });
    dispatch({ type: 'dashboard/approvalCreateRemote' });

  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  onItemClick = item => {
    const { key } = this.state;
    const { dispatch } = this.props;
    switch (key) {
      case 'start':
        router.push('/office/mycreate');
        break;
      case 'waiting':
        router.push('/office/approval');
        break;
      case 'reject':
        router.push('/office/reject');
        break;
      default:
        break;
    }
    dispatch({ type: 'jgTableModel/toggleDetail', payload: true });
    dispatch({ type: 'workflow/flowData', payload: item });
  };

  render() {
    const {
      dashboard: { approvalList = [],
        approvalCreateList = [],
        approvalRejectList = [] },
      loading,
    } = this.props;

    const contentList = {
      waiting: (
        <div className={styles.dashboardListCard}>
          {approvalList.length ? (
            <Tabs>
              {approvalList.map(item => (
                <TabPane
                  disabled
                  tab={<ApprovalItem item={item} onItemClick={this.onItemClick} />}
                  key={item.id}
                />
              ))}
            </Tabs>
          ) : (
              <Empty style={{ margin: 24 }} />
            )}
        </div>
      ),
      start: (
        <div className={styles.dashboardListCard}>
          {approvalCreateList.length ? (
            <Tabs>
              {approvalCreateList.map(item => (
                <TabPane
                  disabled
                  tab={<ApprovalItem item={item} onItemClick={this.onItemClick} />}
                  key={item.id}
                />
              ))}
            </Tabs>
          ) : (
              <Empty style={{ margin: 24 }} />
            )}
        </div>
      ),
      reject: (
        <div className={styles.dashboardListCard}>
          {approvalRejectList.length ? (
            <Tabs>
              {approvalRejectList.map(item => (
                <TabPane
                  disabled
                  tab={<ApprovalItem item={item} onItemClick={this.onItemClick} />}
                  key={item.id}
                />
              ))}
            </Tabs>
          ) : (
              <Empty style={{ margin: 24 }} />
            )}
        </div>
      ),
    };

    return (
      <Card
        loading={loading}
        bordered={false}
        title={<SectionHeader2>审批</SectionHeader2>}
        extra={
          <div className={styles.all}>
            <a
              onClick={() => {
                const { key } = this.state;
                switch (key) {
                  case 'start':
                    router.push('/office/mycreate');
                    break;
                  case 'waiting':
                    router.push('/office/approval');
                    break;
                  case 'reject':
                    router.push('/office/reject');
                    break;
                  default:
                    break;
                }
              }}
            >
              全部
            </a>
          </div>
        }
        tabList={titleList}
        className={styles.dashboardCard}
        size="small"
        activeTabKey={this.state.key}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
      >
        {contentList[this.state.key]}
      </Card>
    );
  }
}

export default Index;
