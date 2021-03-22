import React, { PureComponent } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { connect } from 'react-redux';

import SearchTree from '@/components/SearchTree';
import Loading from '@/components/Loading';
import Layer from '@/components/Layer';
import Edit from './edit';
import BreadcrumbView from '@/components/Breadcrumb';

/**
 * 项目分类
 *
 */
@connect(({ projectCategory, loading }) => ({
  loading: loading.effects['projectCategory/listRemote'] || false,
  list: projectCategory.list,
  item: projectCategory.item,
  editVisible: projectCategory.editVisible,
}))
class projectCategory extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'projectCategory/listRemote', payload: true });
  }

  // 展开编辑
  showEdit = item => {
    const { dispatch } = this.props;
    if (item && item.id) {
      dispatch({ type: 'projectCategory/toggleEdit', payload: true });
      dispatch({ type: 'projectCategory/item', payload: item });
    } else {
      dispatch({ type: 'projectCategory/toggleEdit', payload: true });
    }
  };

  // 关闭编辑
  closeEdit = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'projectCategory/toggleEdit', payload: false });
  };

  // 提交编辑
  submitEdit = params => {
    const { dispatch } = this.props;
    if (params.id) {
      dispatch({ type: 'projectCategory/updateRemote', payload: params });
    } else dispatch({ type: 'projectCategory/addRemote', payload: params });
  };

  // 删除
  remove = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'projectCategory/removeRemote', payload: record });
  };

  render() {
    const { list, item, loading, editVisible } = this.props;

    return (
      <BreadcrumbView>
        <Loading loading={loading} bodyStyle={{ padding: '21px 15px' }}>
            <SearchTree
              data={list}
              onEdit={v => this.showEdit(v)}
              onDelete={v => this.remove(v)}
            >
              <Button icon={<PlusOutlined/>} type="dashed" onClick={this.showEdit}
                      style={{ borderColor: '#1890ff', color: '#1890ff', margin: '16px 0' }}>
                新增
              </Button>
            </SearchTree>
            <Layer
              type="drawer"
              title={item.id ? '编辑项目类型' : '新增项目类型'}
              width="30vw"
              loading={loading}
              visible={editVisible}
              onClose={this.closeEdit}
            >
              <Edit list={list} item={item} submit={this.submitEdit} close={this.closeEdit}/>
            </Layer>
        </Loading>
      </BreadcrumbView>
    );
  }
}

export default projectCategory;
