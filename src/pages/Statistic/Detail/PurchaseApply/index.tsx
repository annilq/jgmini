import React from 'react';
import { Tabs } from 'antd';
import PageContent from '@/pages/Statistic/Layout/PageContent';

import Project from "@/pages/Statistic/Detail/PurchaseApply/Project"
import Material from "@/pages/Statistic/Detail/PurchaseApply/Material"

const { TabPane } = Tabs;
function Main(props) {
  const { reportCode } = props;

  return (
    <PageContent
      title="采购申请"
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
