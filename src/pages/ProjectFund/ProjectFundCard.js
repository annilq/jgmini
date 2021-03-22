import React, { useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { Card, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import DashboardHeader from '@/components/DashboardHeader';
import { SectionHeader2 } from '@/components/SectionHeader';

function Main(props) {
  const {
    project,
    dashboard: { fundStatistics = {} },
    dispatch,
    loading,
  } = props;

  const { id } = project;
  const { detailList = [], year } = fundStatistics;

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'dashboard/fundStatisticsRemote',
        payload: { projectId: id, year: new Date().getFullYear() },
      });
    }
  }, [id]);

  const sumValue = {
    itemName: '合计',
    type: 'sum',
  };

  if (detailList) {
    detailList.forEach((item) => {
      for (let index = 1; index < 13; index++) {
        const plan = `month${index}`;
        const actual = `month${index}Use`;
        sumValue[plan] = (sumValue[plan] || 0) + item[plan];
        sumValue[actual] = (sumValue[actual] || 0) + item[actual];
      }
    });
  }

  const changeYear = (date, dateString) => {
    dispatch({
      type: 'dashboard/fundStatisticsRemote',
      payload: { projectId: id, year: dateString },
    });
  };

  return (
    <div
      style={{
        marginTop: '16px',
      }}
    >
      <DashboardHeader title="资金统计" />
      <Card bordered={false} loading={loading} bodyStyle={{ padding: 0 }}>
        <SectionHeader2 title="资金计划">
          <span style={{ float: 'right', fontSize: '14px', paddingRight: 16 }}>
            <div
              style={{
                marginLeft: 20,
                marginRight: 10,
                display: 'inline-block',
                width: 12,
                height: 12,
                backgroundColor: '#93D072',
              }}
            />
            计划资金
            <div
              style={{
                marginLeft: 20,
                marginRight: 10,
                display: 'inline-block',
                width: 12,
                height: 12,
                backgroundColor: '#2D71E7',
              }}
            />
            实际资金
            <DatePicker
              value={moment(year)}
              onChange={changeYear}
              picker="year"
              style={{ marginLeft: '16px' }}
            />
          </span>
        </SectionHeader2>
        <ChartItem value={sumValue} />
      </Card>
    </div>
  );
}

function ChartItem(props) {
  const { value, style } = props;
  let data = [];
  for (let index = 1; index < 13; index++) {
    const plan = `month${index}`;
    const actual = `month${index}Use`;
    const dateStr = `${index}月`;
    data = data.concat([
      { date: dateStr, value: value[plan] || 0, type: '计划资金' },
      { date: dateStr, value: value[actual] || 0, type: '实际资金' },
    ]);
  }
  // console.log(data);
  const config = {
    isGroup: true,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ({ type }) => {
      switch (type) {
        case '计划资金':
          return '#93D072';
        case '实际资金':
          return '#2D71E7';
      }
    },
    padding: 'auto',
    appendPadding : 30,
    legend: false,
    yAxis: {
      grid: {
        line: {
          style: {
            lineDash: [4, 5],
          }
        }
      }
    },
    columnWidthRatio : 0.4,
    marginRatio : 0.2
  };
  return (
    <div
      style={{
        width: '100%',
        height: 400,
      }}
    >
      <Column {...config} />
    </div>
  );
}

export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  loading: loading.effects['dashboard/fundStatisticsRemote'] || false,
}))(Main);
