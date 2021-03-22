// 编辑或者查看详情的时候根据提交的拓展字段中的sysVersionId,versionId字段查表单配置用来显示，没有就不用查了
// 提交数据的时候要在拓展字段exts里面新增sysVersionId,versionId字段方便对拓展字段做版本控制
// 如果是修改sysVersionId,versionId取值来源拓展字段，新增的话取表单配置

import React, { PureComponent } from 'react';

import FormItemData from '@/components/CustomForm/FormItem/detail';

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
    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];
      const control = container.controls.find(item => item.controlCode === referenceField);
      if (control) {
        const { extraProps } = control;
        return extraProps;
      }
    }
  };

  getFormItem = data => {
    const { formdata } = this.props;
    const {
      extraProps: { referenceField },
    } = data;
    if (referenceField) {
      const observerextraprops = this.getObserverExtraProps(referenceField);
      data.observerextraprops = observerextraprops;
    }

    return (
      <div
        data-id={data.controlId}
        key={data.controlId}
        data-controltype={data.controlType}
        className="form-info-item"
      >
        <div className="form-info-label">{data.controlLabel}</div>
        <div className="form-info-value">
          <FormItemData data={data} formdata={formdata} />
        </div>
      </div>
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
          <div key="creatorName" className="form-info-item">
            <div className="form-info-label">创建人</div>
            <div className="form-info-value">{formdata.creatorName}</div>
          </div>,
          <div key="creatorTime" className="form-info-item">
            <div className="form-info-label">创建时间</div>
            <div className="form-info-value">{formdata.createTime}</div>
          </div>,
          formdata.sendUsers && (
            <div key="sendUsers" className="form-info-item">
              <div className="form-info-label">抄送人</div>
              <div className="form-info-value">
                {JSON.parse(formdata.sendUsers)
                  .map(item => item.name)
                  .join(',')}
              </div>
            </div>
          )
        );
      }

      const formContainer = (
        <div
          key={container.containerId}
          className="containers"
          style={{
            justifyContent: container.justifyContent,
            textAlign: container.align || 'left',
          }}
        >
          <div className="form-container-content">{forms}</div>
        </div>
      );
      return acc.concat(formContainer);
    }, []);
  };

  render() {
    const { containers, children } = this.props;
    const forms = this.getForms(containers);
    return (
      <div
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
      </div>
    );
  }
}
export default FormDetail;
