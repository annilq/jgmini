// 编辑或者查看详情的时候根据提交的拓展字段中的sysVersionId,versionId字段查表单配置用来显示，没有就不用查了
// 提交数据的时候要在拓展字段exts里面新增sysVersionId,versionId字段方便对拓展字段做版本控制
// 如果是修改sysVersionId,versionId取值来源拓展字段，新增的话取表单配置

import React, { PureComponent } from 'react';

import { Form } from 'annar';
import { ConTypes } from '@/components/CustomForm/controlTypes';

import FormEditItem from '@/components/CustomForm/FormItem/edit';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { getValidator } from '@/components/CustomForm/FormUtil';

import FormEvent from '@/utils/formevent';

const FormItem = Form.Item;

interface IProps {
  // 是否是编辑页面
  iseditmode?: boolean;
  formCode: string;
  // 引用表单数据
  parentformdata: { formCode: string; formdata: any };
  // 是否在审批页面
  approve?: boolean;
  containers: any[];
  // 写在curRouter里面的默认值，只读
  constValues: any;
  formdata: any;
  // 审批时候可以编辑的字段
  canModifyColumn?: string[];
  form: any;
  children?: (form) => React.ReactElement;
}

class BaseForm extends PureComponent<IProps> {
  componentWillUnmount() {
    // 组件卸载时候清空事件
    FormEvent.clear(this.props.formCode);
  }

  // 将当前控件依赖controlCode的extraProps属性存到当前控件中
  getObserverExtraProps = referenceField => {
    const { containers } = this.props;
    for (let index = 0; index < containers.length; index + 1) {
      const container = containers[index];
      const control = container.controls.find(item => item.controlCode === referenceField);
      if (control) {
        const { extraProps } = control;
        return extraProps;
      }
    }
  };

  getFormItem = (data: JgFormProps.ControlConfig, containertype) => {
    const { form, formCode, parentformdata, formdata, iseditmode } = this.props;
    const {
      extraProps: { nameCode, hidden },
      controlCode,
      controlType,
      controlId,
      controlLabel,
    } = data;
    // 设置控件的类型，系统控件 or自定义控件
    data.containertype = containertype;
    const rules = getValidator(data);
    const isEditAble = this.isEditAble(data);
    let noStyle = false
    switch (controlType) {
      case ConTypes.IMAGEUPLOADER:
      case ConTypes.FILEUPLOADER:
      case ConTypes.INVOICE:
        noStyle = true
        break;
      default:
        break;
    }
    return (
      <div
        key={controlId}
        data-controlcode={controlCode}
        data-controltype={controlType}
        style={{ ...(hidden && { display: 'none' }) }}
        className={`controltype${controlType}`}
      >
        {isEditAble ? (controlType === ConTypes.FILEUPLOADER ? (
          <FormItem
            name={controlCode}
            data-id={controlId}
            valueAlign="left"
            label={(
              <span>
                {controlLabel}
              </span>)}
            noStyle={noStyle}
          >
            <FormItemData data={data} formdata={formdata} />
          </FormItem>) : (
            // 编辑情况下不显示上传附件
            <FormItem noStyle={noStyle} >
              {formInstance => (
                <FormItem
                  valueAlign="left"
                  name={controlCode}
                  rules={rules}
                  label={noStyle ? "" : (
                    <span>
                      {controlLabel}&nbsp;
                    </span>)}
                  noStyle={noStyle}
                  data-id={controlId}
                >
                  <FormEditItem
                    valueAlign="left"
                    data={data}
                    form={form}
                    formdata={{ ...formdata, ...formInstance.getFieldsValue() }}
                    iseditmode={iseditmode}
                    formCode={formCode}
                    parentformdata={parentformdata}
                  />
                </FormItem>
              )}
            </FormItem>)
        ) : (
            !(formdata[controlCode] === null || formdata[controlCode] === undefined) && (
              <FormItem valueAlign="left" name={controlCode} data-id={controlId} label={noStyle ? "" : (
                <span>
                  {controlLabel}
                </span>)}>
                <FormItemData data={data} formdata={formdata} />
              </FormItem>
            )
          )}
        {/*
        这里是隐藏的表单项，用来显示关联值，比如projectName，这样当需要设置nameCode时候就不需要再用form.getFieldDecorator装饰了
        */}
        {nameCode ? (
          <FormItem
            name={nameCode}
            data-id={controlId}
            label={controlLabel}
            style={{ display: 'none' }}
          >
            <span />
          </FormItem>
        ) : null}
      </div>
    );
  };

  // 如果是审批页面，如果是可修改字段，则可修改
  // 如果是编辑或者新增表单页面根据表单配置isUpdateAble字段控制是否可以修改
  isEditAble = data => {
    const { iseditmode, canModifyColumn, approve, constValues } = this.props;
    // 如果是审批页面直接根据配置判断是否需要修改
    if (approve) {
      const editItem = canModifyColumn.includes(data.controlCode);
      return !!editItem;
    }
    const { isUpdateAble } = data;
    // 如果是修改页面则根据isUpdateAble判断
    if (iseditmode) {
      return isUpdateAble;
    }
    // 如果菜单上面设置的默认参数值，则这个值只能用来显示
    if (constValues && constValues[data.controlCode]) {
      return false;
    }
    return true;
  };

  getForms = (containers = []) => {
    const { formdata, approve } = this.props;
    return containers.reduce((acc, container, currentIndex) => {
      // const editControls = container.controls.filter(item => !item.extraProps.hidden);
      const forms = container.controls.map(item => {
        const data = { ...item };
        const formItem = this.getFormItem(data, container.type);
        return formItem;
      });
      // 详情默认添加创建人和创建时间
      if (currentIndex === 0 && approve) {
        forms.push(
          <div data-controlcode="creatorInfo">
            {formdata.creatorName && <FormItem valueAlign="left" label="创建人" key="creatorName">
              <div>{formdata.creatorName}</div>
            </FormItem>}
            {formdata.createTime && <FormItem valueAlign="left" label="创建时间" key="createTime">
              <div>{formdata.createTime}</div>
            </FormItem>}
            {formdata.sendUsers && (
              <FormItem label="抄送人" valueAlign="left" key="sendUsers">
                <div>
                  {JSON.parse(formdata.sendUsers)
                    .map(item => item.name)
                    .join(',')}
                </div>
              </FormItem>)}
          </div>
        );
      }

      const formContainer = (
        <div
          key={container.containerId}
          className="containers"
          style={{
            justifyContent: container.justifyContent || 'left',
            textAlign: container.align || 'left',
          }}
        >
          <div className="form-container-content">{forms}</div>
        </div>
      );
      return acc.concat(formContainer);
    }, []);
  };

  get isDirty() {
    return this.props.form.isFieldsTouched();
  }

  render() {
    const { children: ChildCom, formdata, parentformdata, form, containers, formCode } = this.props;
    const forms = this.getForms(containers);
    return (
      <>
        <Form
          form={form}
        >
          {forms}
          {ChildCom && (
            <FormItem noStyle>
              {formInstance => (
                <ChildCom
                  form={formInstance}
                  formCode={formCode}
                  formdata={{ ...formdata, ...formInstance.getFieldsValue() }}
                  parentformdata={parentformdata}
                />
              )}
            </FormItem>
          )}
        </Form>
      </>
    );
  }
}

export default BaseForm;
