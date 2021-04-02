import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'remax/wechat';
import { useNativeEffect, useQuery } from 'remax';
import { usePageEvent } from 'remax/macro';

// import SearchForm from '@/components/CustomForm/JgSearchForm';
// import OperationButton from '@/components/OperationButton';
import JgTable from '@/components/CustomForm/JgTable';

// import styles from '@/common/styles/tableList.less';
// import IndexAdd from '../../../../public/list-add.png';import { useQuery } from 'remax';
import ListItemCell from '@/components/TableItem/ListItem';
import { getServiceAndFormCodeFromPath } from '@/components/CustomForm/FormCodeService';

function Main(props) {
  const {
    dispatch,
    tableLoading,
    jgTableModel: { data = { list: [] } },
  } = props;
  const { path } = useQuery();
  const { formCode } = getServiceAndFormCodeFromPath(path)
  // formCode与后台服务一样的名字
  const reset = () => {
    // 查看详情需要用到base，以及子表接口
    dispatch({ type: 'jgTableModel/item', payload: {} });
    dispatch({ type: 'jgTableModel/listRemote', path });
  };

  // 展开编辑,编辑统一跳转到新页面，不在侧边滑出
  const showEdit = (record) => {
    const { location, history } = props;
    const { pathname } = location;
    if (record) {
      history.push(`/editpage/${record.id}?path=${pathname}`);
    } else {
      history.push(`/editpage?path=${pathname}`);
    }
    // NativeUtil.pushWebHistory(history.goBack);
  };

  const onSearch = (params) => {
    let searchParams = {};
    // 用户全自定义的搜索条件和系统自定义搜索条件不一样
    if (ISUSERCREATE) {
      const paramsArr = [];
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && typeof params[key] !== 'undefined') {
          paramsArr.push({ [key]: params[key] });
        }
      });
      searchParams.searchParams = JSON.stringify(paramsArr);
    } else {
      searchParams = params;
    }
    searchParams.currentPage = 1
    dispatch({ type: 'jgTableModel/listRemote', path, payload: searchParams });
  };

  const onPageChanged = (params) => {
    dispatch({ type: 'jgTableModel/pageRemote', path, payload: params });
  }
  // 展开详情
  const showDetail = (record) => {
    wx.navigateTo({ url: `/pages/detailpage/index?id=${record.id}&path=${path}&formCode=${formCode}` });
  };

  usePageEvent('onPullDownRefresh', () => {
    reset()
    return Promise.resolve()
  })
  useNativeEffect(() => {
    reset()
  }, []);
  // console.log(data);
  return (
    <View>
      {/* <View className={styles.tableListForm}>
          <SearchForm
            filter={Object.keys(params || {})}
            loading={tableLoading}
            formCode={formCode}
            reset={reset}
            // 用户默认的搜索框
            onSearch={onSearch}
            key={formCode}
          />
        </View> */}
      {/* <OperationButton operationType="WRITE" operations={operations}>
          <img src={IndexAdd} alt="新增"
            style={{
              width: 80, height: 80,
              position: "fixed", bottom: "20px", right: 10,
              zIndex: 999
            }}
            onClick={() => showEdit()}
          />
        </OperationButton> */}
      <JgTable
        formCode={formCode}
        data={data}
        showDetail={showDetail}
        onPageChanged={onPageChanged}
        ListItem={ListItemCell}
        loading={tableLoading}
      />
    </View>
  );
}

export default connect(({ jgTableModel, loading }) => ({
  jgTableModel,
  tableLoading: loading.effects['jgTableModel/listRemote'] || false,
  detailLoading: loading.effects['jgTableModel/queryRemote'] || false,
}))(Main);
