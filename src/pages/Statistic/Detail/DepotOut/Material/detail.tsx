import React, { useState } from 'react';

import SectionHeader from '@/components/SectionHeader';

import { statistic as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import TableList from '../detailList';

function Detail(props) {
  const { data: detailData } = props;

  const [params, setParams] = useState({});

  const { data = { list: [] }, status } = useFetch<JGListData>(api.getDepotOutListByMaterialId, { id: detailData.materialId, ...params });

  return (
    <DetailLayout>
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
