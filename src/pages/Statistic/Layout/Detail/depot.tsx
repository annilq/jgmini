import React from 'react';
import { depot as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import Detail from '@/components/CustomForm/detail/combine';
import MainLayout from './index';

function Depot(props) {
  const { data: detailData, children } = props;
  const formCode = "Depot"

  const { data = {} } = useFetch(api.query, { id: detailData.depotId });
  return (
    <MainLayout>
      <Detail item={data} formCode={formCode}>{children}</Detail>
    </MainLayout>
  );
}

export default Depot;
