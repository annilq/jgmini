import React from 'react';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import Dashboard from "./dashboard"

function Detail(props) {
  const { projectId } = props
  return (
    <DetailLayout projectId={projectId} >
      <Dashboard />
    </DetailLayout>);
}

export default Detail;
