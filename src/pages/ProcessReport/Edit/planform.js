import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Switch, message } from 'antd';
import Moment from 'moment';

import { JgDatePicker, JgNumber, TreePicker } from '@/components/CustomForm';
import useRefresh from '@/hooks/useRefresh';

import styles from '@/components/CustomForm/index.less';

import WorkPicker from './WorkPicker';

const FormItem = Form.Item;

function PlanForm(props) {
  const { workList, onSubmit, data, editIndex, remove } = props;
  const [form] = Form.useForm();
  const [work, setWork] = useState({});

  const refresh = useRefresh();
  const { finishWorkload = 0, workload = 0, unit } = work;
  const { workId } = data;

  function onSelect(workdata) {
    if (!workdata) {
      return;
    }
    setWork(workdata);
    const { id, startDate, endDate, actualStartDate, actualEndDate, isOver } = workdata;
    const formdata = {
      workId: id,
      planDate: `${startDate}~${endDate}`,
      isOver,
      actualStartDate,
      actualEndDate,
    };
    form.setFieldsValue(formdata);
    refresh();
  }

  useEffect(
    () => {
      if (workId) {
        const initWork = workList.find(item => item.id === workId);
        const { id, startDate, endDate } = initWork;
        const formdata = {
          workId: id,
          planDate: `${startDate}~${endDate}`,
        };
        form.setFieldsValue({ ...formdata, ...data });
        const newwork = workList.find(curwork => workId === curwork.id);
        onSelect(newwork);
      }
    },
    [workId]
  );

  // 提交数据
  function handleSubmit(formValues) {
    // 防止出现子项
    const { children, ...rest } = work;
    onSubmit({ ...data, ...rest, ...formValues });
  }

  function toggleFinish(value) {
    form.setFieldsValue({ actualEndDate: value ? Moment().format('YYYY-MM-DD') : null });
  }

  function validateFields(fn) {
    form
      .validateFields()
      .then(values => {
        fn(values);
      })
      .catch(err => {
        const { errorFields } = err;
        message.error(errorFields[0].errors.toString());
      });
  }

  return (
    <div className={styles.baseForm}>
      <div style={{ flex: 1 }}>
        <Form layout="horizontal" form={form}>
          <div className="containers">
            <div className="form-container-content">
              <div data-controlCode>
                <FormItem
                  label="工作名称"
                  name="workId"
                  rules={[{ required: true, message: '请选择工作' }]}
                >
                  <WorkPicker onSelect={onSelect} workList={workList || []} />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="计划起止" name="planDate">
                  <Input readOnly />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem
                  label="实际开始"
                  name="actualStartDate"
                  rules={[{ required: true, message: '请选择实际开始时间' }]}
                >
                  <JgDatePicker
                    style={{ width: '100%' }}
                    disabledDate={current => {
                      return current > Moment().endOf('day');
                    }}
                  />
                </FormItem>
              </div>
              <div data-controlCode>
                <Form.Item
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.isOver !== curValues.isOver ||
                    prevValues.actualStartDate !== curValues.actualStartDate
                  }
                >
                  {formInstance => {
                    const { actualStartDate, isOver } = formInstance.getFieldsValue();
                    return (
                      <FormItem
                        label="实际截止"
                        name="actualEndDate"
                        {...isOver && {
                          rules: [{ required: true, message: '请选择实际开始时间' }],
                        }}
                      >
                        <JgDatePicker
                          placeholder="标记计划完成可以选择截止时间"
                          style={{ width: '100%' }}
                          disabledDate={current => {
                            return !(
                              current < Moment().endOf('day') &&
                              current >= Moment(actualStartDate).startOf('day')
                            );
                          }}
                          {...!isOver && { disabled: true }}
                        />
                      </FormItem>
                    );
                  }}
                </Form.Item>
              </div>
              <div data-controlCode>
                <FormItem label="计划总量">
                  {workload}
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="工作量单位">
                  {unit ? <TreePicker
                    extraProps={{
                      url: "/api/v1/system/unit/getAllUnit",
                      parentNodeDisable: true,
                    }}
                    value={unit}
                    readOnly
                    style={{ width: 140 }}
                  /> : "%"}
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="剩余工作量">
                  {workload - finishWorkload}
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="累计完成量">
                  {finishWorkload}
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem
                  className="mutiple"
                  label="本次上报工作量"
                  name="submitAmount"
                  rules={[{ required: true, message: '请填写本次上报工作量' }]}
                >
                  <JgNumber style={{ width: '100%' }} />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="是否完成" name="isOver" valuePropName="checked">
                  <Switch
                    checkedChildren="完成"
                    unCheckedChildren="未完成"
                    onChange={toggleFinish}
                  />
                </FormItem>
              </div>
            </div>
          </div>
          <div className="actionBtns">
            {editIndex !== -1 && (
              <Button
                onClick={() => {
                  remove(editIndex);
                }}
              >
                删除
              </Button>
            )}
            <Button
              style={{
                padding: '0 20px',
                backgroundColor: '#ffa646',
                color: '#fff',
                border: 'none',
              }}
              onClick={() => validateFields(handleSubmit)}
            >
              保存
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PlanForm;
