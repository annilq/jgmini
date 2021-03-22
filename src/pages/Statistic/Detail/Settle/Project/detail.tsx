import React, { useState } from 'react';

import SectionHeader from '@/components/SectionHeader';

import { statistic as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import TableList from '@/pages/Statistic/Detail/Settle/Project/detailList';

function Detail(props) {
  const { projectId } = props;

  const [params, setParams] = useState({});

  const { data = { list: [] }, status } = useFetch<JGListData>(api.getSettleListByProjectId, { id: projectId, ...params });

  return (
    <DetailLayout projectId={projectId}>
      <div
        className="containers"
      >
        <SectionHeader
          title="物资明细"
          style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
        />
        <div style={{ width: "100%" }}>
          <TableList
            loading={status === "fetching"}
            data={data}
            onPaginationChange={setParams}
          />
        </div>
      </div>
    </DetailLayout>
  );
}

export default Detail;
