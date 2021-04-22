import React from 'react';
import { Input, Switch } from 'annar';
import { ConTypes } from '../controlTypes';
import ErrorBoundary from './errorhandle';

import { DataSelecter, TreePicker, JgDatePicker, JgNumber, Address, Picker } from '@/components/CustomForm';

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
          <JgNumber placeholder={placeHolder} {...formProps} />
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
            {...formProps}
          >
            {(candidates, rest) => (
              <Picker data={candidates} {...rest} />
            )}
          </DataSelecter>
        );
        break;
      case ConTypes.ADDRESS:
        com = <Address {...formProps} />
        break;
      case ConTypes.DATEPICKER:
        com = (
          <JgDatePicker
            extraProps={{ formatId: extraProps.number }}
            {...formProps}
          />
        );
        break;
      case ConTypes.SWITCH:
        com = (
          <Switch
            checked={!!data.value}
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
    const Com = this.getRenderByType();
    return <>{Com}</>;
  }
}
export default ErrorBoundary('组件渲染错误')(FormSearchItem);
