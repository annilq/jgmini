import React from 'react';
import { Table } from 'antd';
import RecordDetail from './Detail';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      visible: false,
    };
    this.columns = [
      {
        title: '供应商',
        dataIndex: 'supplierName',
      },
      {
        title: '供应商地址',
        dataIndex: 'supplierAddress',
      },
      {
        title: '联系人',
        dataIndex: 'contact',
      },
      {
        title: '联系电话',
        dataIndex: 'mobile',
      },
      {
        title: '单价',
        dataIndex: 'unitprice',
      },

      {
        title: '总报价',
        dataIndex: 'totalPrice',
      },
      {
        title: '送货日期',
        dataIndex: 'deliveryDate',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, _record) => {
          return <a onClick={() => this.showDetail(_record)}>查看</a>;
        },
      },
    ];
  }

  showDetail = record => {
    this.setState({ data: record, visible: true });
  };

  onConfirm = () => {
    this.setState({ visible: false });
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { value } = this.props;
    const { data, visible } = this.state;

    return (
      <div style={{ padding: '0 20px' }}>
        <span style={{ color: '#4095ff' }}>询价记录:</span>
        <Table bordered dataSource={value} columns={this.columns} rowClassName="editable-row" />
        <RecordDetail
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          value={data}
          visible={visible}
        />
      </div>
    );
  }
}

export default EditableTable;
