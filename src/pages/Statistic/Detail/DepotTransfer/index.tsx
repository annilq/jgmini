import React from 'react';
import { Tabs } from 'antd';
import PageContent from '@/pages/Statistic/Layout/PageContent';

import DepotIn from "@/pages/Statistic/Detail/DepotTransfer/DepotIn"
import DepotOut from "@/pages/Statistic/Detail/DepotTransfer/DepotOut"

const { TabPane } = Tabs;
function Main(props) {
  const { reportCode } = props;

  return (
    <PageContent
      title="库存调拨"
    >
      <Tabs size="large">
        <TabPane tab="调入仓库" key="depotin">
          <DepotIn reportCode={reportCode} />
        </TabPane>
        <TabPane tab="调出仓库" key="depotout">
          <DepotOut reportCode={reportCode} />
        </TabPane>
      </Tabs>
    </PageContent>
  );
}

export default Main;
