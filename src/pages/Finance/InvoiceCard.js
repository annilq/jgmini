import React, { useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { connect } from 'react-redux';
import DashboardHeader from '@/components/DashboardHeader';
import TablePicker from '@/components/CustomForm/DataPicker/table';
import styles from './FinanceCard.less';

const { TabPane } = Tabs;

function Index(props) {
  const {
    project,
    dashboard: { inputinvoices = {}, saleInvoices = {} },
    dispatch,
    loading,
  } = props;

  const { id } = project;
  useEffect(
    () => {
      if (id) {
        dispatch({ type: 'dashboard/invoiceInputRemote', payload: { id } });
        dispatch({ type: 'dashboard/invoiceSaleRemote', payload: { id } });
      }
    },
    [id]
  );

  function onPaginationChange(params) {
    dispatch({ type: 'dashboard/invoiceInputRemote', payload: { ...params, id } });
    dispatch({ type: 'dashboard/invoiceSaleRemote', payload: { ...params, id } });
  }

  return (
    <div
      style={{
        marginTop: '16px',
      }}
    >
      <DashboardHeader title="发票统计" />
      <Card loading={loading} bordered={false} size="small">
        <div className={styles.financeCard}>
          <Tabs
            // tabBarExtraContent={
            //   <div className={styles.financeExtraWrap}>
            //     <RangePicker
            //                   dropdownClassName={styles.monthRangePicker}
            //                   allowClear={false}
            //                   showTime
            //                   format="YYYY-MM"
            //                   mode={['month', 'month']}
            //                   value={values}
            //                   style={{
            //                     width: '200px',
            //                   }}
            //                   size="small"
            //                   onOpenChange={this.handleOpenChange}
            //                   onPanelChange={this.handlePanelChange}
            //                 />
            //     <span
            //       style={{
            //         marginLeft: 32,
            //         fontSize: '12px',
            //         color: '#ccc',
            //       }}
            //     >
            //       单位：万元
            //     </span>
            //   </div>
            // }
            tabBarStyle={{
              marginBottom: 0,
            }}
          >
            <TabPane tab="进项发票" key="income">
              <TablePicker
                // 在编辑基础数据时候需要用到formCode获取基础表需要的服务
                formCode="InputInvoice"
                data={inputinvoices}
                onPaginationChange={onPaginationChange}
              />
            </TabPane>
            <TabPane tab="销项发票" key="payment">
              <TablePicker
                // 在编辑基础数据时候需要用到formCode获取基础表需要的服务
                formCode="SaleInvoice"
                data={saleInvoices}
                onPaginationChange={onPaginationChange}
              />
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}

export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  loading:
    loading.effects['dashboard/invoiceInputRemote'] || loading.effects['dashboard/invoiceSaleRemote'] || false,
}))(Index);
