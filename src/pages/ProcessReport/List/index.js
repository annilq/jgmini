import React from 'react';
import List from '@/components/DataList';
import Loading from '@/components/Loading';
import IndexItemCell from '@/components/TableItem/IndexItem';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { ConTypes } from '@/components/CustomForm/controlTypes';

const listHeight = {
  "height": 'calc(100vh - 56px)',
  "overflowY": 'scroll',
};

const columns = [
  {
    title: '填报标题',
    dataIndex: 'title',
  },
  {
    title: '项目',
    dataIndex: 'projectName',
    render: (text, record) => (
      <FormItemData
        data={{
          controlCode: "projectId",
          controlType: ConTypes.DATAPICKER,
          controlLabel: "项目",
          extraProps: { formCode: "Project", formType: "system", nameCode: "projectName", linkable: true }
        }}
        formdata={record}
      />
    ),
  },
  {
    title: '完成率',
    dataIndex: 'finishRate',
    render: (text) => `${parseInt(Number(text).toFixed(2) * 100, 10)}%`,
  },
];

function Main(props) {
  const { data, showDetail, loading, onPaginationChange } = props;
  return (
    <>
      <Loading loading={loading}>
        <div style={listHeight}>
          <List
            renderItem={(item) => (
              <List.Item>
                <IndexItemCell data={item} columns={columns} onItemClick={() => showDetail(item)} />
              </List.Item>
            )}
            loading={loading}
            data={data}
            loadMore={(params) => {
              onPaginationChange(params)
            }}
          />
        </div>
      </Loading>
    </>
  );
}

export default Main;
