import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

import SectionHeader from '@/components/SectionHeader';
import FormEditItem from '@/components/CustomForm/FormItem/edit';
import { ConTypes, ValidatorTypes } from '@/components/CustomForm/controlTypes';

const FormItem = Form.Item;

const ExtraFormConfigs = [
  {
    extraProps: { formCode: 'User', nameCode: 'principalName' },
    validators: [{ validatorParam: { require: true }, validatorType: ValidatorTypes.ISREQUIRED }],
    controlLabel: '负责人',
    placeHolder: '负责人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'principalId',
  },
  {
    extraProps: { formCode: 'User', nameCode: 'approverName' },
    validators: [{ validatorParam: { require: true }, validatorType: ValidatorTypes.ISREQUIRED }],
    controlLabel: '审核人',
    placeHolder: '审核人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'approverId',
  },
  {
    extraProps: { formCode: 'User', multiple: true, nameCode: 'participantUserName' },
    controlLabel: '参与人',
    placeHolder: '参与人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'participantUserId',
  },
  {
    extraProps: { formCode: 'User', multiple: true, nameCode: 'copyToUserName' },
    controlLabel: '抄送人',
    placeHolder: '抄送人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'copyToUserId',
  },
];

// 这个组件用来管理任务中项目关联的默认的审批人，抄送人，负责人
function TaskExtra({ dispatch, form, formdata, iseditmode }) {
  // 监听项目，根据项目获取该项目下面的默认负责人等
  const { projectId } = formdata;
  useEffect(
    () => {
      if (projectId) {
        dispatch({
          type: 'task/taskDefaultData',
          payload: { id: projectId },
          callback(defaultData) {
            if (!defaultData) {
              return;
            }
            const {
              copyToUserId,
              copyToUserName,
              participantUserId,
              participantUserName,
              principalId,
              principalName,
              approverId,
              approverName,
            } = defaultData;
            form.setFieldsValue({
              copyToUserId,
              copyToUserName,
              participantUserId,
              participantUserName,
              principalId,
              principalName,
              approverId,
              approverName,
            });
          },
        });
      }
    },
    [projectId]
  );

  return (
    <div className="containers">
      <SectionHeader
        title="相关人"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '20px' }}
      />
      <div className="form-container-content">
        {ExtraFormConfigs.map(config => {
          const { controlCode, controlLabel, validators, extraProps } = config;
          return (
            <div data-controltype={21} key={controlCode} data-controlcode={controlCode}>
              <FormItem
                shouldUpdate={(prevValues, curValues) =>
                  prevValues[controlCode] !== curValues[controlCode]
                }
              >
                {formInstance =>
                  (
                    <FormItem
                      name={controlCode}
                      label={controlLabel}
                      rules={validators && [{ required: true, message: `选择${controlLabel}` }]}
                    >
                      <FormEditItem
                        data={config}
                        form={form}
                        formdata={{ ...formdata, ...formInstance.getFieldsValue() }}
                        iseditmode={iseditmode}
                        formCode="Task"
                      />
                    </FormItem>
                  )
                }
              </FormItem>
              <FormItem name={extraProps.nameCode} style={{ display: 'none' }}>
                <span />
              </FormItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default connect()(TaskExtra);
