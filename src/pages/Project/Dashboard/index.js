import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';

const ProjectCard = React.lazy(() => import('@/pages/Project/ProjectCard'));
const FinanceCard = React.lazy(() => import('@/pages/Finance/FinanceCard'));

function Main({
  project,
  financeLoading,
  dispatch,
  dashboard: { payList = [], receiptList = [] },
}) {
  const { id } = project;
  useEffect(
    () => {
      if (id) {
        dispatch({ type: 'dashboard/receiptRemote', payload: { projectId: id } });
        dispatch({ type: 'dashboard/payRemote', payload: { projectId: id } });
      }
    },
    [id]
  );
  function handleFinanceChange(values) {
    dispatch({ type: 'dashboard/receiptRemote', payload: { ...values, projectId: id } });
    dispatch({ type: 'dashboard/payRemote', payload: { ...values, projectId: id } });
  }
  return (
    <>
      <Suspense fallback={null}>
        <ProjectCard />
      </Suspense>
      <Suspense fallback={null}>
        <FinanceCard
          payList={payList}
          receiptList={receiptList}
          handleFinanceChange={handleFinanceChange}
          loading={financeLoading}
        />
      </Suspense>
    </>
  );
}
export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  financeLoading:
    loading.effects['dashboard/receiptRemote'] || loading.effects['dashboard/payRemote'] || false,
}))(Main);
