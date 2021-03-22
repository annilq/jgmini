import React from 'react';

import SectionHeader from '@/components/SectionHeader';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import Detail from "@/pages/Statistic/Detail/Quality/detail"
import useFetch from '@/hooks/useFetch';
import { account as api } from '@/services/api';

function Main(props) {
  const { data } = props;
  const { data: userData = {} } = useFetch<{ name: string; positionName: string; groupName: string }>(api.getUserById, { id: data.checkerId });
  return (
    <DetailLayout>
      <>
        <div
          className="containers"
        >
          <SectionHeader
            title="检查人"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
          />
          <div className="form-container-content">
            <div className="form-info-item" style={{ width: "50%" }}>
              <div className="form-info-label">姓名</div>
              <div className="form-info-value">{userData.name}</div>
            </div>
            <div className="form-info-item" style={{ width: "50%" }}>
              <div className="form-info-label">职位</div>
              <div className="form-info-value">{userData.positionName || "-"}</div>
            </div>
            <div className="form-info-item" style={{ width: "50%" }}>
              <div className="form-info-label">部门</div>
              <div className="form-info-value">{userData.groupName}</div>
            </div>
          </div>
        </div>
        <Detail data={data} />
      </>
    </DetailLayout>
  );
}

export default Main;
