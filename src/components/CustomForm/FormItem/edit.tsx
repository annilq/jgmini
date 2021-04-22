import React from 'react';
import { Input, Switch } from 'annar';
import { Textarea, Text } from "remax/wechat"

import FormEvent from '@/utils/formevent';
import { ConTypes } from '../controlTypes';
import ErrorBoundary from './errorhandle';

import {
  DataPicker,
  DataSelecter,
  TreePicker,
  ImageUpload,
  // Address,
  // InvoiceUpload,
  JgDatePicker,
  JgNumber,
  Picker,
  // TaskTag,
} from '@/components/CustomForm';

import TableList from '@/components/CustomForm/SubTable/detailList';

enum EmitType {
  onChange = 1,
  onSelect,
}

class FormEditItem extends React.PureComponent<JgFormProps.FormItemProps> {
  onChange = (e, id) => {
    // 如果不触发onChange事件，表单验证会失败
    const newValue = e ? (e.target ? e.target.value : e) : e;
    this.props.onChange(newValue);
    this.emit(id, newValue, EmitType.onChange);
  };

  setFieldName = (id, data, extraProps) => {
    const { form } = this.props;
    const { nameCode, nameCodeKey } = extraProps;
    // 设置关联项目，为了子表回显
    const newNameCode = nameCode || id.replace('Id', 'Name');
    const name = Array.isArray(data)
      ? data.map(item => item.name || item[nameCodeKey]).join(',')
      : data.name || data[nameCodeKey];
    form.setFieldsValue({
      [newNameCode]: name,
    });
  };

  onSelect = (data, id, extraProps) => {
    // 数据转化
    const { onSelect } = this.props;
    onSelect && onSelect(data);
    // 设置关联的name
    this.setFieldName(id, data, extraProps);
    // 新增EmitType类型，用户可通过此类型判断数据是由onChange触发还是由onSelect触发，避免二次渲染
    this.emit(id, data, EmitType.onSelect);
  };

  emit = (channel, value, emitType: EmitType) => {
    const { formCode } = this.props;
    FormEvent.emitdata(formCode, channel, { channel, value, emitType });
  };

  // combineType===1清理关联值,并将关联值作为参数查询
  // combineType===2清理关联值,并赋值为参数值
  // 下面三种类型是计算的
  // combineType===3乘法
  // combineType===4清空
  // combineType===5减法
  // combineMapTo：取出controlCode字段在data中的映射
  handerlistener = (channels, { oberser: { controlCode, combineMapTo }, combineType = 1 }) => ({
    value,
    emitType,
    channel,
  }) => {
    console.log(channels, channel, value, controlCode);
    const { form } = this.props;
    switch (combineType) {
      case 1:
      case 2:
      case 4:
        form.setFieldsValue({
          [controlCode]: combineType === 2 ? value[combineMapTo || controlCode] : '',
        });
        break;
      case 3:
      case 5:
        this.calculation(controlCode, channels, combineType);
      default:
        break;
    }
  };

  // combineType===3乘法
  // combineType===5减法
  calculation = (controlCode, channels, combineType) => {
    const { form } = this.props;
    let sum = 0;
    const channelArr = channels.split('|');
    switch (combineType) {
      case 3:
        sum = channelArr.reduce((acc, item) => {
          const value = form.getFieldValue(item) || 0;
          return acc * value;
        }, 1);
        break;
      case 5:
        sum = channelArr.reduce((acc, item) => {
          const value = form.getFieldValue(item) || 0;
          return acc + value;
        }, 0);
        break;
      default:
        console.log(`${combineType}类型计算先不做`);
        break;
    }

    form.setFieldsValue({
      [controlCode]: sum,
    });
  };
  // 注册事件
  addListener = formConfig => {
    const {
      extraProps: { combineField: channels, combineType, combineMapTo },
      controlCode,
    } = formConfig;
    const { formCode } = this.props;
    FormEvent.listen(
      formCode,
      channels,
      controlCode,
      this.handerlistener(channels, { oberser: { controlCode, combineMapTo }, combineType })
    );
  };

