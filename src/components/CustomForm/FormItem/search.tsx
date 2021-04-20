import React from 'react';
import { Input, Switch, Checkbox, Select, InputNumber } from 'antd';
import styles from '../index.less';
import { ConTypes } from '../controlTypes';
import ErrorBoundary from './errorhandle';

import { DataSelecter, TreePicker, JgRangePicker, Address } from '@/components/CustomForm';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
// IFormProps
@ErrorBoundary('组件渲染错误')
class FormSearchItem extends React.Component<JgFormProps.FormItemProps> {
  getRenderByType = () => {
    // formProps:{onChange ,value,id}接口数据，用来获取关联值
    const { data, onChange, value, id } = this.props;
    const { extraProps, placeHolder, controlType } = data;
    const formProps = {
      onChange,
      value,
      id,
    };
    let com;
    switch (controlType) {
      case ConTypes.INPUT:
      case ConTypes.TEXTAREA:
      case ConTypes.DATAPICKER:
        com = <Input placeholder={placeHolder} {...formProps} />;
        break;
      case ConTypes.NUMINPUT:
        com = (
          <InputNumber placeholder={placeHolder} {...formProps} />
        );
        break;
      case ConTypes.RADIO:
      case ConTypes.SELECT:
        com = (
          <DataSelecter
            extraProps={{
              flag: extraProps.flag,
              type: extraProps.type,
              candidates: extraProps.candidates,
            }}
          >
            {candidates => (
              <Select {...formProps} placeholder={placeHolder} allowClear>
                {candidates.map(item => (
                  <Option key={item.value}>{item.label}</Option>
                ))}
              </Select>
            )}
          </DataSelecter>
        );
        break;
      case ConTypes.CHECKBOXG:
        com = (
          <DataSelecter
            extraProps={{
              flag: extraProps.flag,
              type: extraProps.type,
              candidates: extraProps.candidates,
            }}
          >
            {candidates => (
              <CheckboxGroup options={candidates} {...formProps} />
            )}
          </DataSelecter>
        );
        break;
      case ConTypes.ADDRESS:
        com = <Address {...formProps} />
        break;
      case ConTypes.DATEPICKER:
        com = (
          <JgRangePicker
          
            extraProps={{ formatId: extraProps.number }}
            {...formProps}
          />
        );
        break;
      case ConTypes.SWITCH:
        com = (
          <Switch
          
            checkedChildren="是"
            checked={!!data.value}
            unCheckedChildren="否"
            {...formProps}
          />
        );
        break;
      case ConTypes.TREEPICKER:
        com = (
          <TreePicker
            extraProps={{
              type: extraProps.type,
              url: extraProps.url,
              nameCode: extraProps.nameCode,
              candidates: extraProps.candidates,
            }}
            placeholder={placeHolder}
            disabled={false}
            {...formProps}
          />
        );
        break;
      default:
        break;
    }
    return com;
  };

  render() {
    // console.log(this.props);

    const Com = this.getRenderByType();
    return <>{Com}</>;
  }
}
export default FormSearchItem;
