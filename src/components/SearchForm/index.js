import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'antd';
import styles from '@/common/styles/tableList.less';

/**
 * 公共列表查询组件
 * @author hmy
 *
 * @param searchArr     搜索条件
 * @param submit        提交搜索
 * @param clear         重置
 * @param exportData    导出数据
 * @param exportStr     导出操作文案
 * @param form
 * @param loading
 */
@Form.create()
class SearchForm extends PureComponent {
  static propTypes = {
    searchArr: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, submit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        submit(values);
      }
    });
  };

  handleReset = () => {
    const { form, reset } = this.props;
    form.resetFields();
    reset();
  };

  handleExport = e => {
    e.preventDefault();

    const { form, exportData } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        exportData(values);
      }
    });
  };

  render() {
    const {
      searchArr = [],
      reset,
      exportData,
      exportStr,
      form: { getFieldDecorator },
      loading,
      children,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 12, xl: 16 }}>
          {searchArr.map(v => (
            <Col md={3} sm={24} key={v.name}>
              <Form.Item label={v.label}>
                {getFieldDecorator(v.name, {
                  initialValue: v.initialValue,
                  rules: v.rules,
                })(v.component)}
              </Form.Item>
            </Col>
          ))}
          {searchArr.length > 0 && (
            <Col md={3} sm={24}>
              <span className={styles.submitButtons}>
                {children}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon="search"
                  style={{ marginLeft: '10px' }}
                >
                  查询
                </Button>
                {reset ? (
                  <Button
                    style={{ marginLeft: '10px' }}
                    onClick={this.handleReset}
                    disabled={loading}
                  >
                    重置
                  </Button>
                ) : null}
                {exportData ? (
                  <Button
                    style={{ marginLeft: '10px' }}
                    onClick={this.handleExport}
                    disabled={loading}
                    icon="download"
                  >
                    {exportStr}
                  </Button>
                ) : null}
              </span>
            </Col>
          )}
        </Row>
      </Form>
    );
  }
}

export default SearchForm;
