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
      dataIndex: "projectName",
      title: "项目名称",
      render: (text, record) => {
        return <a onClick={() => showDetail(record)}>{text}</a>
      }
    },
    {
      dataIndex: "materialTypeNum",
      title: "物资种类",
    },
    {
      dataIndex: "amount",
      title: "采购金额",
    },
  ];
  const searchArr = [
    {
      name: 'projectName',
      component: <Input placeholder="项目名称" />,
    },
  ]

  const rowKey = "projectId";

  const [params, setParams] = useState({});

  const search = (newparams?: any, pageRemote?: boolean) => {
    if (pageRemote) {
      setParams({ ...params, ...newparams })
    } else {
      setParams(newparams)
    }
  };
  const { service } = getConfigFromCode(reportCode);

  const { data = { list: [] }, status } = useFetch<JGListData>(service.list, params);

  const title = "采购申请-项目";

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
