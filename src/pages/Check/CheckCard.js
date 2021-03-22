import React, { PureComponent } from 'react';
import { Card, Tabs, Empty } from 'antd';
import router from 'umi/router';
import { connect } from 'react-redux';
import styles from '@/pages/Dashboard/index.less';
import { getRouterConfig } from '@/models/menu';
import { SectionHeader2 } from '@/components/SectionHeader';

const { TabPane } = Tabs;

const CheckItem = ({ item, onItemClick }) => (
  <Card
    bodyStyle={{ width: '200px', padding: "20px 12px" }}
    hoverable
    className={styles.dashboardItemCard}
    onClick={() => onItemClick(item)}
  >
    <div>
      <Card.Meta
        title={
          <div style={{ fontSize: '15px', fontWeight: 'bold', margin: '5px 0 30px' }}>
            {item.recordNum}
          </div>
        }
      />
      <div className={styles.item}>
        <span>检查单: </span>
        <span className={styles.normal}>{item.inspectionNum}</span>
      </div>
      <div className={styles.item}>
        <span>整改要求: </span>
        <span className={styles.normal}>{item.requirement}</span>
      </div>
      <div className={styles.item}>
        <span>完成日期: </span>
        <span className={styles.normal}>{item.finishDate}</span>
      </div>
      <div className={styles.item}>
        <span>复检人: </span>
        <span className={styles.normal}>{item.creatorName}</span>
      </div>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <span>{item.createTime}</span>
      </div>
    </div>
  </Card>
);

const titleList = [
  {
    key: 'toFinish',
    tab: '待处理的',
  },
  {
    key: 'myCreate',
    tab: '我创建的',
  },
];

@connect(({ dashboard, loading }) => ({
  dashboard,
  approvalLoading:
    loading.effects['dashboard/reformCreateListRemote'] ||
    loading.effects['dashboard/reformPendingListRemote'] ||
    false,
}))
class Index extends PureComponent {
  state = {
    key: 'toFinish',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'dashboard/reformCreateListRemote' });
    dispatch({ type: 'dashboard/reformPendingListRemote' });
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  onItemClick = item => {
    const { dispatch } = this.props;
    const { category } = item;
    let path = "";
    // 1 质量 2 安全
    switch (category) {
      case 1:
        path = "/quality/rectification"
        break;
      case 2:
        path = "/safety/rectification"
        break;
      default:
        break;
    }

    router.push(path);
    const curRouter = getRouterConfig({ path });

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
    const {
      dashboard: {
        createLists = [],
        pendingLists = [],
      },
      loading,
    } = this.props;

    const contentList = {
      myCreate: (
        <div className={styles.dashboardListCard}>
          {createLists.length ? (
            <Tabs>
              {createLists.map(item => (
                <TabPane
                  disabled
                  tab={<CheckItem item={item} onItemClick={this.onItemClick} />}
                  key={item.id}
                />
              ))}
            </Tabs>
          ) : (
              <Empty style={{ margin: 24 }} />
            )}
        </div>
      ),
      toFinish: (
        <div className={styles.dashboardListCard}>
          {pendingLists.length ? (
            <Tabs>
              {pendingLists.map(item => (
                <TabPane
                  disabled
                  tab={<CheckItem item={item} onItemClick={this.onItemClick} />}
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
        title={<SectionHeader2>整改单</SectionHeader2>}
        tabList={titleList}
        className={styles.dashboardCard}
        size="small"
        activeTabKey={this.state.key}
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
