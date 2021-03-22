import React, { useEffect } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { Charts } from 'ant-design-pro';
import { SectionHeader2 } from '@/components/SectionHeader';
import { round } from '@/components/ProgressRing';

const { WaterWave } = Charts;



function Index(props) {
  const {
    project,
    dashboard: { processStatisticsL = {} },
    dispatch,
    loading,
  } = props;

  const { id } = project;

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'dashboard/processStatisticsLRemote',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Card loading={loading} bodyStyle={{ padding: '0 0 16px' }} style={{ height: '100%' }}>
      <SectionHeader2 title="进度完成度" />
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <WaterWave height={180} title="当前进度" percent={round(processStatisticsL.finishRate * 100)} />
      </div>
      <div style={{ textAlign: 'center' }}>
        {`合同日期:   ${processStatisticsL.contractStartDate || ' - '} 至 ${processStatisticsL.contractEndDate || ' - '}`}
      </div>
      <div style={{ textAlign: 'center' }}>
        {`计划日期:   ${processStatisticsL.planStartDate || ' - '} 至 ${processStatisticsL.planEndDate || ' - '}`}
      </div>
    </Card>
  );
}

export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  loading: loading.effects['dashboard/processStatisticsLRemote'] || false,
}))(Index);
