import React from 'react';
import { Card } from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import StatisticList from './List';

function Index(props) {
// 每当项目后面遇到需求变更，我总是想着借此机会优化，毫无疑问
// 但我从来不优化。为什么，因为太难了
  return (
    <Card
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <GridContent>
        <StatisticList />
      </GridContent>
    </Card>);
}

export default Index;
