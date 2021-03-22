import React, {Component} from 'react';
import {connect} from 'react-redux';

import JgTable from '@/components/CustomForm/JgTable';

@connect(({jgTableModel}) => ({
  jgTableModel,
}))
class Main extends Component<any, any> {
  formCode: string;
  routeName: string;
  state = {
    selectedRows: [],
    selectedRowKeys: [],
  };

  constructor(props) {
    super(props);
    this.reset();
  }

  // 重置
  reset = () => {
    const {dispatch} = this.props;
    // 列表的数据需要用到base接口
    dispatch({
      type: 'menu/setCurRouter',
      payload: {
        curRouter: {
          path: '/project/index',
          name: 'project',
          formCode: 'Project',
        },
      },
    });
    // 查看详情需要用到base，以及子表接口
    dispatch({type: 'jgTableModel/item', payload: {}});
    // this.querylist();
  };

  // 展开编辑,编辑统一跳转到新页面，不在侧边滑出
  showEdit = (record?: any) => {
    const {
      location,
      history,
      route: {name: routeName},
    } = this.props;
    const {pathname} = location;
    if (record) {
      history.push(`${pathname}/edit/${record.id}?routeName=${routeName}`);
    } else {
      history.push(`${pathname}/edit?routeName=${routeName}`);
    }
  };

  // 删除
  remove = record => {
    const {dispatch} = this.props;
    dispatch({type: 'jgTableModel/removeRemote', payload: record.id});
  };

  // 查询
  querylist = (params?: obj) => {
    const {dispatch} = this.props;
    dispatch({type: 'jgTableModel/listRemote', payload: params});
  };

  onSearch = params => {
    const {ISUSERCREATE} = this.props;
    let searchParams = {};
    // 用户全自定义的搜索条件和系统自定义搜索条件不一样
    if (ISUSERCREATE) {
      const paramsArr = [];
      Object.keys(params).forEach(key => {
        if (params[key] !== null && typeof params[key] !== 'undefined') {
          paramsArr.push({[key]: params[key]});
        }
      });
      searchParams.searchParams = JSON.stringify(paramsArr);
    } else {
      searchParams = params;
    }
    this.querylist(searchParams);
  };

  // 关闭详情
  closeDetail = () => {
    const {dispatch} = this.props;
    // 清除详情数据，防止填充到编辑表单
    dispatch({type: 'jgTableModel/item', payload: {}});
    dispatch({type: 'jgTableModel/toggleDetail', payload: false});
  };

  // 展开详情
  showDetail = record => {
    const {dispatch} = this.props;
    dispatch({
      type: 'jgTableModel/queryRemote',
      payload: record.id,
      callback: item => {
        item && item.approveInstanceId
          ? dispatch({
              type: 'workflow/queryAuditList',
              payload: {instanceId: item.approveInstanceId},
            })
          : null;
        // 拿出去好了，会快一点点
        // dispatch({ type: 'jgTableModel/toggleDetail', payload: true });
      },
    });
    dispatch({type: 'jgTableModel/toggleDetail', payload: true});
  };

  // 分页、排序、筛选变化时触发
  handleStandardTableChange = pagination => {
    const {dispatch} = this.props;
    const {current, pageSize} = pagination;
    dispatch({
      type: 'jgTableModel/pageRemote',
      payload: {currentPage: current, pageSize},
    });
  };

  handleSelectRows = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRows,
      selectedRowKeys,
    });
  };

  render() {
    const {
      jgTableModel: {data = {list: []}},
      // route: {formCode},
    } = this.props;

    return <JgTable formCode={'Project'} data={data} />;
  }
}

export default Main;
