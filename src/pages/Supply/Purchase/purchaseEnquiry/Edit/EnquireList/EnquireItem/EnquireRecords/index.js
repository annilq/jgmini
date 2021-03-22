import React from 'react';
import { Table, Popconfirm, Button } from 'antd';
import EditRecord from './Edit';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      editable: false,
      visible: false,
      // 默认新增index-1
      editIndex: -1,
    };
  }
  columns = [
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
      title: '品牌',
      dataIndex: 'brand',
    },
    {
      title: '不含税单价',
      dataIndex: 'taxFreePrice',
    },
    {
      title: '不含税金额',
      dataIndex: 'taxFreeAmount',
    },
    {
      title: '税率',
      dataIndex: 'taxRate',
    },
    {
      title: '税金',
      dataIndex: 'rate',
    },
    {
      title: '包含税单价',
      dataIndex: 'includingTaxPrice',
    },
    {
      title: '包含税金额',
      dataIndex: 'includingTaxAmount',
    },
    {
      title: '发票类型',
      dataIndex: 'invoiceType',
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
      title: '是否推荐使用供应商',
      dataIndex: 'isSelected',
      render: text => {
        return <span>{text ? '是' : ''}</span>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <span>
            <a
              href="javascript:;"
              onClick={() => this.editDetail(index)}
              style={{ marginRight: 8 }}
            >
              编辑
            </a>
            <a
              href="javascript:;"
              onClick={() => this.showDetail(record)}
              style={{ marginRight: 8 }}
            >
              查看
            </a>
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(index)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  showDetail = record => {
    this.setState({ data: record, visible: true, editable: false });
  };

  editDetail = index => {
    const { value } = this.props;
    // 修改的时候标注index，修改不跟进id判断，直接根据index判断
    this.setState({ data: value[index], visible: true, editable: true, editIndex: index });
  };

  // 单个询价记录修改
  onConfirm = newData => {
    const { onRecordChange, onAddRecord } = this.props;
    const { editIndex } = this.state;
    if (editIndex === -1) {
      onAddRecord(newData);
    } else {
      onRecordChange(editIndex, newData);
    }
    this.onCancel();
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  addRecord = () => {
    this.setState({ data: {}, visible: true, editable: true, editIndex: -1 });
  };

  remove = index => {
    const { onRemoveRecord } = this.props;
    onRemoveRecord(index);
  };

  render() {
    const { value } = this.props;
    const { data, visible, editable } = this.state;
    return (
      <div style={{ padding: '0 20px' }}>
        <div style={{ height: 'auto', overflow: 'hidden' }}>
          <span style={{ color: '#4095ff' }}>询价记录:</span>
          <Button type="primary" onClick={this.addRecord} style={{ float: 'right' }}>
            新增询价记录
          </Button>
        </div>
        <Table
          bordered
          dataSource={[...value]}
          columns={this.columns}
          rowClassName="editable-row"
          style={{ overflow: 'scroll' }}
          className="table"
        />
        <EditRecord
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          value={data}
          visible={visible}
          editable={editable}
        />
      </div>
    );
  }
}

export default EditableTable;
