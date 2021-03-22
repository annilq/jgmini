import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SectionHeader from '@/components/SectionHeader';
import { TreePicker } from "@/components/CustomForm"

function ProjectInfo(props) {
  const { id, data = {}, dispatch } = props;
  useEffect(
    () => {
      if (id) {
        dispatch({ type: 'project/queryRemote', payload: { id } });
      }
    }, [id]);

  return (
    <div
      className="containers"
    >
      <SectionHeader
        title="项目信息"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
      />
      <div className="form-container-content">
        <div className="form-info-item" style={{ width: "50%" }}>
          <div className="form-info-label">项目名称</div>
          <div className="form-info-value">{data.name}</div>
        </div>
        <div className="form-info-item" style={{ width: "50%" }}>
          <div className="form-info-label">项目类型</div>
          <div className="form-info-value">
            <TreePicker
              extraProps={{ url: "/api/v1/contract/projectCategory/treeList" }}
              value={data.cateId}
              readOnly
              store={window.g_app._store}
            />
          </div>
        </div>
        <div className="form-info-item" style={{ width: "50%" }}>
          <div className="form-info-label">负责人</div>
          <div className="form-info-value">{data.leaderName || "-"}</div>
        </div>
        <div className="form-info-item" style={{ width: "50%" }}>
          <div className="form-info-label">开工日期</div>
          <div className="form-info-value">{data.startDate}</div>
        </div>
        <div className="form-info-item" style={{ width: "50%" }}>
          <div className="form-info-label">竣工日期</div>
          <div className="form-info-value">{data.endDate}</div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ project }) => ({
  data: project.project
}))(ProjectInfo);
