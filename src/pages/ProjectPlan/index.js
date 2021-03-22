import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbView from '@/components/Breadcrumb';
import SearchForm from '@/components/SearchForm';
import OperationButton from '@/components/OperationButton';
import styles from '@/common/styles/tableList.less';
import searchStyles from '@/components/CustomForm/index.less';
import { JgSelect } from '@/components/CustomForm';

import IndexAdd from '../../../public/list-add.png';
import PlanList from './List';

@connect(({ projectProcess, loading }) => ({
  projectProcess,
  tableLoading: loading.effects['projectProcess/listRemote'] || false
}))
class Index extends PureComponent {

  searchArr = [
    {
      name: 'projectName',
      component: <Input placeholder="项目" className={searchStyles.searchInput} />,
    },
    // {
    //   name: 'contractStartDate',
    //   component: <JgDatePicker style={{ width: "100%" }} placeholder="开始日期" />,
    // },
    // {
    //   name: 'contractEndDate',
    //   component: <JgDatePicker style={{ width: "100%" }} placeholder="截止日期" />,
    // },
    {
      name: 'recordStatus',
      component: (
        <JgSelect
          placeholder="计划状态"
          data={[{ label: "全部", value: "" }, { label: "发布", value: "publish" }, { label: "草稿", value: "normal" }]}
        />
      ),
    }
  ];

  componentDidMount() {
    this.search();
  }

  // 搜索
  search = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'projectProcess/listRemote', payload: params });
  };

  // 重置
  reset = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'projectProcess/listRemote' });
  };

  // 分页、排序、筛选变化时触发
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    dispatch({ type: 'projectProcess/pageRemote', payload: { ...pagination } });
  };

  // 删除
  remove = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'projectProcess/removeRemote', payload: { id: record.id } });
  };

  // 展开详情
  showDetail = (record) => {
    const { location, history } = this.props;
    const { pathname } = location;
    history.push(`/detailpage/${record.id}?path=${pathname}`);
    NativeUtil.pushWebHistory(history.goBack);
  };

  showEdit = (record) => {
    const {
      location,
      history,
    } = this.props;
    const { pathname } = location;
    if (record) {
      history.push(`${pathname}/edit/${record.id}`);
    } else {
      history.push(`${pathname}/edit`);
    }
    NativeUtil.pushWebHistory(history.goBack);
  };

  render() {
    const {
      tableLoading,
      projectProcess: { data },
      route: { operations },
    } = this.props;
    return (
      <BreadcrumbView>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <SearchForm
              loading={tableLoading}
              searchArr={this.searchArr}
              submit={this.search}
              reset={this.reset}
            />
          </div>
          <PlanList
            data={data}
            showDetail={this.showDetail}
            loading={tableLoading}
            onPaginationChange={this.handleStandardTableChange}
          />
          <OperationButton operationType="WRITE" operations={operations}>
            <img
              src={IndexAdd}
              alt="新增"
              style={{
                width: 80, height: 80,
                position: "fixed", bottom: "20px", right: 10,
                zIndex: 999
              }}
              onClick={() => this.showEdit()}
            />
          </OperationButton>
        </div>
      </BreadcrumbView>
    );
  }
}

export default Index;
