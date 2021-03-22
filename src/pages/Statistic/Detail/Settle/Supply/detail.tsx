import React, { useState } from 'react';

import SectionHeader from '@/components/SectionHeader';

import { statistic as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';

import Supplier from "@/pages/Statistic/Layout/Detail/supplier"
import TableList from '@/pages/Statistic/Detail/Settle/Supply/detailList';

function Detail(props) {
  const { data: detailData } = props;
  const [params, setParams] = useState({});

  const { data = { list: [] }, status } = useFetch<JGListData>(api.getSettleListBySupplierId, { id: detailData.supplierId, ...params });

  return (
    <Supplier data={detailData}>
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
    </Supplier>
  );
}

export default Detail;
