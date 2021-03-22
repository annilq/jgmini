import React, { PureComponent, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';
import { Charts } from 'ant-design-pro';
import BreadcrumbView from '@/components/Breadcrumb';

const { Pie } = Charts;

function Statistics(props) {
  const { loading, statisticList, dispatch } = props;

  useEffect(function() {
    dispatch({ type: 'task/statisticRemote' });
  }, []);

  const [tasksUndo, tasksdone, tasksDelay] = useMemo(
    () => [getListByGroupId('Group1'), getListByGroupId('Group2'), getListByGroupId('Group3')],
    [statisticList]
  );
  const [totalUndo, totaldone, totalDelay] = useMemo(
    () => [totaTaskByGroup(tasksUndo), totaTaskByGroup(tasksdone), totaTaskByGroup(tasksDelay)],
    [statisticList]
  );

  function getListByGroupId(groupId) {
    return statisticList
      .filter(item => item.groupId === groupId)
      .map(item => ({ x: item.typeName, y: item.count }));
  }

  function totaTaskByGroup(group) {
    return group.reduce((pre, now) => now.y + pre, 0);
  }
  // console.log(tasksUndo, tasksdone, tasksDelay);
  const PieConfig = {
    valueFormat: value => <span>{`${value} 条`}</span>,
    height: 200,
    hasLegend: true,
  };

  return (
    <BreadcrumbView>
      <Card loading={loading} bordered={false}>
        <Row>
          <Col span={8}>
            <Pie
              {...PieConfig}
              total={totalUndo}
              title="未完成"
              data={tasksUndo}
              subTitle="未完成"
            />
          </Col>
          <Col span={8}>
            <Pie
              {...PieConfig}
              total={() => totaldone}
              title="已完成"
              data={tasksdone}
              subTitle="已完成"
            />
          </Col>
          <Col span={8}>
            <Pie
              {...PieConfig}
              total={() => totalDelay}
              title="延期"
              data={tasksDelay}
              subTitle="延期"
            />
          </Col>
        </Row>
      </Card>
    </BreadcrumbView>
  );
}

export default connect(({ task, loading }) => ({
  statisticList: task.statisticList,
  loading: loading.effects['task/statisticRemote'] || false,
}))(Statistics);
