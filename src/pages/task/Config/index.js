/* eslint-disable no-shadow */
import React, { Fragment, PureComponent } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Popconfirm, Tag } from 'antd';
import { connect } from 'react-redux';

import BreadcrumbView from '@/components/Breadcrumb';
import SectionHeader from '@/components/SectionHeader';
import StandardTable from '@/components/StandardTable';
import TaskTag from '@/components/TaskTag';
import styles from '@/common/styles/tableList.less';
import Layer from '@/components/Layer';
import classNames from './index.less';
import Edit from './edit';
import EditTags from './tags';

@connect(({ taskConfig, loading }) => ({
  taskConfig,
  tableLoading:
    loading.effects['taskConfig/listRemote'] || loading.effects['taskConfig/tagAllRemote'] || false,
  editLoading:
    loading.effects['taskConfig/addRemote'] ||
    loading.effects['taskConfig/queryRemote'] ||
    loading.effects['taskConfig/updateRemote'] ||
    loading.effects['taskConfig/removeRemote'] ||
    loading.effects['taskConfig/addTagsRemote'] ||
    loading.effects['taskConfig/queryTagsRemote'] ||
    loading.effects['taskConfig/updateTagsRemote'] ||
    loading.effects['taskConfig/removeTagsRemote'] ||
    false,
}))
class Index extends PureComponent {
  columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '默认负责人',
      dataIndex: 'principalName',
      key: 'principalName',
    },
    {
      title: '默认参与人',
      dataIndex: 'participantUserName',
      key: 'participantUserName',
    },
    {
      title: '默认审核人',
      dataIndex: 'approverName',
      key: 'approverName',
    },
    {
      title: '默认抄送人',
      dataIndex: 'copyToUserName',
      key: 'copyToUserName',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => this.remove(record)}
          >
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  searchArr = [
    {
      label: '项目名称',
      name: 'projectName',
      component: <Input placeholder="项目名称" />,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/listRemote' });
    dispatch({ type: 'taskConfig/tagAllRemote' });
  }

  // 搜索
  search = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/listRemote', payload: params });
  };

  // 重置
  reset = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/listRemote' });
  };

  // 分页、排序、筛选变化时触发
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { current } = pagination;
    dispatch({ type: 'taskConfig/pageRemote', payload: current });
  };

  // 展开编辑
  showEdit = record => {
    const { dispatch } = this.props;
    if (record && record.id) {
      dispatch({ type: 'taskConfig/queryRemote', payload: record });
    } else {
      dispatch({ type: 'taskConfig/toggleEdit', payload: true });
    }
  };

  // 删除
  remove = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/removeRemote', payload: record });
  };

  // 关闭编辑
  closeEdit = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/toggleEdit', payload: false });
  };

  // 提交编辑
  submitEdit = (params = {}) => {
    const { dispatch } = this.props;
    if (params.id) {
      dispatch({ type: 'taskConfig/updateRemote', payload: params });
    } else dispatch({ type: 'taskConfig/addRemote', payload: params });
  };

  // 展开编辑
  showTagsEdit = record => {
    const { dispatch } = this.props;
    if (record && record.id) {
      dispatch({ type: 'taskConfig/queryTagsRemote', payload: record });
    } else {
      dispatch({ type: 'taskConfig/toggleTags', payload: true });
    }
  };

  // 删除
  removeTags = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/removeTagsRemote', payload: record });
  };

  // 关闭编辑
  closeTagsEdit = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskConfig/toggleTags', payload: false });
  };

  // 提交编辑
  submitTagsEdit = (params = {}) => {
    const { dispatch } = this.props;
    if (params.id) {
      dispatch({ type: 'taskConfig/updateTagsRemote', payload: params });
    } else dispatch({ type: 'taskConfig/addTagsRemote', payload: params });
  };

  render() {
    const {
      tableLoading,
      editLoading,
      taskConfig: { data = {}, item = {}, editVisible, tags = [], tagsItem = {}, tagsVisible },
    } = this.props;

    return (
      <BreadcrumbView>
        <Card bordered={false} bodyStyle={{ padding: '21px 15px' }}>
          <SectionHeader
            title="默认标签设置"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
          />
          <div className={classNames.tagMain}>
            {tags &&
              tags.map(tag => (
                <TaskTag
                  data={tag}
                  remove={tag => this.removeTags(tag)}
                  edit={tag => this.showTagsEdit(tag)}
                />
              ))}
          </div>
          <Tag
            onClick={this.showTagsEdit}
            style={{
              background: '#cecece2e',
              borderRadius: '10px 10px 10px 10px',
              border: 0,
              color: '#0091FF',
              fontSize: '10px',
              padding: '1px 12px 1px 12px',
            }}
          >
            <PlusOutlined />
            标签
          </Tag>

          <div
            style={{
              width: '100%',
              marginTop: '24px',
              height: '1px',
              borderBottom: '1px dashed #CCCCCC',
            }}
          />

          <SectionHeader
            title="默认属性设置"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
          />
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon={<PlusOutlined />} type="primary" onClick={this.showEdit}>
                新增
              </Button>
            </div>
            <StandardTable
              bordered
              loading={tableLoading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Layer
          type="drawer"
          title={item.id ? '编辑默认属性' : '新增默认属性'}
          width="30vw"
          loading={editLoading}
          visible={editVisible}
          onClose={this.closeEdit}
        >
          <Edit item={item} submit={this.submitEdit} close={this.closeEdit} />
        </Layer>
        <Layer
          title={tagsItem.id ? '编辑标签' : '新增标签'}
          width="30vw"
          loading={editLoading}
          visible={tagsVisible}
          onClose={this.closeTagsEdit}
          footer={null}
        >
          <EditTags item={tagsItem} submit={this.submitTagsEdit} close={this.closeTagsEdit} />
        </Layer>
      </BreadcrumbView>
    );
  }
}

export default Index;
