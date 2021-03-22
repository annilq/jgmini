import React, { useState } from 'react';
import { Input } from 'antd';

import Layer from '@/components/Layer';
import LayerHeader from "@/components/LayerHeader"
import { TreePicker } from "@/components/CustomForm"

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
      dataIndex: "materialName",
      title: "物资名称",
      render: (text, record) => {
        return <a onClick={() => showDetail(record)}>{text}</a>
      }
    },
    {
      dataIndex: "specs",
      title: "规格",
    },
    {
      dataIndex: "unit",
      title: "单位",
      render: (text) => {
        return <TreePicker
          extraProps={{
            url: "/api/v1/system/unit/getAllUnit",
            parentNodeDisable: true,
          }}
          readOnly
          placeholder="单位"
          value={text}
          style={{ width: 140 }}
        />
      }
    },
    {
      dataIndex: "quantity",
      title: "出库数量",
    },
    {
      dataIndex: "amount",
      title: "出库金额",
    },
  ];
  const searchArr = [
    {
      name: 'materialName',
      component: <Input placeholder="物资名称" />,
    },
  ]

  const rowKey = "materialId"

  const { service } = getConfigFromCode(reportCode);
  const [params, setParams] = useState({});

  const search = (newparams?: any, pageRemote?: boolean) => {
    if (pageRemote) {
      setParams({ ...params, ...newparams })
    } else {
      setParams(newparams)
    }
  };
  const { data = { list: [] }, status } = useFetch<JGListData>(service.depotOutMaterialList, params);

  const title = "领料出库-物资";

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
