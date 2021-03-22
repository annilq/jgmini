import React, { useState, useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { Input, Button } from 'antd';

import Layer from '@/components/Layer';
import TableWithPagination from '@/components/TableWithPagination';
import useLayerVisible from '@/hooks/useLayer';


function Edit(props) {
  const { onChange, value, projectId, dispatch, curRouter, form, listdata, loading } = props;
  const ref = useRef();
  const [visible, setVisible] = useLayerVisible(false);
  const [selectedState, setSelectedState] = useState({ selectedRowKeys: [], selectedRows: [] });
  const { selectedRowKeys, selectedRows } = selectedState;
  const columns = [
    {
      title: '检查项',
      width: 500,
      dataIndex: 'content',
      render: text => <a>{text}</a>,
    },
    // {
    //   title: '检查验收标准',
    //   width: 500,
    //   dataIndex: 'standardContent',
    // },
  ];

  const search = data => {
    // 质量1，安全2
    // category: 1
    // category: 2
    dispatch({ type: 'qualitySetting/listRemote', payload: { ...data, ...curRouter.params, projectId } });
  };

  const handleOk = () => {
    const [selectItem] = selectedRows;
    if (selectItem) {
      form.setFieldsValue({ inspectionItemId: selectItem.id });
      onChange(selectItem.content);
    }
    setVisible(false)
  };

  const expondTable = (selectedRowKeys, selectedRows) => {
    // 只能选择子项
    const [selectItem] = selectedRows;
    if (selectItem.children && selectItem.children.length === 0) {
      return
    }
    setSelectedState({ selectedRowKeys, selectedRows });
  };

  useEffect(() => {
    if (ref.current && ref.current !== projectId) {
      setSelectedState({ selectedRowKeys: [], selectedRows: [] });
      form.setFieldsValue({ inspectionItemId: null });
      if (value) {
        onChange(null);
      }
    } else if (projectId) {
      search()
    }
    ref.current = projectId;
  }, [projectId]);

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    checkStrictly: false,
    onChange: expondTable,
  };

  const newlist = useMemo(() =>
    listdata.list.map(({ children, ...rest }) => ({ ...rest, ...children && children.length > 0 && { children } }))
    , [listdata])
  listdata.list = newlist
  return (
    <>
      <Input
        onClick={() => setVisible(true)}
        value={value}
        disabled={!projectId}
        readOnly
        suffix={<SearchOutlined />}
        placeholder="选择检查项"
      />
      <Layer
        type="drawer"
        visible={visible}
        width="100%"
      >
        <TableWithPagination
          data={listdata}
          columns={columns}
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          onPaginationChange={search}
        />
        <div className="actionBtns">
          <Button
            onClick={handleOk}
            type="primary"
          >
            确定
          </Button>
        </div>
      </Layer>
    </>
  );

}

export default connect(({ qualitySetting, loading, menu }) => ({
  curRouter: menu.curRouter,
  loading: loading.effects['qualitySetting/listRemote'] || false,
  listdata: qualitySetting.data,
}))(Edit);
