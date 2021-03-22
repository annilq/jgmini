import React from 'react';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import Detail from "@/pages/Statistic/Detail/Quality/detail"

function Main(props) {
  const { projectId, data } = props;
  return (
    <DetailLayout projectId={projectId}>
      <Detail data={data} />
    </DetailLayout>
  );
}

export default Main;
