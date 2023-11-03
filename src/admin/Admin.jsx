import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { AdminHeader, SideMenu } from './components';

import './Admin.scss';

const Admin = () => {
  return (
    <>
      <AdminHeader />
      <Layout style={{ height: '100%', minHeight: '100vh' }}>
        <Sider>
          <SideMenu />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default Admin;
