import React, { useState } from 'react';
import { View } from 'remax/wechat';
import { Tabs } from 'annar';
import { usePageEvent } from 'remax/macro';

import List from '@/components/DataList';
import IndexItemCell from '@/components/TableItem/IndexItem';
import ApproveStatusButton from '@/components/StatusButton/ApproveStatusButton';

import useFetch from '@/hooks/useFetch';
import { workflowApproval as api } from '@/services/api';
const { TabContent } = Tabs;

const tabs = [
  {
    key: '0',
    title: '待我审批',
  },
  {
    key: '1',
    title: '我发起的',
  },
  {
    key: '2',
    title: '已处理的',
  },
  {
    key: '3',
    title: '抄送我的',
  },
];

const columns = [
  {
    title: '名称',
    dataIndex: 'instanceName',
    key: 'instanceName'
  },
  {
    title: '流程名称',
    dataIndex: 'processName',
    key: 'processName',
  }
];

const Index = () => {
  const [stateKey, setStateKey] = React.useState('0');
  return (
    <View style="padding:12px">
      <Tabs
        type="card"
        onTabClick={({ key }) => setStateKey(key)}
        activeKey={stateKey}
        noTitlePadding
      >
        {tabs.map(tab => (
          <TabContent key={tab.key} tab={tab.title}>
            <FlowList type={tab.key} />
          </TabContent>
        ))}
      </Tabs>
    </View>
  );
};
const FlowList = (props) => {
  const {
    type,
  } = props;
  let url = ""

  switch (type) {
    case "0":
      url = api.list;
      break;
    case "1":
      url = api.myCreated;
      break;
    case "2":
      url = api.copyToMeList;
      break;
    case "3":
      url = api.processList;
      break;
    default:
      break;
  }
  const [params, setParams] = useState({});
  const { data = { list: [] }, status } = useFetch(url, params);
  // 展开编辑
  const showDetail = (record) => {
    const { bizId, id, formCode, type, taskDetailId } = record;
    wx.navigateTo({
      url: `/pages/approvepage/index?id=${id}&bizId=${bizId}&formCode=${formCode}&type=${type}&taskDetailId=${taskDetailId}`,
    })
  };
  usePageEvent('onPullDownRefresh', () => {
    console.log('onPullDownRefresh');
  })
  return (
    <List
      renderItem={(data) => (
        <List.Item>
          <IndexItemCell data={data} columns={columns} onItemClick={() => showDetail(data)}>
            <ApproveStatusButton status={data.status} />
          </IndexItemCell>
        </List.Item>
      )}
      loading={status === "fetching"}
      data={data}
      loadMore={(params) => {
        console.log(params);
        setParams(params)
      }}
    />
  );
};

export default Index