import {
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {
  Link,
  Outlet,
  // Redirect,
} from 'react-router-dom';
// import './style.css';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};
const items: MenuItem[] = [
  getItem(<Link to='/admin/overview'>Overview</Link>, '1', <UnorderedListOutlined></UnorderedListOutlined>),
  getItem(<Link to='/admin/customers'>Customer Manager</Link>, '2', <UnorderedListOutlined></UnorderedListOutlined>),
  getItem(<Link to='/admin/datasets'>Dataset Manager</Link>, '3', <UnorderedListOutlined />),
  getItem(<Link to='/admin/campaigns'>Campaign Manager</Link>, '4', <UnorderedListOutlined />),
  getItem(<Link to='/admin/banners'>Banner Manager</Link>, '5', <UnorderedListOutlined />),
  getItem(<Link to='/admin/urls'>Url Manager</Link>, '6', <UnorderedListOutlined />),
];
const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>

          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Admin;