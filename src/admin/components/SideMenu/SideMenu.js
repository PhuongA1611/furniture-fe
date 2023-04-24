import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './SideMenu.scss'

const SideMenu = () => {
  const items = [
    { key: '1', label: <NavLink to='/admin/dashboard'>Dashboard</NavLink>, },
    { key: '4', label: <NavLink to='/admin/slider'>Slider</NavLink>, },
    { key: '2', label: <NavLink to='/admin/category'>Category</NavLink>, },
    {
      key: '3', label: 'Product',
      children: [
        { key: '31', label: <NavLink to='/admin/products/add'>Add New Product</NavLink>, },
        { key: '32', label: <NavLink to='/admin/products/manage'>Manage Products</NavLink>, },
      ],
    },
    { key: '5', label: <NavLink to='/admin/banner'>Banner</NavLink>, },
    { key: '6', label: <NavLink to='/admin/order'>Order</NavLink>, },
    { key: '7', label: <NavLink to='/admin/user'>User</NavLink>, },
    // { key: '7', label: <NavLink to='/admin/user'>Admin</NavLink>, },
  ]
  // const onClick = (e) => {
  //   console.log('click ', e);
  //   // navigate('/photos')
  // };
  return (
    <div className='side-menu'>
      <Menu
      theme='dark'
        // onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      {/* <Menu.Item key="1">Option1</Menu.Item>
        <Menu.Item key="2">Option2</Menu.Item>
      </Menu> */}
    </div>
  )
}

export default SideMenu
