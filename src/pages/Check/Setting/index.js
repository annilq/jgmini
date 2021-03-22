import React, { PureComponent } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { conversionBreadcrumbString } from '@/components/PageHeaderWrapper/breadcrumb';

import Loading from '@/components/Loading';
import Layer from '@/components/Layer';
import BreadcrumbView from '@/components/Breadcrumb';
import SearchForm from '@/components/SearchForm';
import searchStyles from '@/common/styles/tableList.less';
import TableWithPagination from '@/components/TableWithPagination';
import FormEditData from '@/components/CustomForm/FormItem/edit';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { inspectionSetting as api } from '@/services/api';
import CustomUpload from '@/components/CustomUpload';

import Detail from './detail';
import StateButton from './stateButton';


@connect(({ qualitySetting, loading, menu }) => ({
  loading: loading.effects['qualitySetting/listRemote'] || false,
  data: qualitySetting.data,
  item: qualitySetting.item,
  parentId: qualitySetting.parentId,
  editVisible: qualitySetting.editVisible,
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))
class QualitySetting extends PureComponent {
  options = [{ value: 2, label: "开始检查" }, { value: 1, label: "未开始" }, { value: 3, label: "检查通过" }];

  searchArr = [
    {
      // label: '检查项名称',
      name: 'projectName',
      component: <Input placeholder="项目名称" />,
    },
    {
      // label: '检查项名称',
      name: 'content',
      component: <Input placeholder="检查项名称" />,
    },
    {
      // label: '检查项名称',
      name: 'state',
      component: (
        <FormEditData
          data={{
            controlCode: "state",
            controlType: 6,
            placeHolder: "检查状态",
            extraProps: {
              flag: "inspectItemStatusMap",
              type: 2,
            }
          }}
          formdata={{}}
        />
      ),
    },
  ];

  componentDidMount() {
    const { route, dispatch } = this.props;
    dispatch({ type: 'qualitySetting/routerParams', payload: route.params });
    this.search();
  }

  // 展开编辑,编辑统一跳转到新页面，不在侧边滑出
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
  };

  // 展开编辑
  showDetail = item => {
    const { dispatch } = this.props;
    dispatch({ type: 'qualitySetting/toggleEdit', payload: true });
    dispatch({ type: 'qualitySetting/queryRemote', payload: item });
  };

  // 关闭编辑
  closeDetail = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'qualitySetting/toggleEdit', payload: false });
  };

  // 删除
  remove = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'qualitySetting/removeRemote', payload: record });
  };

  search = (data = {}) => {
    const { dispatch } = this.props;
    dispatch({ type: 'qualitySetting/listRemote', payload: { ...data } });
  };

  onPaginationChange = pagination => {
    this.search(pagination);
  };

  onFinishUpload = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'qualitySetting/listRemote' });
  };

  render() {
    const { data = {}, item, loading, editVisible, breadcrumbNameMap, route } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'content',
        width: 80,
        render: (text, record, index) => <>{index + 1}</>,
      },
      {
        title: '检查项',
        dataIndex: 'content',
        width: 500,
        render: (text, record) => <a onClick={() => this.showDetail(record)}>{text}</a>,
      },
      {
        title: '项目',
        dataIndex: 'projectName',
      },
      {
        title: '检查周期',
        dataIndex: 'checkCycle',
        render: (text, record) => {

          return <FormItemData
            data={{
              controlCode: "checkCycle",
              controlType: 6,
              extraProps: {
                flag: "inspectItemCycleMap",
                type: 2,
              }
            }}
            formdata={record}
          />
        },
      },
      {
        title: '检查状态',
        dataIndex: 'state',
        render: (text) => {
          return <StateButton data={text} />
        },
      },
      {
        title: '操作',
        render: (text, record) => (
          <>
            <a onClick={() => this.showEdit(record)}>编辑</a>
            <span style={{ margin: '0 5px' }}>|</span>
            <a onClick={() => this.remove(record)}>删除</a>
          </>
        ),
      }]

    const newData = { ...data, list: data.list.map(({ children, ...dataItem }) => ({ ...dataItem, ...(children && children.length) && { children } })) }

    return (
      <BreadcrumbView>
        <Loading loading={loading} bodyStyle={{ padding: '21px 15px' }}>
          <div className={searchStyles.tableList}>
            <div className={searchStyles.tableListForm}>
              <SearchForm
                loading={loading}
                searchArr={this.searchArr}
                submit={this.search}
                reset={() => this.search()}
              />
            </div>
            <div className={searchStyles.tableListOperator}>
              <Button icon={<PlusOutlined />} type="primary" onClick={() => this.showEdit()}>
                新增检查项
              </Button>
              <CustomUpload
                onFinishUpload={this.onFinishUpload}
                templateUrl="/template/Inspection.xlsx"
                uploadUrl={`${api.importInspectionItem}?category=${route.params.category}`}
                label="导入检查项"
              />
            </div>
          </div>
          <TableWithPagination data={newData} columns={columns} rowKey="id" onPaginationChange={this.onPaginationChange} />
          <Layer
            title={conversionBreadcrumbString({ ...this.props, breadcrumbNameMap }) +
              (item.title ? item.title : '检查项')}
            width="80vw"
            loading={loading}
            visible={editVisible}
            onClose={this.closeDetail}
          >
            <Detail item={item} params={route.params} />
          </Layer>
        </Loading>
      </BreadcrumbView>
    );
  }
}

export default QualitySetting;
