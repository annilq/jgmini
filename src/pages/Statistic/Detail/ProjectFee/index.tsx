import React, { useState } from 'react';
import { Input } from 'antd';

import Layer from '@/components/Layer';
import LayerHeader from "@/components/LayerHeader"

import Layout from "@/pages/Statistic/Layout"
import { getConfigFromCode } from "@/pages/Statistic/utils"
import PageContent from '@/pages/Statistic/Layout/PageContent';
import useFetch from '@/hooks/useFetch';

import Detail from "./detail"

function Main(props) {
  const { reportCode } = props;
  const [visible, setVisible] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const showDetail = (record) => {
    setProjectId(record.projectId)
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
      dataIndex: "cost",
      title: "造价",
    },
    {
      dataIndex: "totalReceipt",
      title: "收款合计",
    },
    {
      dataIndex: "saleInvoice",
      title: "销项发票额",
    },
    {
      dataIndex: "totalPayment",
      title: "付款合计",
    },
    {
      dataIndex: "inputInvoice",
      title: "进项发票额",
    },
    {
      dataIndex: "gap",
      title: "收付款差额",
    },
  ];

  const searchArr = [
    {
      name: 'name',
      component: <Input placeholder="项目名称" />,
    },
  ];

  const { service } = getConfigFromCode(reportCode);
  const [params, setParams] = useState({});

  const search = (newparams?: any, pageRemote?: boolean) => {
    if (pageRemote) {
      setParams({ ...params, ...newparams })
    } else {
      setParams(newparams)
    }
  };
  const { data = { list: [] }, status } = useFetch<JGListData>(service.list, params);

  const title = "项目收支表";

  return (
    <PageContent
      title={title}
    >
      <>
        <Layout
          data={data}
          columns={columns}
          search={search}
          searchArr={searchArr}
          rowKey="projectId"
          loading={status === "fetching"}
        />
        <Layer
          type="drawer"
          width="80vw"
          title={<LayerHeader name={title} onClose={() => setVisible(false)} />}
          visible={visible}
          onClose={() => setVisible(false)}
          closable={false}
        >
          <Detail projectId={projectId} />
        </Layer>
      </>
    </PageContent>
  );
}

export default Main;
