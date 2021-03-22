import React, { useState } from 'react';

import SectionHeader from '@/components/SectionHeader';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import useFetch from '@/hooks/useFetch';
import { statistic as api } from '@/services/api';
import TableList from './detailList';

function Detail(props) {
  const { projectId } = props;

  const [params, setParams] = useState({});

  const { data = { list: [] }, status } = useFetch<JGListData>(api.getReceiptListByProjectId, { id: projectId, ...params });
  return (
    <DetailLayout projectId={projectId}>
      <div
        className="containers"
      >
        <SectionHeader
          title="收款"
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
