import React, { PureComponent } from 'react';
import { Button, Col, Input, InputNumber, Row, Cascader, Form } from 'antd';
import { layerBoxStyle, layerContentStyle, layerFooterStyle } from '@/common/styles/layer';
import { findParentIdArr } from '@/utils/tree';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

/**
 * 编辑项目类型
 * @author hmy
 *
 */
class Edit extends PureComponent {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    const { item, submit } = this.props;
    submit({
      ...values,
      id: item.id,
      parentId: values.parentId ? values.parentId[values.parentId.length - 1] : undefined, // 取最后一级父节点
    });
  };

  // Cascader需要树状的节点元素(按正确顺序)
  getParentIdArr = () => {
    const { list, item } = this.props;
    const parentIdArr = [];
    if (item.id) {
      findParentIdArr(item.id, list, parentIdArr);
      parentIdArr.reverse();
    }

    return parentIdArr;
  };

  render() {
    const { list = [], item = {}, close } = this.props;

    return (
      <div style={layerBoxStyle}>
        <Form
          layout="vertical"
          style={layerContentStyle}
          initialValues={{ ...item, parentId: this.getParentIdArr() }}
          onFinish={this.handleSubmit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <FormItem label="类型名称" name="name">
                <Input placeholder="请输入类型名称" style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col span={24}>
              <Form.Item label="父级类型" name="parentId">
                <Cascader
                  changeOnSelect
                  options={list}
                  placeholder="父级类型"
                  fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <FormItem label="排序" name="rank">
                <InputNumber placeholder="请输入排序" min={0} style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="备注" name="remark">
                <Input.TextArea placeholder="备注" autosize={{ minRows: 4, maxRows: 4 }} style={{ width: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <div style={layerFooterStyle}>
            <Button onClick={close} style={{ marginRight: '16px', padding: '0 20px',  }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" style={{ padding: '0 20px',  }}>
              提交
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Edit;
