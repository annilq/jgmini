import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Button, Divider, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import EditableCell from './EditCell';
import EditableContext from './EditableContext';

@connect(({ loading, jgTableModel }) => ({
  jgTableModel,
  tableLoading: loading.effects['materialCategory/listRemote'] || false,
}))
@Form.create()
class EditableTable extends React.Component {
  formKeys = {
    materialId: '',
    materialName: '',
    specs: '',
    brand: '',
    unit: '',
    num: '',
    estimatedUnitPrice: '',
    estimatedAmount: '',
    estimatedDate: '',
    lastDate: '',
    supplierName: '',
    supplierId: '',
    remark: '',
    isNew: true,
  };

  constructor(props) {
    super(props);
    // 根据dataChangeType来判断数据更新是来自props还是state
    this.state = { data: [], editingKey: '', dataChangeType: 'props' };
    this.columns = [
      {
        title: '物资名称',
        dataIndex: 'materialName',
        required: true,
        editable: true,
      },
      {
        title: '物资id',
        dataIndex: 'materialId',
        required: true,
        editable: true,
        readOnly: true,
      },
      {
        title: '规格',
        dataIndex: 'specs',
        editable: true,
        readOnly: true,
      },
      {
        title: '单位',
        dataIndex: 'unit',
        readOnly: true,
        editable: true,
      },
      {
        title: '品牌',
        editable: true,
        readOnly: true,
        dataIndex: 'brand',
      },
      {
        title: '数量',
        editable: true,
        dataIndex: 'num',
      },
      {
        title: '预估单价',
        dataIndex: 'estimatedUnitPrice',
        required: true,
        editable: true,
      },
      {
        title: '金额(元)',
        dataIndex: 'estimatedAmount',
        required: true,
        editable: true,
      },
      {
        title: '预计使用日期',
        dataIndex: 'estimatedDate',
        required: true,
        editable: true,
      },
      {
        title: '最晚签约日期',
        dataIndex: 'lastDate',
        required: true,
        editable: true,
      },
      {
        title: '供应商',
        dataIndex: 'supplierId',
        render: (text, record) => {
          return record.supplierName;
        },
        required: true,
        editable: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, _record, index) => {
          const editable = this.isEditing(index);
          if (editable) {
            if (_record.isNew) {
              return (
                <span>
                  <a
                    href="javascript:;"
                    onClick={() => this.save(index)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(index)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <div style={{ width: '100px' }}>
                <a onClick={() => this.save(index)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, index)}>取消</a>
              </div>
            );
          }
          return (
            <div style={{ width: '100px' }}>
              <a onClick={e => this.toggleEditable(e, index)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(index)}>
                <a>删除</a>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'materialCategory/listRemote' });
  }

  getCustomCell = col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        required: !!col.required,
        readOnly: !!col.readOnly,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: this.isEditing(index),
      }),
    };
  };

  // 根据dataChangeType来判断数据更新是来自props还是state
  static getDerivedStateFromProps(nextProps, preState) {
    const { dataChangeType } = preState;
    if (nextProps.value && dataChangeType === 'props') {
      return {
        dataChangeType: 'state',
        data: nextProps.value,
      };
    }

    return null;
  }

  isEditing = index => index === this.state.editingKey;

  cancel = (e, index) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = newData[index];
    target.editable = false;
    this.setState({ data: newData, editingKey: '' });
  };

  toggleEditable = (e, index) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = newData[index];
    if (target) {
      // 进入编辑状态时保存原始数据
      target.editable = !target.editable;
      this.setState({ data: newData, editingKey: index });
    }
  };

  addNewRow = () => {
    const newData = [...this.state.data];
    newData.push({ ...this.formKeys });
    // 新增的时候新增本地数据
    this.setState({ data: newData, editingKey: newData.length - 1 });
  };

  remove(index) {
    const { data } = this.state;
    const { onChange } = this.props;
    data.splice(index, 1);
    // 如果是新数据则本地删除就可以
    if (data.isNew) {
      this.setState({ editingKey: '', data });
    } else {
      // 否则删除props的value
      this.setState({ editingKey: '', dataChangeType: 'props' });
      onChange(data);
    }
  }

  save(index) {
    const { form, onChange } = this.props;

    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];

      const item = newData[index];
      delete item.isNew;
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      // 保存的时候把数据同步到props的value
      this.setState({ editingKey: '', dataChangeType: 'props' });
      onChange(newData);
    });
  }

  render() {
    const { form, params = {}, parentForm } = this.props;
    // 查询物资明细的参数
    form.params = params;
    form.parentForm = parentForm;
    const { data, editingKey } = this.state;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      return this.getCustomCell(col);
    });
    return (
      <EditableContext.Provider value={form}>
        <Table
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          scroll={{ x: true }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.addNewRow}
          icon={<PlusOutlined />}
          disabled={editingKey !== ''}
        >
          新增
        </Button>
      </EditableContext.Provider>
    );
  }
}

export default EditableTable;
