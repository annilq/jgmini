import React, { Suspense } from 'react';

const ProjectCard = React.lazy(() => import('@/pages/Project/ProjectCard'));
// const ContractCard = React.lazy(() => import('@/pages/Contract/ContractCard'));
const ContractCard = React.lazy(() => import('@/pages/Contract/ContractCard2'));
const ProcessPlanCard = React.lazy(() => import('@/pages/ProjectPlan/ProcessPlanCard'));
const ProjectFuncCard = React.lazy(() => import('@/pages/ProjectFund/ProjectFundCard'));
// const FinanceCard = React.lazy(() => import('@/pages/Finance/FinanceCard'));
const FinanceCard = React.lazy(() => import('@/pages/Finance/FinanceCard2'));
const InvoiceCard = React.lazy(() => import('@/pages/Finance/InvoiceCard'));

function Main() {
  return (
    <>
      {/* <Suspense fallback={null}>
        <ProjectCard />
      </Suspense> */}
      <Suspense fallback={null}>
        <ContractCard />
      </Suspense>
      {/* <Suspense fallback={null}>
        <ProcessPlanCard />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectFuncCard />
      </Suspense> */}
      <Suspense fallback={null}>
        <FinanceCard />
      </Suspense>
      <Suspense fallback={null}>
        <InvoiceCard />
      </Suspense>
    </>
  );
}
export default Main;
