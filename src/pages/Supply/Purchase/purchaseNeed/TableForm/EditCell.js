import React from 'react';
import { connect } from 'react-redux';
import { Input, InputNumber,Form } from 'antd';
import JgDatePicker from '@/components/CustomForm/JgDatePicker';
import DataPicker from '@/components/CustomForm/DataPicker';
import EditableContext from './EditableContext';

const FormItem = Form.Item;
@connect(
  null,
  null
)
class EditableCell extends React.Component {
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // 选择了供应商
  onSuppplierSelect = (form, record) => {
    form.getFieldDecorator('supplierName', {
      initialValue: '',
    });
    form.setFieldsValue({
      supplierName: record.name,
    });
  };

  restMeter = (form, record) => {
    const { dispatch } = this.props;
    const { specs, brand } = record;
    const formKeys = {
      materialId: record.id,
      materialName: record.name,
      specs,
      brand,
    };
    // 设置关联值
    const { parentForm } = form;
    const { depotId } = parentForm.getFieldsValue();
    dispatch({
      type: 'suppy/querydepotList',
      payload: { materialId: record.id, depotId },
      callback: data => {
        const { num = 0, unit = '' } = data[0] || {};
        const formData = {
          num,
          unit,
        };
        form.setFieldsValue({ ...formData, ...formKeys });
      },
    });
  };

  getInput = form => {
    const { dataIndex, readOnly, record } = this.props;
    let inputCom = <Input style={{ width: 120 }} readOnly={readOnly} />;
    switch (dataIndex) {
      case 'materialName':
        inputCom = (
          <DataPicker
            extraProps={{
              formCode: 'Material',
            }}
            controled
            placeholder="物料"
            formdata={record}
            style={{ width: 120 }}
            onSelect={data => this.restMeter(form, data)}
          />
        );
        break;
      case 'estimatedDate':
      case 'lastDate':
        inputCom = (
          <JgDatePicker style={{ width: 120 }} extraProps={{ formatId: 0 }} readOnly={readOnly} />
        );
        break;
      case 'supplierId':
        inputCom = (
          <DataPicker
            extraProps={{
              formCode: 'Supplier',
            }}
            controled
            placeholder="供应商"
            formdata={record}
            style={{ width: 120 }}
            onSelect={data => this.onSuppplierSelect(form, data)}
          />
        );
        break;
      case 'num':
      case 'estimatedUnitPrice':
        inputCom = (
          <InputNumber
            readOnly={readOnly}
            style={{ width: 60 }}
            min={0}
            onChange={() => {
              this.timer = setTimeout(() => {
                const { estimatedUnitPrice, num } = form.getFieldsValue();
                if (estimatedUnitPrice && num) {
                  const formKeys = {
                    estimatedAmount: estimatedUnitPrice * num,
                  };
                  form.setFieldsValue(formKeys);
                }
              }, 0);
            }}
          />
        );
        break;
      default:
        break;
    }

    return inputCom;
  };

  render() {
    // Invalid value for prop `dispatch` on <td> tag. Either remove it from the element
    const {
      editing,
      dataIndex,
      title,
      required,
      record,
      index,
      dispatch,
      cateList,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required,
                        message: `请输入 ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput(form))}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
export default EditableCell;
