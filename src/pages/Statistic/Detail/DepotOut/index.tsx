import React from 'react';
import { Tabs } from 'antd';
import PageContent from '@/pages/Statistic/Layout/PageContent';

import Project from "@/pages/Statistic/Detail/DepotOut/Project"
import Material from "@/pages/Statistic/Detail/DepotOut/Material"

const { TabPane } = Tabs;
function Main(props) {
  const { reportCode } = props;

  return (
    <PageContent
      title="领料出库"
    >
      <Tabs size="large">
        <TabPane tab="项目" key="project">
          <Project reportCode={reportCode} />
        </TabPane>
        <TabPane tab="物资" key="material">
          <Material reportCode={reportCode} />
        </TabPane>
      </Tabs>
    </PageContent>
  );
}

export default Main;
