import React, { PureComponent } from 'react';
import { Card, DatePicker, Tabs, Button } from 'antd';
// import { Charts } from 'ant-design-pro';
import moment from 'moment';
import DashboardHeader from '@/components/DashboardHeader';
import styles from './FinanceCard.less';

// const { Bar } = Charts;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

class Index extends PureComponent {
  state = {
    values: [moment().subtract(1, 'year'), moment(new Date())],
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      values: value,
    });
  };

  handleOpenChange = (status) => {
    const { handleFinanceChange } = this.props;
    const { values } = this.state;

    if (!status) {
      const startDate = moment(values[0]).format('YYYY-MM');
      const endDate = moment(values[1]).format('YYYY-MM');
      handleFinanceChange({
        startDate,
        endDate,
      });
    }
  };

  render() {
    const { payList = [], receiptList = [], loading } = this.props;
    const { values } = this.state;
    return (
      <div
        style={{
          marginTop: '16px',
        }}
      >
        <DashboardHeader title="财务统计" />
        <Card
          loading={loading}
          bordered={false}
          size="small"
          bodyStyle={{
            padding: 0,
          }}
        >
          <div className={styles.financeCard}>
            <Tabs
              tabBarExtraContent={
                <div className={styles.financeExtraWrap}>
                  <RangePicker
                    dropdownClassName={styles.monthRangePicker}
                    allowClear={false}
                    showTime
                    format="YYYY-MM"
                    mode={['month', 'month']}
                    value={values}
                    style={{
                      width: '200px',
                    }}
                    size="small"
                    onOpenChange={this.handleOpenChange}
                    onPanelChange={this.handlePanelChange}
                  />
                  <span
                    style={{
                      marginLeft: 32,
                      fontSize: '12px',
                      color: '#ccc',
                    }}
                  >
                    单位：万元
                  </span>
                </div>
              }
              tabBarStyle={{
                marginBottom: 24,
              }}
            >
              <TabPane tab="收入" key="income">
                <div className={styles.financeBar}>
                  {/* <Bar height={295} title={null} data={receiptList} color="#1890ff" /> */}
                </div>
              </TabPane>
              <TabPane tab="支出" key="payment">
                <div className={styles.financeBar}>
                  {/* <Bar height={292} title={null} data={payList} color="#1890ff" /> */}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </div>
    );
  }
}

export default Index;
