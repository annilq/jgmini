import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Col, Row } from 'antd';

import ProcessPlanCardL from './ProcessPlanCardL';
import ProcessPlanCardR from './ProcessPlanCardR';

function Index() {
  return (
    <div
      style={{
        marginTop: '16px',
      }}
    >
      <DashboardHeader title="进度统计" />
      <Row gutter={16}>
        <Col span={6}>
          <ProcessPlanCardL />
        </Col>
        <Col span={18}>
          <ProcessPlanCardR />
        </Col>
      </Row>
    </div>
  );
}

export default Index;
