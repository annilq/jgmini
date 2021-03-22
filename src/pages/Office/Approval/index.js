/* eslint-disable compat/compat */
import React, { Fragment, PureComponent } from 'react';
import { Card, Input } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getRouterConfig } from '@/models/menu';

import BreadcrumbView from '@/components/Breadcrumb';
import StandardTable from '@/components/StandardTable';
import SearchForm from '@/components/SearchForm';
import ApproveStatusButton from '@/components/StatusButton/ApproveStatusButton';
import styles from '@/common/styles/tableList.less';

@connect(({ workflow, jgTableModel, menu, loading }) => ({
  workflow,
  jgTableModel,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  tableLoading: loading.effects['workflow/listRemote'] || false,
  detailLoading: loading.effects['jgTableModel/queryRemote'] || false,
}))
@withRouter
class Index extends PureComponent {
  searchArr = [
    {
      name: 'instanceName',
      component: <Input placeholder="名称" />,
    },
    {
      name: 'processName',
      component: <Input placeholder="流程名称" />,
    },
  ];

  componentDidMount() {
    this.reset();
  }

  // 搜索
  search = (params) => {
    const { dispatch } = this.props;
    dispatch({ type: 'workflow/listRemote', payload: params });
  };

  // 重置
  reset = () => {
    const { dispatch, route } = this.props;
    dispatch({ type: 'workflow/curRouter', payload: route });
    dispatch({ type: 'workflow/listRemote' });
  };

  // 分页、排序、筛选变化时触发
  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { current, pageSize } = pagination;
    dispatch({ type: 'workflow/pageRemote', payload: { currentPage: current, pageSize } });
  };

  // 展开编辑
  showDetail = (record) => {
    const { history } = this.props;
    const { bizId, id, formCode, type, taskDetailId } = record;
    const searchParams1 = new URLSearchParams();
    searchParams1.append('bizId', bizId);
    searchParams1.append('id', id);
    searchParams1.append('formCode', formCode);
    searchParams1.append('type', type);
    searchParams1.append('taskDetailId', taskDetailId);
    history.push(`/approvepage?${searchParams1.toString()}`);
  };

  goEditPage = (record) => {
    const { history } = this.props;
    const { bizId, formCode } = record;
    let curRouter = null;
    let path = '';
    if (record.type === 'biz_allinone') {
      curRouter = getRouterConfig({ formCode: 'USERCREATE' });
      // 覆盖一下formCode
      curRouter.formCode = formCode;
      // path: '/usercreate/:formCode',
      // path: '/usercreate/:formCode/edit/:id?',
      // 用户全自定义
      path = `/usercreate/${formCode}`;
    } else {
      curRouter = getRouterConfig({ formCode });
      // path: '/worklog/index',
      // path: '/worklog/index/edit/:id?',
      ({ path } = curRouter.path);
    }
    history.push(`/editpage/${bizId}?path=${path}`);
    NativeUtil.pushWebHistory(history.goBack);
  };

  render() {
    const {
      tableLoading,
      workflow: { data = {} },
    } = this.props;
    const { pagination = {} } = data;
    const columns = [
      {
        title: '序号',
        dataIndex: 'orderNum',
        width: 61,
        render(text, record, index) {
          return <span>{(pagination.current - 1) * pagination.pageSize + index + 1}</span>;
        },
      },
      {
        title: '名称',
        dataIndex: 'instanceName',
        key: 'instanceName'
      },
      {
        title: '流程名称',
        dataIndex: 'processName',
        key: 'processName',
      },
      {
        title: '金额(元)',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '审批状态',
        dataIndex: 'statusDesc',
        key: 'statusDesc',
        render: (text, record) => (
          <ApproveStatusButton
            status={record.status}
          />
        ),
      },
      {
        title: '操作',
        key: 'op',
        render: (_, record) => (
          <>
            <a onClick={() => this.showDetail(record)}>详情</a>
            {record.actionType === 'write' && (
              <>
                <span style={{ margin: '0 5px' }}>|</span>
                <a onClick={() => this.goEditPage(record)}>编辑</a>
              </>
            )}
          </>
        ),
      },
    ];
    return (
      <BreadcrumbView>
        <Card bordered={false} bodyStyle={{ padding: '21px 15px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm
                loading={tableLoading}
                searchArr={this.searchArr}
                submit={this.search}
                reset={this.reset}
              />
            </div>
            {/* <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.showEdit}>
                新增
              </Button>
            </div> */}
            <StandardTable
              bordered
              loading={tableLoading}
              data={data}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </BreadcrumbView>
    );
  }
}

export default Index;
