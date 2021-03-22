import React, { useState } from 'react';

import SectionHeader from '@/components/SectionHeader';

import { statistic as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';

import DetailLayout from "@/pages/Statistic/Layout/Detail"
import TableList from '@/pages/Statistic/Detail/PurchaseApply/detailList';

function Detail(props) {
  const { data: detailData } = props;

  const [params, setParams] = useState({ id: detailData.materialId });

  const search = (newparams?: any, pageRemote?: boolean) => {
    if (pageRemote) {
      setParams({ ...params, ...newparams })
    } else {
      setParams(newparams)
    }
  };

  const { data = { list: [] }, status } = useFetch<JGListData>(api.getDepotInListByMaterialId, params);

  const onPaginationChange = pagination => {
    search(pagination, true)
  };

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
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </DetailLayout>
  );
}

export default Detail;
