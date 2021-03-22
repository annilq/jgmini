import React, { PureComponent } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Form } from 'antd';
import PropTypes from 'prop-types';
import { layerBoxStyle, layerContentStyle, layerFooterStyle } from '@/common/styles/layer';
import styles from './index.less';

const FormItem = Form.Item;

const Tag = ({ color, check, ...rest }) => (
  <div
    {...rest}
    style={{
      backgroundColor: color,
    }}
  >
    {check ? <CheckOutlined style={{ marginTop: '0' }} /> : ''}
  </div>
);

class Edit extends PureComponent {
  colorList = [
    {
      key: 'row11',
      color: '#FF2E2E',
    },
    {
      key: 'row12',
      color: '#FF902E',
    },
    {
      key: 'row13',
      color: '#FFD200',
    },
    {
      key: 'row14',
      color: '#AEFF2E',
    },
    {
      key: 'row15',
      color: '#2EFF55',
    },
    {
      key: 'row16',
      color: '#2EFFD0',
    },
    {
      key: 'row17',
      color: '#2EB8FF',
    },
    {
      key: 'row18',
      color: '#2E5AFF',
    },
    {
      key: 'row19',
      color: '#5F2EFF',
    },

    {
      key: 'row21',
      color: '#C62EFF',
    },
    {
      key: 'row22',
      color: '#FF2EFD',
    },
    {
      key: 'row23',
      color: '#FF4966',
    },
    {
      key: 'row24',
      color: '#68A1C5',
    },
    {
      key: 'row25',
      color: '#0091FF',
    },
    {
      key: 'row26',
      color: '#FF5534',
    },
    {
      key: 'row27',
      color: '#1AAF25',
    },
    {
      key: 'row28',
      color: '#2CA999',
    },
    {
      key: 'row29',
      color: '#CFB212',
    },
  ];

  static propTypes = {
    submit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  };

  state = { color: '' };

  handleSubmit = (values) => {
    const { submit, item } = this.props;
    const { color } = this.state;
    const newColor = color || item.color
    if (newColor === '') {
      return;
    }
    submit({ id: item.id, ...values, color: newColor });
  };

  onChange = color => {
    this.setState({
      color,
    });
  };

  render() {
    const {
      item = {},
      close,
    } = this.props;
    const { color } = this.state;

    return (
      <div style={layerBoxStyle}>
        <Form layout="inline" style={layerContentStyle} onFinish={this.handleSubmit} initialValues={item}>
          <Row gutter={16}>
            <Col span={24}>
              <FormItem name="name" label="任务名称" rules={[{ required: true, message: '请输入任务名称' }]}>
                <Input placeholder="任务名称" />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="" >
                <div className={styles.themeColor}>
                  {this.colorList.map((col, index) => {
                    return (
                      <Tag
                        key={col.key}
                        className={styles.colorBlock}
                        color={col.color}
                        check={color ? (color === col.color) : (item.color === col.color)}
                        onClick={() => this.onChange(col.color)}
                      />
                    );
                  })}
                </div>
              </FormItem>
            </Col>
          </Row>
          <div style={{ ...layerFooterStyle, padding: "10px 0", textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '16px', padding: '0 20px', }}
            >
              提交
            </Button>
            <Button onClick={close} style={{ padding: '0 20px', }}>
              取消
            </Button>
          </div>

        </Form>
      </div>
    );
  }
}

export default Edit;
