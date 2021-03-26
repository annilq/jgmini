import React, { useState, useMemo } from 'react';
import { View ,Text} from "remax/wechat"
import { relation as api } from '@/services/api';
import useFormConfig from '@/hooks/useFormConfig';
import useFetch from '@/hooks/useFetch';

import TableList from './detailList';

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
  const { domainId, relateFormCode } = data;
  const [params, setParams] = useState(null);

  const { data: datalist = { list: [] } } = useFetch<JGListData>(api.getRelateList, { ...data, domainFormCode, domainId, ...params });
  const { data: totalData } = useFetch(api.getRelateAmount, { ...data, domainFormCode, domainId, ...params });
  const { tableConfig, loading } = useFormConfig(relateFormCode);

  const totalSum = useMemo(() => {
    if (totalData && Object.keys(totalData).length > 0) {
      return Object.keys(totalData).map(sumCode => {
        for (let index = 0; index < tableConfig.containers.length; index++) {
          const container = tableConfig.containers[index];
          const targetControl = container.controls.find(control => control.controlCode === sumCode);
          if (targetControl) {
            return <Text style={{ marginRight: 5 }}>{targetControl.controlLabel}:{totalData[sumCode]}</Text>
          }
          return false
        }
      })
    }
    return false
  }, [totalData, tableConfig])
  return (
    <>
      <View>
        <TableList
          loadMore={setParams}
          value={datalist}
          containers={tableConfig.containers}
          loading={loading}
        />
      </View>
      {totalSum && (
        <View style={{
          padding: "15px 10px",
          backgroundColor: "#4095ff",
          color: "#fff",
          wordBreak: "keep-all",
          whiteSpace: "nowrap",
          overflow: "scroll"
        }}>合计：{totalSum}</View>
      )
      }
    </>
  );
}
export default RelationModule;
