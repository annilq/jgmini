import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import EnquireItem from './EnquireItem';
import styles from '../../index.less';

@withRouter
class EnquireList extends Component {
  cols = [
    {
      title: '物资名称',
      dataIndex: 'materialName',
    },
    {
      title: '物资Id',
      dataIndex: 'materialId',
    },
    {
      title: '规格',
      dataIndex: 'specs',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '计划单价',
      dataIndex: 'planUnitprice',
    },
    {
      title: '询价日期',
      dataIndex: 'enquiryDate',
    },
    {
      title: '询价数量',
      dataIndex: 'enquiryNum',
    },
    // {
    //   title: '库存数量',
    //   value: '',
    //   dataIndex: 'stockNum',
    // },
    {
      title: '前次采购厂商',
      dataIndex: 'supplierNameOld',
    },
    {
      title: '需用日期',
      dataIndex: 'needDate',
    },
    {
      title: '询价记录',
      value: [],
      dataIndex: 'enquiryRecordsList',
    },
  ];

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (!id) {
      this.addEnquireItem();
    }
  }

  // 询价明细数据修改
  onEnquireChange = data => {
    const { value } = this.props;
    const { onChange } = this.props;
    // 新增的数据没有id用uid作为唯一表示
    const oldDataIndex = value.findIndex(item => {
      if (item.id) {
        return item.id === data.id;
      }
      if (item.uid) {
        return item.uid === data.uid;
      }
      return false;
    });
    value.splice(oldDataIndex, 1, data);
    onChange(value);
  };

  addEnquireItem = () => {
    const { value = [], onChange } = this.props;
    const attrObj = this.cols.reduce(
      (obj, item) => {
        obj[item.dataIndex] = item.value && [...item.value];
        return obj;
      },
      { uid: Date.now() }
    );
    value.push(attrObj);
    onChange(value);
  };

  onDelete = data => {
    const { value, onChange } = this.props;
    const oldDataIndex = value.findIndex(item => {
      if (item.id) {
        return item.id === data.id;
      }
      if (item.uid) {
        return item.uid === data.uid;
      }
      return false;
    });
    value.splice(oldDataIndex, 1);
    onChange(value);
  };

  render() {
    const { value = [] } = this.props;
    const enquireList = value.map(item => {
      const key = item.id || item.uid;
      return (
        <EnquireItem
          value={item}
          key={key}
          onEnquireChange={this.onEnquireChange}
          onDelete={this.onDelete}
        />
      );
    });
    return (
      <div className={styles.enquireList}>
        {enquireList}
        <Button type="primary" onClick={this.addEnquireItem}>
          新增询价
        </Button>
      </div>
    );
  }
}

export default EnquireList;
