import React from 'react';
import { Tabs } from 'antd';
import PageContent from '@/pages/Statistic/Layout/PageContent';

import Project from "@/pages/Statistic/Detail/Settle/Project"
import Supply from "@/pages/Statistic/Detail/Settle/Supply"

const { TabPane } = Tabs;
function Main(props) {
  const { reportCode } = props;

  return (
    <PageContent
      title="结算"
    >
      <Tabs size="large">
        <TabPane tab="项目" key="material">
          <Project reportCode={reportCode} />

        </TabPane>
        <TabPane tab="供应商" key="project">
          <Supply reportCode={reportCode} />
        </TabPane>
      </Tabs>
    </PageContent>
  );
}

export default Main;
