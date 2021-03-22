import React from 'react';
import { Button } from 'antd';

import Detail from '@/components/CustomForm/detail/combine';
import Layer from '@/components/Layer';
import useFetch from '@/hooks/useFetch';
import useLayer from '@/hooks/useLayer';
import { project as api } from '@/services/api';

function Main(props) {
  const { item, formCode } = props;
  const [visible, setVisible] = useLayer(false);
  const { id, approveStatus } = item;
  return (
    <Detail item={item} formCode={formCode}>
      {approveStatus === "COMPLETE" && (
        <Button type="primary" onClick={() => setVisible(true)} style={{ margin: "0 10px 10px" }}>查看款项初始信息</Button>
      )}
      <Layer
        type="drawer"
        visible={visible}
        width="100%"
      >
        <ProjectInfo projectId={id} />
      </Layer>
    </Detail>
  );
}

function ProjectInfo(props) {
  const { projectId } = props;
  const { data = {} } = useFetch(api.getInitData, { id: projectId });
  return (
    <div style={{ padding: "10px 12px" }}>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>项目账户余额</div>
        <div className="form-info-value">
          {data.projectAccountBalance || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>农民工工资账户余额</div>
        <div className="form-info-value">
          {data.salaryAccountBalance || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>已付款工程款</div>
        <div className="form-info-value">
          {data.projectAccountOut || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>已付农民工工资</div>
        <div className="form-info-value">
          {data.salaryAccountOut || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>已收工程款</div>
        <div className="form-info-value">
          {data.projectAccountIn || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>已收农民工工资</div>
        <div className="form-info-value">
          {data.salaryAccountIn || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>未还清借款</div>
        <div className="form-info-value">
          {data.loanAmount || 0}
        </div>
      </div>
      <div className="form-info-item">
        <div className="form-info-label" style={{ width: "200px" }}>已报销金额</div>
        <div className="form-info-value">
          {data.reimburseAmount || 0}
        </div>
      </div>
    </div>
  );
}

export default Main;
