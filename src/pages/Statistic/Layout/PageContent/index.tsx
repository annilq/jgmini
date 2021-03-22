import React from 'react';
import { Card, Breadcrumb } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import router from 'umi/router';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

interface Iprops {
  title: string;
  children: React.ReactElement
}

function Layout(props: Iprops) {
  const { title = "详情", children } = props;
  return (
    <Card
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div style={{ display: "flex", "padding": "12px 16px 0px", "color": "rgb(122, 122, 122)" }}>
        <Breadcrumb style={{ flex: 1 }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/report">智慧统计</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <a
          onClick={() => {
            router.goBack();
          }}
        >
          <CloseOutlined />
        </a>
      </div>
      <div
        style={{
          padding: '16px',
        }}
      >
        <GridContent>
          {children}
        </GridContent>
      </div>
    </Card>
  );

}

export default Layout;
