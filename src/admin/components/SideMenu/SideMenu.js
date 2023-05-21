import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const items = [
  { key: '1', label: <NavLink to='/admin/dashboard'>Dashboard</NavLink>, path: '/admin/dashboard' },
  { key: '4', label: <NavLink to='/admin/slider'>Slider</NavLink>, path: '/admin/slider' },
  { key: '2', label: <NavLink to='/admin/category'>Category</NavLink>, path: '/admin/category' },
  {
    key: '3', label: 'Product',
    children: [
      { key: '31', label: <NavLink to='/admin/products/add'>Add New Product</NavLink>, path: '/admin/products/add' },
      { key: '32', label: <NavLink to='/admin/products/manage'>Manage Products</NavLink>, path: '/admin/products/manage' },
    ],
  },
  { key: '5', label: <NavLink to='/admin/banner'>Banner</NavLink>, path: '/admin/banner' },
  { key: '6', label: <NavLink to='/admin/order'>Order</NavLink>, path: '/admin/order' },
  { key: '7', label: <NavLink to='/admin/user'>User</NavLink>, path: '/admin/user' },
  // { key: '7', label: <NavLink to='/admin/user'>Admin</NavLink>, },
]

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let initialKey;
  items.forEach(item => {
    if (item.path && location.pathname.startsWith(item.path)) {
      console.log(item.key);
      initialKey = item.key
    } else {
      if (item.children) {
        const child = item.children.find(child => location.pathname.startsWith(child.path))
        if (child) {
          initialKey = child.key
        }
      }
    }
  })

  // const initialKey = items.find(item => {
  //   if (item.path) {
  //     return location.pathname.startsWith(item.path)
  //   }
  // }) || (items.children && items.children.find(child => location.pathname.startsWith(child.path)))
  console.log("initialKey",initialKey);
  const [selectedKey, setSelectedKey] = useState(initialKey)
  // const onClick = (e) => {
  //   console.log('click ', e);
  //   // navigate('/photos')
  // };

  useEffect(() => {
    setSelectedKey(initialKey)
  }, [location])

  const onClickMenu = (current) => {
    let clicked;
    items.forEach(item => {
      if (item.path && item.key === current.key) {
        clicked = item.path
      } else {
        if (item.children && item.children.find(child => child.key === current.key)) {
          clicked = item.children.find(child => child.key === current.key).path
        }
      }
    })
    navigate(clicked)
  }

  return (
    <div className='side-menu'>
      <Menu
        theme='dark'
        // onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        onClick={onClickMenu}
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
