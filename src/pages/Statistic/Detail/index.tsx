import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { Button, Card } from 'antd';

import router from 'umi/router';

import { getConfigFromCode } from "@/pages/Statistic/utils"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Card role="alert">
      <p>该模块尚未开发(reportCode 与本地的模块映射失败)</p>
      <Button onClick={resetErrorBoundary} type="primary">返回上一层</Button>
    </Card>
  )
}

const StatisticDetail = (props) => {
  const { match: { params: { reportCode } } } = props;
  const config = getConfigFromCode(reportCode);
  const Detail = React.lazy(() => import('./' + config.componentPath).catch(e => {
    // 这里的错误要自己捕获再返回，不然ErrorBoundary捕获不到
    // React error boundary will only catch rendering errors,the event handlers don’t happen during rendering
    // 可以通过使用useReducer来设置ErrorBoundary的error实现捕获异步error
    // https://github.com/isumix/react-exception#readme
    return e
  }));

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        router.goBack();
      }}
    >
      <Suspense fallback={false}>
        <Detail reportCode={reportCode} />
      </Suspense>
    </ErrorBoundary>
  )
};

export default StatisticDetail