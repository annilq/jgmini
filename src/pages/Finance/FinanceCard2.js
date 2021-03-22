import React, { useEffect } from 'react';
import { Card, DatePicker } from 'antd';
import { Line } from '@ant-design/charts';
import { connect } from 'react-redux';
import DashboardHeader from '@/components/DashboardHeader';
import { SectionHeader2 } from '@/components/SectionHeader';
import moment from 'moment';

function Index(props) {
  const {
    project,
    dashboard: { financeStatistics = {} },
    dispatch,
    loading,
  } = props;

  const { id } = project;
  const { list = [], year } = financeStatistics;

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'dashboard/financeStatisticsRemote',
        payload: { projectId: id, year: new Date().getFullYear() },
      });
    }
  }, [id]);

  const changeYear = (date, dateString) => {
    dispatch({
      type: 'dashboard/financeStatisticsRemote',
      payload: { projectId: id, year: dateString },
    });
  };

  return (
    <div
      style={{
        marginTop: '16px',
      }}
    >
      <DashboardHeader title="财税统计" />
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
        <SectionHeader2 title="收入/支出">
          <span style={{ float: 'right', fontSize: '14px', paddingRight: 16 }}>
            <div
              style={{
                marginLeft: 20,
                marginRight: 10,
                display: 'inline-block',
                width: 12,
                height: 12,
                backgroundColor: '#50d9e9',
              }}
            />
            收入
            <div
              style={{
                marginLeft: 20,
                marginRight: 10,
                display: 'inline-block',
                width: 12,
                height: 12,
                backgroundColor: '#a5a5ff',
              }}
            />
            支出
            <DatePicker
              value={moment(year)}
              onChange={changeYear}
              picker="year"
              style={{ marginLeft: '16px' }}
            />
          </span>
        </SectionHeader2>
        <LineChart value={list} />
      </Card>
    </div>
  );
}

function LineChart(props) {
  const { value = [] } = props;
  let data = [];
  for (let index = 0; index < value.length; index++) {
    const item = value[index];
    const dateStr = `${item.month * 1}月`;
    data = data.concat([
      { date: dateStr, value: item.receiptAmount || 0, type: '收入' },
      { date: dateStr, value: item.paymentAmount || 0, type: '支出' },
    ]);
  }
  // console.log(data);
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ({ type }) => {
      switch (type) {
        case '收入':
          return '#50d9e9';
        case '支出':
          return '#a5a5ff';
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
    }
  };
  return (
    <div
      style={{
        width: '100%',
        height: 400,
      }}
    >
      <Line {...config} />
    </div>
  );
}

export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  loading: loading.effects['dashboard/financeStatisticsRemote'] || false,
}))(Index);
