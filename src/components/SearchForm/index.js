import React, { useState } from 'react';
import { Button, Form, SearchBar } from 'annar';
import { View } from "remax/wechat"

import Layer from '@/components/Layer';

/**
 * 公共列表查询组件
 * @author hmy
 *
 * @param searchArr     搜索条件
 * @param submit        提交搜索
 * @param clear         重置
 * @param exportData    导出数据
 * @param exportStr     导出操作文案
 * @param loading
 */
function SearchForm(props) {
  const { searchArr = [], submit, reset, exportData, exportStr, loading, children } = props;
  const [visible, setVisible] = useState(false)
  const [formRef] = Form.useForm()
  const handleSubmit = values => {
    submit(values);
    setVisible(false);
  };

  const handleReset = () => {
    formRef.resetFields();
    reset();
    setVisible(false);
  };

  const handleExport = e => {
    e.preventDefault();
    formRef.validateFields().then(exportData);
  };

  return (
    <>
      <SearchBar
        placeholder="搜索"
        onFocus={() => setVisible(true)}
        hideActionButton
        inputStyle={{
          backgroundColor: '#fff',
          margin: "20px 20px 0"
        }}
      />
      <Layer
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Form onFinish={handleSubmit}>
          {searchArr.map(v => (
            <Form.Item
              key={v.name}
              name={v.name}
              label={v.label}
              rules={v.rules}
            >
              {v.component}
            </Form.Item>
          ))}
          {searchArr.length > 0 && (
            <View style={{ textAlign: 'center', padding: "10px 0" }}>
              {children}
              <Button
                type="primary"
                nativeType="submit"
                loading={loading}
                // icon={<SearchOutlined />}
                style={{ marginLeft: '10px' }}
              >
                查询
                </Button>
              {reset ? (
                <Button
                  style={{ marginLeft: '10px' }}
                  onTap={handleReset}
                  disabled={loading}
                >
                  重置
                </Button>
              ) : null}
              {exportData ? (
                <Button
                  style={{ marginLeft: '10px' }}
                  onTap={handleExport}
                  disabled={loading}
                // icon={<DownloadOutlined />}
                >
                  {exportStr}
                </Button>
              ) : null}
            </View>
          )}
        </Form>
      </Layer>
    </>
  );
}

export default SearchForm;
