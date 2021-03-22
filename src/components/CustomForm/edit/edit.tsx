// 编辑或者查看详情的时候根据提交的拓展字段中的sysVersionId,versionId字段查表单配置用来显示，没有就不用查了
// 提交数据的时候要在拓展字段exts里面新增sysVersionId,versionId字段方便对拓展字段做版本控制
// 如果是修改sysVersionId,versionId取值来源拓展字段，新增的话取表单配置

import React, { PureComponent } from 'react';

import Prompt from 'umi/prompt';
import { Form, Col, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ValidatorTypes } from '@/components/CustomForm/controlTypes';

import FormEditItem from '@/components/CustomForm/FormItem/edit';
import FormItemData from '@/components/CustomForm/FormItem/detail';

import FormEvent from '@/utils/formevent';

const FormItem = Form.Item;

interface IProps extends FormComponentProps {
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
  showPrompt: boolean;
  children?: (form) => React.ReactElement;
}

@Form.create<IProps>()
class BaseForm extends PureComponent<IProps> {
  componentWillUnmount() {
    // 组件卸载时候清空事件
    FormEvent.clear(this.props.formCode);
  }
  /**
   * @argument 需要支持的验证validators
   * @description  将表单的验证信息与ant design中表单的验证字段相匹配
   */
  getValidator = controlConfig => {
    const { controlLabel, validators } = controlConfig;
    const rules = [];
    validators &&
      validators.forEach(validator => {
        const rule: {
          required?: boolean;
          message?: string;
          [index: string]: any;
        } = {};
        // 如果该验证已经定义
        const validatorData = validator.validatorParam;
        // 待验证数据
        switch (validator.validatorType) {
          case ValidatorTypes.ISREQUIRED:
            if (validatorData.require) {
              rule.required = true;
              rule.message = `${controlLabel}为必填项`;
            }
            break;
          case ValidatorTypes.INPUTLENGTH:
            if (validatorData.maxLength) {
              rule.max = validatorData.maxLength;
              rule.message = `${controlLabel}长度不能超过${validatorData.maxLength}`;
            } else if (validatorData.minLength) {
              rule.min = validatorData.minLength;
              rule.message = `${controlLabel}长度不能少于${validatorData.minLength}`;
            }
            if (validatorData.maxLength && validatorData.minLength) {
              rule.message = `${controlLabel}长度应该在${validatorData.minLength}和${
                validatorData.maxLength
              }个字符之间`;
            }
            break;
          case ValidatorTypes.NUMBER:
          case ValidatorTypes.DATE:
          case ValidatorTypes.DATERANGE:
            break;
          default:
        }
        if (Object.keys(rule).length > 0) {
          rules.push(rule);
        }
      });
    return rules;
  };
  // 将当前控件依赖controlCode的extraProps属性存到当前控件中
  getObserverExtraProps = referenceField => {
    const { containers } = this.props;
    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];
      const control = container.controls.find(item => item.controlCode === referenceField);
      if (control) {
        const { extraProps } = control;
        return extraProps;
      }
    }
  };

  checkProjectMode = () => {
    const appCode = wx.getStorageSync('app-code');
    return appCode === '07';
  };

  getFormItem = (formdata, data: JgFormProps.ControlConfig, containertype) => {
    const { form, formCode, parentformdata,iseditmode } = this.props;
    const {
      extraProps: { referenceField, nameCode, hidden },
      controlCode,
      controlType,
      controlId,
      controlLabel,
    } = data;
    if (this.checkProjectMode() && controlCode === 'projectId') {
      // 如果在项目视图下，并且当前控件是项目组件，则不渲染
      return null;
    }
    // 设置控件的类型，系统控件 or自定义控件
    data.containertype = containertype;
    if (referenceField) {
      const observerextraprops = this.getObserverExtraProps(referenceField);
      // console.log(observerextraprops);
      data.observerextraprops = observerextraprops;
    }
    const rules = this.getValidator(data);
    const formConfig = {
      rules,
      initialValue: '',
    };
    // 如果是编辑，则回显表单值
    if (Object.keys(formdata).length > 0) {
      const controlData = formdata[controlCode];
      formConfig.initialValue = controlData;
      // 否则显示表单设计的默认值
    } else {
      const controlData = data.defaultValue;
      formConfig.initialValue = controlData;
    }
    const isEditAble = this.isEditAble(data);

    return (
      <Col
        md={24}
        sm={24}
        key={controlId}
        data-controlcode={controlCode}
        data-controltype={controlType}
        style={{ ...(hidden && { display: 'none' }) }}
      >
        {!isEditAble ? (
          <FormItem data-id={controlId} label={controlLabel}>
            {form.getFieldDecorator(controlCode, { initialValue: formConfig.initialValue })(
              <FormItemData data={data} formdata={formdata} />
            )}
          </FormItem>
        ) : (
          <FormItem data-id={controlId} label={controlLabel}>
            {form.getFieldDecorator(controlCode, formConfig)(
              <FormEditItem
                data={data}
                form={form}
                iseditmode={iseditmode}
                formdata={formdata}
                formCode={formCode}
                parentformdata={parentformdata}
              />
            )}
          </FormItem>
        )}
        {/*  这里是隐藏的表单项，用来显示关联值，比如projectName，这样当需要设置nameCode时候就不需要再用
        form.getFieldDecorator装饰了
        */}

        {nameCode ? (
          <FormItem data-id={controlId} label={controlLabel} style={{ display: 'none' }}>
            {form.getFieldDecorator(nameCode, { initialValue: formdata[nameCode] })(<span />)}
          </FormItem>
        ) : null}
      </Col>
    );
  };
  // 如果是审批页面，如果是可修改字段，则可修改
  // 如果是编辑或者新增表单页面根据表单配置isUpdateAble字段控制是否可以修改
  isEditAble = data => {
    const { iseditmode, canModifyColumn, approve, constValues } = this.props;
    // 如果是审批页面直接根据配置判断是否需要修改
    if (approve) {
      const editItem = canModifyColumn.find(item => data.controlCode === item);
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
    const { form, formdata, constValues={} } = this.props;
    // 如果是修改的话第一次渲染时候根据接口返回值渲染
    // 之后再根据form.getFieldsValue()取值，否则form.getFieldsValue()永远为空
    let newFormData = form.getFieldsValue();
    if (
      Object.keys(newFormData).length === 0 ||
      Object.keys(newFormData).length === Object.keys(constValues).length
    ) {
      newFormData = formdata;
    }
    return containers.reduce((acc, container) => {
      // const editControls = container.controls.filter(item => !item.extraProps.hidden);
      const forms = container.controls.map(item => {
        const data = { ...item };
        const formItem = this.getFormItem(newFormData, data, container.type);
        return formItem;
      });
      const formContainer = (
        <div
          key={container.containerId}
          className="containers"
          style={{
            justifyContent: container.justifyContent || 'left',
            textAlign: container.align || 'left',
          }}
        >
          <div className="form-container-content">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>{forms}</Row>
          </div>
        </div>
      );
      return acc.concat(formContainer);
    }, []);
  };

  // 提交数据
  validateFields = cb => {
    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        console.log('Received values of form: ', formValues);
        const { formdata } = this.props;
        // 如果没有修改直接返回数据
        // 如果有默认值的话不会触发isFieldsTouched，会导致默认值不会传回去
        // 新增流程的时候如果全设置了默认值会导致formdata为空，此时应该将formValues
        // formValues传回去
        if (!this.isDirty) {
          cb({ ...formValues, ...formdata }, false);
          return;
        }
        cb(formValues, true);
      }
    });
  };

  get isDirty() {
    return this.props.form.isFieldsTouched();
  }

  render() {
    const { children: ChildCom, formdata, form, containers, showPrompt } = this.props;
    const forms = this.getForms(containers);
    return (
      <>
        <Form layout="horizontal">
          {forms}
          {ChildCom && (
            <div
              className="containers"
              //  style={{ paddingTop: '24px' }}
            >
              <ChildCom form={form} formdata={formdata} />
            </div>
          )}
        </Form>
        <Prompt
          when={this.isDirty && showPrompt}
          message={location => {
            return window.confirm('确定要离开当前页面吗');
          }}
        />
      </>
    );
  }
}

export default BaseForm;
