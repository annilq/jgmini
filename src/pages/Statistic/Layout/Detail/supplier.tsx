import React from 'react';
import { supplier as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import Detail from '@/components/CustomForm/detail/combine';
import MainLayout from './index';

function Supplier(props) {
  const { data: detailData, children } = props;
  const formCode = "Supplier"
  const { data = {} } = useFetch(api.query, { id: detailData.supplierId });
  return (
    <MainLayout>
      <Detail item={data} formCode={formCode}>{children}</Detail>
    </MainLayout>
  );
}

export default Supplier;
