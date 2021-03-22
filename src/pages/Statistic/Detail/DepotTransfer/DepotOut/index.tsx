import React, { useState } from 'react';
import { Input } from 'antd';

import Layer from '@/components/Layer';
import LayerHeader from "@/components/LayerHeader"

import Layout from "@/pages/Statistic/Layout"
import { getConfigFromCode } from "@/pages/Statistic/utils"
import useFetch from '@/hooks/useFetch';

import Detail from "./detail"

function Main(props) {
  const { reportCode } = props;

  const [visible, setVisible] = useState(false);
  const [record, setData] = useState(null);

  const showDetail = (record) => {
    setData(record)
    setVisible(true)
  };
  const columns = [
    {
      dataIndex: "depotName",
      title: "仓库名称",
      render: (text, record) => {
        return <a onClick={() => showDetail(record)}>{text}</a>
      }
    },
    {
      dataIndex: "materialTypeNum",
      title: "种类",
    },
    {
      dataIndex: "amount",
      title: "金额",
    },
  ];
  const searchArr = [
    {
      name: 'depotName',
      component: <Input placeholder="物资名称" />,
    },
  ]

  const rowKey = "depotId";

  const [params, setParams] = useState({});

  const search = (newparams?: any, pageRemote?: boolean) => {
    if (pageRemote) {
      setParams({ ...params, ...newparams })
    } else {
      setParams(newparams)
    }
  };
  const { service } = getConfigFromCode(reportCode);

  const { data = { list: [] }, status } = useFetch<JGListData>(service.transferOutList, params);

  const title = "库存调拨-调出仓库";

  return (
    <>
      <Layout
        data={data}
        columns={columns}
        search={search}
        searchArr={searchArr}
        rowKey={rowKey}
        loading={status === "fetching"}
      />
      <Layer
        type="drawer"
        width="80vw"
        title={<LayerHeader data={{ name: title }} onClose={() => setVisible(false)} />}
        visible={visible}
        onClose={() => setVisible(false)}
        closable={false}
      >
        {record && <Detail projectId={record.projectId} data={record} />}
      </Layer>
    </>
  );
}

export default Main;
