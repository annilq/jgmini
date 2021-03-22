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
  const [dataDetail, setData] = useState(null);

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
      dataIndex: "totalAmount",
      title: "合同总金额",
    },
    {
      dataIndex: "paymentAmount",
      title: "已付款金额",
    },
    {
      dataIndex: "remainingAmount",
      title: "未付款金额",
    },
    {
      dataIndex: "invoiceAmount",
      title: "已开票金额",
    }
  ];

  const searchArr = [
    {
      name: 'projectName',
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

  const title = "付款合同";
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
          title={<LayerHeader data={{ name: title }} onClose={() => setVisible(false)} />}
          visible={visible}
          onClose={() => setVisible(false)}
          closable={false}
        >
          {dataDetail && <Detail projectId={dataDetail.projectId} data={dataDetail} />}
        </Layer>
      </>
    </PageContent>
  );
}

export default Main;
