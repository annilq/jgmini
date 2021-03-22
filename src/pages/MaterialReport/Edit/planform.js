import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';

import { JgNumber } from '@/components/CustomForm';
import useRefresh from '@/hooks/useRefresh';

import styles from '@/components/CustomForm/index.less';

import MaterialPicker from './MaterialPicker';

const FormItem = Form.Item;

function PlanForm(props) {
  const { detailList, onSubmit, data, editIndex, remove } = props;
  const [form] = Form.useForm();
  const [material, setMaterial] = useState({});

  const refresh = useRefresh();
  const { useNum = 0, planNum = 0 } = material;
  const { materialId } = data;

  function onSelect(materialdata) {
    if (!materialdata) {
      return;
    }
    setMaterial(materialdata);
    const { id, useNum, planNum, specs, unit, recordNo } = materialdata;
    const formdata = {
      materialId: id,
      useNum,
      planNum,
      specs,
      unit,
      recordNo
    };
    form.setFieldsValue(formdata);
    refresh();
  }

  useEffect(
    () => {
      if (materialId) {
        const initMaterial = detailList.find(item => item.id === materialId);
        const { id } = initMaterial;
        const formdata = {
          materialId: id,
        };
        form.setFieldsValue({ ...formdata, ...data });
        const newmaterial = detailList.find(curmaterial => materialId === curmaterial.id);
        onSelect(newmaterial);
      }
    },
    [materialId]
  );

  // 提交数据
  function handleSubmit(formValues) {
    // 防止出现子项
    const { children, ...rest } = material;
    onSubmit({ ...data, ...rest, ...formValues });
  }

  function onChangeHandle(submitAmount) {
    const initState = form.getFieldsValue();
    const formdata = getRelateData(submitAmount);
    form.setFieldsValue({ ...initState, ...formdata });
  }

  function getRelateData(submitAmount) {
    const finishRate = planNum && (submitAmount + (useNum || 0)) / planNum;
    const formdata = {
      finishRate: finishRate > 1 ? 1 : Number(finishRate).toFixed(2),
    };
    return formdata;
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
        <Form layout="horizontal" form={form} onFinish={handleSubmit}>
          <div className="containers">
            <div className="form-container-content">
              <div data-controlCode>
                <FormItem
                  label="物料或设备名称"
                  name="materialId"
                  rules={[{ required: true, message: '请选择物料或设备名称' }]}
                >
                  <MaterialPicker onSelect={onSelect} detailList={detailList || []} />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="物料编码" name="recordNo">
                  <Input readOnly />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="规格型号" name="specs">
                  <Input readOnly />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="单位" name="unit">
                  <Input readOnly />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="总量" name="planNum">
                  <Input readOnly />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem
                  label="本次提交量"
                  name="submitAmount"
                  rules={[{ required: true, message: '请填写本次提交量' }]}
                >
                  <JgNumber style={{ width: '100%' }} onChange={onChangeHandle} />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="已使用量" name="useNum">
                  <Input readOnly />
                </FormItem>
              </div>
              <div data-controlCode>
                <FormItem label="完成度" name="finishRate">
                  <InputNumber
                    min={0}
                    max={1}
                    step={0.01}
                    precision={2}
                    formatter={value => {
                      console.log(value);
                      // return `${Number(value).toFixed(2) * 100}%`
                      return `${(Number(value) * 100).toFixed(0)}%`;
                    }}
                    parser={value => {
                      console.log(value);
                      return value.replace('%', '');
                    }}
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