  getRenderByType = () => {
    // data 表单配置项数据
    // form 表单form引用，用来设置关联值
    // formProps:{formdata,onChange ,value,id}接口数据，用来获取关联值
    const { data, form, id, value, formdata, parentformdata, iseditmode } = this.props;
    // 表单属性
    const { extraProps, placeHolder, controlType, controlCode } = data;
    // console.log(this.props);
    // console.log(data);
    if (extraProps.combineField) {
      this.addListener(data);
    }
    const formProps = {
      id: controlCode,
      value,
      // formdata,
      readOnly: data.extraProps.readOnly,
      onChange: value => this.onChange(value, id),
      containertype: data.containertype,
      ...(data.observerextraprops && { observerextraprops: data.observerextraprops }),
      formdata,
      iseditmode,
      parentformdata,
    };

    let com;
    switch (controlType) {
      case ConTypes.INPUT:
        com = <Input placeholder={placeHolder} {...formProps} />;
        break;
      case ConTypes.TEXTAREA:
        com = (
          <Textarea
            placeholder={placeHolder}
            {...formProps}
          />
        );
        break;
      case ConTypes.NUMINPUT:
        com = (
          <JgNumber
            extraProps={data.extraProps}
            validators={data.validators}
            placeholder={placeHolder}
            {...formProps}
          />
        );
        break;
      case ConTypes.RADIO:
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
      case ConTypes.CHECKBOXG:
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
              <Picker
                data={candidates}
                placeholder={placeHolder}
                {...rest}
              />
            )}
          </DataSelecter>
        );
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
      case ConTypes.DATAPICKER:
        com = (
          <DataPicker
            extraProps={{
              formType: extraProps.formType,
              formCode: extraProps.formCode,
              nameCode: extraProps.nameCode,
              nameCodeKey: extraProps.nameCodeKey,
              codeKey: extraProps.codeKey,
              combineField: extraProps.combineField,
              combineMapTo: extraProps.combineMapTo,
              combineScope: extraProps.combineScope,
              multiple: extraProps.multiple,
              requestParams: extraProps.requestParams,
            }}
            form={form}
            placeholder={placeHolder}
            onSelect={value => this.onSelect(value, id, extraProps)}
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
              parentNodeDisable: extraProps.parentNodeDisable,
              candidates: extraProps.candidates,
            }}
            disabled={false}
            {...formProps}
          />
        );
        break;
      case ConTypes.FILEUPLOADER:
        // com = <FileUpload {...formProps} />;
        com = <Text>FileUpload未实现</Text>
        break;
      case ConTypes.IMAGEUPLOADER:
        const { controlLabel } = data
        com = <ImageUpload {...formProps} label={controlLabel} />;
        break;
      case ConTypes.ADDRESS:
        // com = <Address {...formProps} />;
        com = <Text>Address未实现</Text>
        break;
      case ConTypes.LOCATION:
        com = <Text>LOCATION未实现</Text>
        break;
      case ConTypes.INVOICE:
        // com = <InvoiceUpload form={form} {...formProps} />;
        com = <Text>InvoiceUpload未实现</Text>
        break;
      case ConTypes.SUBTABLE:
        com = (
          <TableList
            value={value}
            extraProps={extraProps}
            formdata={formdata}
          />
        );
        break;
      case ConTypes.TASK:
        // formCode
        // com = <TaskTag formdata={formdata} {...formProps} />;
        com = <Text>TaskTag</Text>
        break;
      default:
        break;
    }
    return com;
  };

  render() {
    const { data } = this.props
    let Com
    try {
      Com = this.getRenderByType();
    } catch (error) {
      console.log(data);
    }
    return <>{Com}</>;
  }
}
export default ErrorBoundary('组件渲染错误')(FormEditItem);
