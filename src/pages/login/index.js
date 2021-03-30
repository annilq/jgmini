import * as React from 'react';
import { Form, Cell, Button, Card } from 'annar';
import { usePageEvent } from 'remax/macro';

import { connect } from "react-redux"
import MD5 from 'crypto-js/md5';

const Login = (props) => {

  const { dispatch } = props
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    const { tenantName, loginName, password } = values
    dispatch({
      type: 'account/login',
      payload: {
        tenantName: tenantName.trim(),
        loginName: loginName.trim(),
        password: MD5(password).toString(),
        originalPassword: password,
        from: 'pc',
      },
      callback() {
        wx.setStorageSync('logininfo', {
          tenantName: tenantName.trim(),
          loginName: loginName.trim(),
          password
        })
        // 获取用户数据
        dispatch({
          type: 'account/userRemote',
        });
        dispatch({
          type: 'global/fetchGlobalConstant',
        });
        dispatch({
          type: 'menu/getMenuData',
          callback(data) {
            wx.setStorageSync('menu', data)
          }
        });
        wx.switchTab({
          url: '/pages/index/index',
        });
      }
    });
  };

  usePageEvent('onShow', () => {
    const user = wx.getStorageSync('logininfo');
    console.log(user);
    form.setFieldsValue(user)
  })

  return (
    <Card contentStyle={{ padding: '20px 0 20px' }}>
      <Form
        onFinish={handleFinish}
        initialValues={wx.getStorageSync('logininfo')}
      // initialValues={{ tenantName: "江西建设", loginName: "小二", password: "123456" }}
      >
        <Form.Item
          noStyle
          name="tenantName"
          rules={[{ required: true, message: '请输入组织名' }]}
        >
          <Cell.Input label="组织名" placeholder="组织名" border={false} />
        </Form.Item>
        <Form.Item
          noStyle
          name="loginName"
          rules={[{ required: true, message: '登录名' }]}
        >
          <Cell.Input label="登录名" placeholder="登录名" border={false} />
        </Form.Item>
        <Form.Item
          noStyle
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Cell.Input label="密码" placeholder="密码" border={false} type="password" />
        </Form.Item>
        <Form.Item noStyle style={{ marginTop: 20, padding: '0 20px' }}>
          <Button type="primary" size="large" shape="square" block nativeType="submit">
            登录
              </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default connect()(Login)