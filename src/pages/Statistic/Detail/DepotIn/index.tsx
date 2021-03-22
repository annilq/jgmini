import React from 'react';
import { Tabs } from 'antd';
import PageContent from '@/pages/Statistic/Layout/PageContent';

import Supply from "@/pages/Statistic/Detail/DepotIn/Supply"
import Material from "@/pages/Statistic/Detail/DepotIn/Material"

const { TabPane } = Tabs;
function Main(props) {
  const { reportCode } = props;

  return (
    <PageContent
      title="采购入库"
    >
      <Tabs size="large">
        <TabPane tab="供应商" key="project">
          <Supply reportCode={reportCode} />
        </TabPane>
        <TabPane tab="物资" key="material">
          <Material reportCode={reportCode} />
        </TabPane>
      </Tabs>
    </PageContent>
  );
}

export default Main;
