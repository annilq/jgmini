import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';

@connect(({ loading, jgTableModel, purchase }) => ({
  jgTableModel,
  purchase,
  tableLoading: loading.effects['purchase/queryPurNeedDetail'] || false,
}))
class EditableTable extends React.Component {
  state = { projectId: '' };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '物资名称',
        dataIndex: 'materialName',
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
        title: '品牌',
        dataIndex: 'brand',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '预估单价',
        dataIndex: 'estimatedUnitPrice',
      },
      {
        title: '金额(元)',
        dataIndex: 'estimatedAmount',
      },
      {
        title: '预计使用日期',
        dataIndex: 'estimatedDate',
      },
      {
        title: '最晚签约日期',
        dataIndex: 'lastDate',
      },
      {
        title: '供应商',
        dataIndex: 'supplierName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
    ];
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const {
      jgTableModel: { item },
      dispatch,
    } = nextProps;
    const { projectId } = preState;
    if (item.projectId && item.projectId !== projectId) {
      dispatch({
        type: 'purchase/queryPurNeedDetail',
        payload: { projectId: item.projectId },
      });
      return {
        projectId: item.projectId,
      };
    }
    return null;
  }

  render() {
    const {
      tableLoading,
      purchase: { purNeedList },
    } = this.props;

    return (
      <Table
        loading={tableLoading}
        bordered
        dataSource={purNeedList}
        columns={this.columns}
        rowClassName="editable-row"
      />
    );
  }
}

export default EditableTable;
