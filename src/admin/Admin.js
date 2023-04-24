import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { AdminHeader, SideMenu } from './components'

import './Admin.scss'

const Admin = () => {
  return (
    <>
      <AdminHeader />
      <Layout style={{height:"100%", minHeight:"100vh"}}>
        <Sider>
          <SideMenu />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>

    </>
  )
}

export default Admin
