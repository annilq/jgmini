import React, { PureComponent } from 'react';
import { Input, Col, Row, InputNumber, Checkbox, Form } from 'antd';

import Layer from '@/components/Layer';
import { DataSelecter, JgDatePicker, DataPicker, JgSelect } from '@/components/CustomForm';

import { layerBoxStyle } from '@/common/styles/layer';
import styles from '@/components/CustomForm/index.less';

const FormItem = Form.Item;

class EditRecord extends PureComponent {
  formRef = React.createRef();

  columns = [
    {
      title: '供应商名称',
      render: formdata => {
        return (
          <DataPicker
            extraProps={{
              formCode: 'Supplier',
              nameCode: 'supplierName',
            }}
            formdata={formdata}
            placeholder="供应商"
            style={{ width: '100%' }}
            onSelect={data => this.restMeter(data)}
          />
        );
      },
      nameCode: 'supplierName',
      required: true,
      dataIndex: 'supplierId',
    },
    {
      title: '供应商地址',
      render: <Input />,
      display: false,
      dataIndex: 'supplierName',
    },
    {
      title: '供应商地址',
      render: <Input />,
      required: true,
      dataIndex: 'supplierAddress',
    },
    {
      title: '联系人',
      render: <Input />,
      required: true,

      dataIndex: 'contact',
    },
    {
      title: '联系电话',
      render: <Input />,
      required: true,
      dataIndex: 'mobile',
    },

    {
      title: '不含税单价',
      render: <InputNumber min={0} />,
      required: true,
      dataIndex: 'taxFreePrice',
    },
    {
      title: '不含税金额',
      render: <InputNumber min={0} />,
      required: true,
      dataIndex: 'taxFreeAmount',
    },
    {
      title: '税率',
      render: <InputNumber min={0} />,
      required: true,
      dataIndex: 'taxRate',
    },
    {
      title: '税金',
      render: <InputNumber min={0} />,
      required: true,
      dataIndex: 'rate',
    },
    {
      title: '包含税单价',
      render: <InputNumber min={0} />,
      required: true,
      dataIndex: 'includingTaxPrice',
    },
    {
      title: '包含税金额',
      render: <InputNumber min={0} />,
      required: true,
      dataIndex: 'includingTaxAmount',
    },
    {
      title: '发票类型',
      render: (
        <DataSelecter extraProps={{ flag: 'invoiceTypeMap', type: 2 }} store={window.g_app._store}>
          {(candidates, rest) => {
            return (
              <JgSelect data={candidates} placeholder="请选择发票类型" {...rest} />
            );
          }}
        </DataSelecter>
      ),
      required: true,
      dataIndex: 'invoiceType',
    },

    {
      title: '送货日期',
      render: <JgDatePicker />,
      dataIndex: 'deliveryDate',
    },
    {
      title: '品牌',
      render: <Input />,
      dataIndex: 'brand',
    },
    {
      title: '质量标准',
      render: <Input />,
      dataIndex: 'qualityStandard',
    },
    {
      title: '付款条件',
      render: <Input />,
      dataIndex: 'paymentTerm',
    },
    {
      title: '备注',
      render: <Input />,
      dataIndex: 'remark',
    },
    {
      title: '推荐供应商',
      render: record => {
        return <Checkbox checked={record.isSelected} />;
      },
      dataIndex: 'isSelected',
    },
  ];

  restMeter = record => {
    const { form } = this.props;
    const { id, name, address, contact, mobile, email } = record;
    const formKeys = {
      supplierId: id,
      supplierName: name,
      supplierAddress: address,
      contact,
      mobile,
      email,
    };
    // 设置关联值
    this.formRef.current.setFieldsValue(formKeys);
  };

  handleSubmit = values => {
    const { editable, onConfirm, onCancel } = this.props;
    if (!editable) {
      onCancel();
      return;
    }
    onConfirm(values);
  };

  render() {
    const { onCancel, value, visible, editable } = this.props;
    let Items;
    if (editable) {
      Items = (
        <Form
          onFinish={this.handleSubmit}
          className="form-container-content"
          ref={this.formRef}
          initialValues={value}
        >
          <div className="containers">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              {this.columns.map(item => {
                const { title, dataIndex, nameCode, render: Render } = item;
                return (
                  <Col
                    md={12}
                    sm={24}
                    key={dataIndex}
                    style={{ display: item.display === false ? 'none' : 'block' }}
                  >
                    <FormItem
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues[dataIndex] !== curValues[dataIndex]
                      }
                    >
                      {formInstance => {
                        return (
                          <>
                            <FormItem
                              label={title}
                              name={dataIndex}
                            // rules={item.required && [{ required: true, message: `请输入${title}` }]}
                            >
                              {typeof Render === 'function'
                                ? Render({ ...value, ...formInstance.getFieldsValue() })
                                : Render}
                            </FormItem>
                            {nameCode && (
                              <FormItem name={nameCode} style={{ display: 'none' }}>
                                <span />
                              </FormItem>
                            )}
                          </>
                        );
                      }}
                    </FormItem>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Form>
      );
    } else {
      Items = this.columns.map(item => (
        <div
          className={styles['form-info-item']}
          key={item.dataIndex}
          style={{ display: item.display === false ? 'none' : 'block' }}
        >
          <div className={styles['form-info-label']}>{item.title}</div>
          <div className={styles['form-info-value']}>{value[item.nameCode || item.dataIndex]}</div>
        </div>
      ));
    }
    return (
      <Layer
        title="询价记录"
        visible={visible}
        onOk={() => this.formRef.current.validateFields().then(this.handleSubmit)}
        onClose={onCancel}
        width="80vw"
      >
        <div style={layerBoxStyle}>
          <div className={styles.baseForm}>
            {Items}
          </div>
        </div>
      </Layer>
    );
  }
}
export default EditRecord;
