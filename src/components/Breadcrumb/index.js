import React from 'react';
import { Card } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

const BreadcrumbWrapper = ({ children }) => (
  <Card bordered={false} bodyStyle={{ padding: 0 }}>
    {children ? (
      <div style={{padding: '16px'}}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </Card>
);

export default BreadcrumbWrapper;
