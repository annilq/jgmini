import React, { useState, useEffect } from 'react';
import TableList from '@/components/CustomForm/SubTable/detail';

import request from '@/utils/request';
import { relation as api } from '@/services/api';

import Pagination from '@/components/Pagination';

interface ModuleInte {
  domainFormName: string;
  relateFormCode: string;
  domainFormCode: string;
  domainId: string;
}

interface IProps {
  domainFormCode: string;
  data: ModuleInte;
}

function RelationModule(props: IProps) {
  const { data, domainFormCode } = props;
  const { domainId } = data;

  const [datalist, setModuledata] = useState([]);

  async function getModules(params = {}) {
    const response = await request<any>(api.getRelateList, {
      data: { ...data, domainFormCode, ...params },
    });
    // console.log(response);
    if (response && response.resp) {
      const { list, ...rest } = response.resp;
      setModuledata({ list, ...rest });
    }
  }
  function paginationChange(params = {}) {
    getModules(params);
  }
  useEffect(
    () => {
      getModules();
    },
    [domainId]
  );
  return (
    <>
      <TableList
        value={datalist.list}
        extraProps={{ formCode: data.relateFormCode, referenceType: 1 }}
        store={window.g_app._store}
      />
      <Pagination
        data={datalist}
        onPaginationChange={paginationChange}
      />
    </>
  );
}
export default RelationModule;
