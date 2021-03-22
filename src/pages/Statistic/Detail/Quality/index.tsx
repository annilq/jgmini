import React from 'react';
import { Tabs } from 'antd';
import PageContent from '@/pages/Statistic/Layout/PageContent';

import Project from "@/pages/Statistic/Detail/Quality/Project"
import Inspector from "@/pages/Statistic/Detail/Quality/Inspector"

const { TabPane } = Tabs;
function Main(props) {
  const { reportCode } = props;
  const title = reportCode === "quality" ? "质量检查" : "安全检查"
  return (
    <PageContent
      title={title}
    >
      <Tabs size="large">
        <TabPane tab="项目" key="project">
          <Project reportCode={reportCode} title={title} />
        </TabPane>
        <TabPane tab="检查人" key="Inspector">
          <Inspector reportCode={reportCode} title={title} />
        </TabPane>
      </Tabs>
    </PageContent>
  );
}

export default Main;
