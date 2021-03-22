import React, { useState } from 'react';
import { Radio } from 'antd';

import SectionHeader from '@/components/SectionHeader';
import { contract as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import Table from '@/components/CustomForm/DataPicker/table';
import ChartDetail from './chart';

function Detail(props) {
  const { projectId, data: detailData } = props;
  const formCode = "outContract"

  const [params, setParams] = useState({});

  const { data = { list: [] }, status } = useFetch<JGListData>(api.list, {projectId, type: 'out',...params});

  const [value, setValue] = useState(1);

  const options = [
    { label: '统计图', value: 1 },
    { label: '列表式', value: 2 },
  ];

  function onChange(e) {
    setValue(e.target.value)
  }

  return (
    <DetailLayout projectId={projectId}>
      <div
        className="containers"
      >
        <SectionHeader
          title="付款合同"
          style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
        />
        <Radio.Group
          options={options}
          onChange={onChange}
          value={value}
          optionType="button"
          buttonStyle="solid"
          style={{ flex: 1, marginBottom: 10 }}
        />
        {value === 1 && <ChartDetail data={detailData} />}
        {value === 2 && (
          <div style={{ width: "100%" }}>
            <Table
              loading={status === "fetching"}
              data={data}
              formCode={formCode}
              onPaginationChange={setParams}
              rowClassName={(record, index) => {
                let className = '';
                if (index % 2 === 1) className = "darkRow";
                return className;
              }}
              showOrder
            />
          </div>)}
      </div>
    </DetailLayout>
  );
}

export default Detail;
