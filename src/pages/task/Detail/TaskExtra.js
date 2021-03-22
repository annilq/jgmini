import React from 'react';

import SectionHeader from '@/components/SectionHeader';

// 这个组件用来管理任务中项目关联的默认的审批人，抄送人，负责人
function TaskExtra({ formdata }) {
  return (
    <div className="containers">
      <SectionHeader
        title="相关人"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
      />
      <div className="form-container-content">
        <div className="form-info-item">
          <div className="form-info-label">负责人</div>
          <div className="form-info-value">{formdata.principalName}</div>
        </div>

        <div className="form-info-item">
          <div className="form-info-label">审核人</div>
          <div className="form-info-value">{formdata.approverName}</div>
        </div>
        <div className="form-info-item">
          <div className="form-info-label">参与人</div>
          <div className="form-info-value">{formdata.participantUserName}</div>
        </div>

        <div className="form-info-item">
          <div className="form-info-label">抄送人</div>
          <div className="form-info-value">{formdata.copyToUserName}</div>
        </div>
      </div>
    </div>
  );
}
export default TaskExtra;
