import React, { useEffect } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { SectionHeader2 } from '@/components/SectionHeader';
import GanttChart from './Detail/GanttChart';

function Index(props) {
  const {
    project,
    projectPlan: { list = [] },
    dispatch,
    loading,
  } = props;

  const { id } = project;

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'projectPlan/listRemote',
        payload: { projectId: id },
      });
    }
  }, [id]);

  return (
    <Card loading={loading} bodyStyle={{ padding: '0' }} style={{ height: '100%' }}>
      <SectionHeader2 title="横道图" />
      <div style={{ padding: '10px', height: '300px', overflow: 'auto' }}>
        <GanttChart id={id} data={list} />
      </div>
    </Card>
  );
}

export default connect(({ projectPlan, project, loading }) => ({
  projectPlan,
  project: project.project,
  loading: loading.effects['projectPlan/listRemote'] || false,
}))(Index);
