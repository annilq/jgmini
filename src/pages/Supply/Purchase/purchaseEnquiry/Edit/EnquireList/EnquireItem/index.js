import React, { Component } from 'react';
import { Input, Row, Col, InputNumber, Button, Form } from 'antd';

import JgDatePicker from '@/components/CustomForm/JgDatePicker';
import DataPicker from '@/components/CustomForm/DataPicker';

import EnquireRecords from './EnquireRecords';
import { layerBoxStyle, layerContentStyle } from '@/common/styles/layer';
import styles from '../../../index.less';

const FormItem = Form.Item;

class EnquireItem extends Component {
  formRef = React.createRef();
  onMaterialChange = record => {
    const { onEnquireChange } = this.props;

    const { name: materialName, id: materialId, specs, unit } = record;
    const { value } = this.props;
    const newData = {
      ...value,
      materialName,
      materialId,
      specs,
      unit,
    };
    onEnquireChange(newData);
    this.formRef.current.setFieldsValue(newData);
  };

  // 单个询价记录数据变化引起询价数据
  onRecordChange = (index, data) => {
    const { onEnquireChange } = this.props;
    const { value } = this.props;
    const { enquiryRecordsList } = value;
    enquiryRecordsList.splice(index, 1, data);
    value.enquiryRecordsList = enquiryRecordsList;
    onEnquireChange(value);
  };

  // 新增询价记录
  onAddRecord = data => {
    const { onEnquireChange } = this.props;
    const { value } = this.props;
    const { enquiryRecordsList } = value;
    enquiryRecordsList.push(data);
    value.enquiryRecordsList = enquiryRecordsList;
    onEnquireChange(value);
  };

  // 删除询价记录
  onRemoveRecord = index => {
    const { onEnquireChange } = this.props;
    const { value } = this.props;
    const { enquiryRecordsList } = value;
    enquiryRecordsList.splice(index, 1);
    value.enquiryRecordsList = enquiryRecordsList;
    onEnquireChange(value);
  };

  // 删除本条数据
  deleteItem = () => {
    const { onDelete } = this.props;
    const { value } = this.props;
    onDelete(value);
  };

  render() {
    const { onEnquireChange } = this.props;
    const { value } = this.props;
    const { enquiryRecordsList = [] } = value;
    return (
      <div style={layerBoxStyle} className={styles.enquireItem}>
        <Form ref={this.formRef}>
          <Row gutter={{ md: 6, lg: 24, xl: 48 }} className="container">
            <Col md={6} sm={24}>
              <FormItem
                name="materialId"
                label="物资名称"
                rules={[{ required: true, message: '请选择物料' }]}
              >
                <DataPicker
                  extraProps={{
                    formCode: 'Material',
                    nameCode: 'materialName',
                  }}
                  form={this.formRef && this.formRef.current}
                  placeholder="物料"
                  formdata={value}
                  onSelect={data => this.onMaterialChange(data)}
                  parentformdata={{ formCode: 'PurchaseEnquiry' }}
                >
                  <Input value={value.materialName} placeholder="物料" />
                </DataPicker>
              </FormItem>
            </Col>

            <Col md={6} sm={24}>
              <FormItem name="specs" label="规格" dependencies={['materialId']}>
                <Input className={styles.inputWidth} readOnly />
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem name="unit" label="单位" dependencies={['materialId']}>
                <Input className={styles.inputWidth} readOnly />
              </FormItem>
            </Col>
            {/* <Col md={6} sm={24}>
                  <FormItem name="planUnitprice" label="计划单价">
                  <InputNumber className={styles.inputWidth} min={0} /
                  </FormItem>
                </Col> */}
            {/* <Col md={6} sm={24}>
                  <FormItem name="enquiryDate" label="询价日期" rules={[{ required: true, message: '请选择询价日期' }]} >
                    <JgDatePicker style={{ width: '100%' }} />
                  </FormItem>
                </Col> */}
            <Col md={6} sm={24}>
              <FormItem
                name="enquiryNum"
                label="询价数量"
                rules={[{ required: true, message: '请选择询价数量' }]}
              >
                <InputNumber className={styles.inputWidth} min={0} />
              </FormItem>
            </Col>
            {/* <Col md={6} sm={24}>
                  <FormItem name="supplierNameOld" label="前次采购厂商">
                   <Input className={styles.inputWidth} />
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem name="needDate" label="需用日期">
                    <JgDatePicker style={{ width: '100%' }} />
                  </FormItem>
                </Col> */}
          </Row>
        </Form>
        <EnquireRecords
          value={enquiryRecordsList}
          onRecordChange={this.onRecordChange}
          onRemoveRecord={this.onRemoveRecord}
          onAddRecord={this.onAddRecord}
        />
        <Button
          type="danger"
          style={{ margin: '10px auto', width: '300px' }}
          onClick={this.deleteItem}
        >
          删除
        </Button>
      </div>
    );
  }
}

export default EnquireItem;
