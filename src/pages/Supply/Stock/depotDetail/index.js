import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import BreadcrumbView from '@/components/Breadcrumb';
import List from '@/components/DataList';
import SubTableItemCell from '@/components/TableItem/SubTableItem';

import SearchForm from '@/components/SearchForm';
import { JgSelect } from '@/components/CustomForm';

import styles from '@/common/styles/tableList.less';
import { findTreeValue } from "@/utils/utils"

@connect(({ depotDetail, loading }) => ({
  depotDetail,
  tableLoading:
    loading.effects['depotDetail/listRemote'] ||
    loading.effects['depotDetail/depotRemote'] ||
    loading.effects['depotDetail/unitRemote'] ||
    false,
  editeLoading: loading.effects['depotDetail/queryRemote'] || false,
}))
class Index extends PureComponent {

  componentDidMount() {
    this.reset();
  }

  // 搜索
  search = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'depotDetail/pageRemote', payload: params });
  };

  // 重置
  reset = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'depotDetail/listRemote', payload: { pageSize: 50 } });
    dispatch({ type: 'depotDetail/depotRemote', payload: { pageSize: 50 } });
    dispatch({ type: 'depotDetail/unitRemote' });
  };

  // 分页、排序、筛选变化时触发
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { current, pageSize } = pagination;
    dispatch({ type: 'depotDetail/pageRemote', payload: { currentPage: current, pageSize } });
  };

  onHandleChange = value => {
    const {
      dispatch,
      depotDetail: { params = {} },
    } = this.props;
    params.depotId = value;
    dispatch({ type: 'depotDetail/params', payload: params });
  };

  render() {
    const {
      tableLoading,
      depotDetail: { data = {}, depot = [], unit = [] },
    } = this.props;
    const columns = [
      {
        title: '材料名称',
        dataIndex: 'materialName',
        key: 'materialName',
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: '规格',
        dataIndex: 'specs',
        key: 'specs',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '数量',
        dataIndex: 'realNum',
        key: 'realNum',
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        render: (text) => <span>{findTreeValue(text, unit)}</span>,
      },
      {
        title: '条码',
        dataIndex: 'barCode',
        key: 'barCode',
      },
    ];
    const searchArr = [
      {
        // label: '仓库',
        name: 'depotId',
        component: (
          <JgSelect data={depot} optionKeys={["name", "id"]} placeholder="仓库" onChange={this.onHandleChange} />
        ),
      },
    ];
    return (
      <BreadcrumbView>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <SearchForm
              loading={tableLoading}
              searchArr={searchArr}
              submit={this.search}
              reset={this.reset}
            />
          </div>
          <List
            renderItem={(record) => (
              <List.Item>
                <SubTableItemCell data={record} columns={columns} />
              </List.Item>
            )}
            loading={tableLoading}
            data={data}
            loadMore={this.handleStandardTableChange}
          />
        </div>
      </BreadcrumbView>
    );
  }
}

export default Index;
