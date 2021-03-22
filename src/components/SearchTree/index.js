import React, { PureComponent, Fragment } from 'react';
import { Input, Popconfirm, Tree } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

import { generateList, getParentId } from '@/utils/tree';

const { TreeNode, DirectoryTree } = Tree;
const { Search } = Input;

/**
 *  公共树形结构组件(可搜索)
 *  @author hmy
 *
 */
class SearchTree extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  state = {
    searchValue: '',
    expandedKeys: [],
    autoExpandParent: true,
  };

  loop = data =>
    data.map(item => {
      const { onEdit, onDelete, onEnable, onShowContent, onAction } = this.props;

      const { searchValue } = this.state;
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);

      const title = (
        <span className={styles.title}>
          {index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.name}</span>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {onEdit ? (
            <a onClick={() => onEdit(item)} className={styles.action}>
              编辑
            </a>
          ) : null}
          {onDelete ? (
            <Popconfirm title="确认删除？" onConfirm={() => onDelete(item)}>
              <a className={styles.action}>删除</a>
            </Popconfirm>
          ) : null}
          {/* 是否禁用启用 */}
          {onEnable ? (
            <Popconfirm
              title={`确认${item.enabled ? '禁用' : '启用'}`}
              onClick={e => e.stopPropagation()}
              onConfirm={e => {
                e.stopPropagation();
                onEnable(item);
              }}
            >
              <a className={styles.action}>{item.enabled ? '禁用' : '启用'}</a>
            </Popconfirm>
          ) : null}
          {onAction ? (
            <a onClick={() => onAction(item)} className={styles.action}>
              功能
            </a>
          ) : null}
          {onShowContent && !item.children ? (
            <a onClick={() => onShowContent(item)} className={styles.action}>
              预览列表
            </a>
          ) : null}
        </span>
      );

      if (item.children && item.children.length) {
        return (
          <TreeNode selectable={false} key={item.id} title={title}>
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode isLeaf selectable={false} key={item.id} title={title} />;
    });

  // 层级展开
  onExpand = (expandedKeys, { expanded, node }) => {
    this.setState({ expandedKeys, autoExpandParent: false });
  };

  // 输入内容变化
  onChange = e => {
    const searchValue = e.target.value.replace(/(^\s*)|(\s*$)/g, ''); // trim

    const { data = [] } = this.props;
    const dataList = [];
    generateList(data, dataList); // 树状结构扁平化

    const expandedKeys =
      searchValue.length > 0
        ? dataList
            .map(item => {
              if (item.name.indexOf(searchValue) !== -1) {
                return getParentId(item.id, data);
              }
              return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i) // 过滤null值和重复值
        : [];

    // 注: 子节点展开,父节点会自动展开
    this.setState({ expandedKeys, searchValue, autoExpandParent: true });
  };

  render() {
    const { expandedKeys, autoExpandParent } = this.state;
    const { data = [] } = this.props;

    return (
      <Fragment>
        <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange} />
        <DirectoryTree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {this.loop(data)}
        </DirectoryTree>
      </Fragment>
    );
  }
}

export default SearchTree;
