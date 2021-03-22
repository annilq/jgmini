import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import DashboardHeader from '@/components/DashboardHeader';
import numeral from 'numeral';
import { Charts } from 'ant-design-pro';
import { SectionHeader2 } from '@/components/SectionHeader';
import router from 'umi/router';

import styles from './ContractCard.less';

const { Pie } = Charts;

const convertData = (data = []) =>
  data && data.map((item) => ({ x: item.contractCate, y: item.amount }));


function Index(props) {
  const {
    project,
    dashboard: { inContractStatistics = {}, outContractStatistics = {} },
    dispatch,
    loading,
  } = props;

  const { id } = project;

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'dashboard/contractStatisticsRemote',
        payload: { inOrOut: 1, projectId: id },
      });
      dispatch({
        type: 'dashboard/contractStatisticsRemote',
        payload: { inOrOut: 0, projectId: id },
      });
    }
  }, [id]);

  const inContractData = convertData(inContractStatistics.list) || [];
  const outContractData = convertData(outContractStatistics.list) || [];

  return (
    <div
      style={{
        marginTop: '16px',
      }}
    >
      <DashboardHeader title="合同统计" />
      <Row gutter={16}>
        <Col span={12}>
          <Card
            loading={loading}
            bordered={false}
            bodyStyle={{ padding: '0 0 8px' }}
            className={styles.contractCard}
          >
            <SectionHeader2 title="收款合同">
              <a
                style={{ float: 'right', fontSize: '14px', color: '#939ba4', paddingRight: 16 }}
                onClick={() => router.push('/contract/inContract')}
              >
                全部
              </a>
            </SectionHeader2>
            <Pie
              hasLegend
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: numeral(inContractStatistics.amount).format('0,0.00'),
                  }}
                  style={{fontSize: inContractStatistics.amount > 999999 ? '20px' : '24px'}}
                />
              )}
              subTitle="合同总金额"
              data={inContractData}
              valueFormat={(val) => <span dangerouslySetInnerHTML={{ __html: `¥${val}` }} />}
              height={220}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            loading={loading}
            bordered={false}
            bodyStyle={{ padding: '0 0 8px' }}
            className={styles.contractCard}
          >
            <SectionHeader2 title="付款合同">
              <a
                style={{ float: 'right', fontSize: '14px', color: '#939ba4', paddingRight: 16 }}
                onClick={() => router.push('/contract/outContract')}
              >
                全部
              </a>
            </SectionHeader2>
            <Pie
              hasLegend
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: numeral(outContractStatistics.amount).format('0,0.00'),
                  }}
                  style={{fontSize: outContractStatistics.amount > 999999 ? '20px' : '24px'}}
                />
              )}
              subTitle="合同总金额"
              data={outContractData}
              valueFormat={(val) => <span dangerouslySetInnerHTML={{ __html: `¥${val}` }} />}
              height={220}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  loading: loading.effects['dashboard/contractStatisticsRemote'] || false,
}))(Index);
