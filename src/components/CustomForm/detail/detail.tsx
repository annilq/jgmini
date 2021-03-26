// 编辑或者查看详情的时候根据提交的拓展字段中的sysVersionId,versionId字段查表单配置用来显示，没有就不用查了
// 提交数据的时候要在拓展字段exts里面新增sysVersionId,versionId字段方便对拓展字段做版本控制
// 如果是修改sysVersionId,versionId取值来源拓展字段，新增的话取表单配置

import React, { PureComponent } from 'react';
import { View } from 'remax/wechat';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { ConTypes } from '@/components/CustomForm/controlTypes';
// import SectionHeader from '@/components/SectionHeader';

import styles from '../index.less';

interface IProps {
  // detail data
  formdata: any;
  containers: any[];
  // 是否显示审批
  [index: string]: any;
}


class FormDetail extends PureComponent<IProps> {
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

  lawfulValues = (value) => {
    return !(value === null || value === undefined || (Array.isArray(value) && value.length === 0))
  }

  getFormItem = data => {
    const { formdata } = this.props;
    const {
      extraProps: { referenceField },
      controlCode,
      controlType,
      controlLabel,
      controlId,
      comment
    } = data;
    if (referenceField) {
      const observerextraprops = this.getObserverExtraProps(referenceField);
      data.observerextraprops = observerextraprops;
    }
    let labelwrap = false
    switch (data.controlType) {
      case ConTypes.SUBTABLE:
      case ConTypes.RelationData:
      case ConTypes.IMAGEUPLOADER:
      case ConTypes.FILEUPLOADER:
      case ConTypes.INVOICE:
        labelwrap = true
        break;
      default:
        break;
    }
    return (
      this.lawfulValues(formdata[controlCode]) && (<View
        data-id={controlId}
        key={controlId}
        className={`form-info-item controltype${controlType}`}
      >
        <View className="form-info-label">{controlLabel}</View>
        <View className="form-info-value">
          <FormItemData data={data} formdata={formdata} />
        </View>
      </View>)
    );
  };

  getForms = (containers = []) => {
    const { formdata } = this.props;
    return containers.reduce((acc, container, currentIndex) => {
      const forms = container.controls.map(item => {
        const data = { ...item };
        const formItem = this.getFormItem(data);
        return formItem;
      });
      // 详情默认添加创建人和创建时间
      if (currentIndex === 0) {
        forms.push(
          <> {formdata.creatorName && <View key="creatorName" className="form-info-item">
            <View className="form-info-label">创建人</View>
            <View className="form-info-value">{formdata.creatorName}</View>
          </View>}
            {formdata.createTime && <View key="creatorTime" className="form-info-item">
              <View className="form-info-label">创建时间</View>
              <View className="form-info-value">{formdata.createTime}</View>
            </View>}
            {formdata.sendUsers && (
              <View key="sendUsers" className="form-info-item">
                <View className="form-info-label">抄送人</View>
                <View className="form-info-value">
                  {JSON.parse(formdata.sendUsers)
                    .map(item => item.name)
                    .join(',')}
                </View>
              </View>
            )}
          </>
        );
      }

      const formContainer = (
        <View
          key={container.containerId}
          className="containers"
          style={{
            justifyContent: container.justifyContent,
            textAlign: container.align || 'left',
          }}
        >
          <View className="form-container-content">{forms}</View>
        </View>
      );
      return acc.concat(formContainer);
    }, []);
  };

  render() {
    const { containers, children } = this.props;
    const forms = this.getForms(containers);
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          margin: 0,
        }}
        className={styles.formDetailContainer}
      >
        {forms}
        {children}
      </View>
    );
  }
}
export default (FormDetail);
