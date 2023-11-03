import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const items = [
  { key: '1', label: <NavLink to="/admin/dashboard">Dashboard</NavLink>, path: '/admin/dashboard' },
  { key: '4', label: <NavLink to="/admin/slider">Slider</NavLink>, path: '/admin/slider' },
  { key: '2', label: <NavLink to="/admin/category">Category</NavLink>, path: '/admin/category' },
  {
    key: '3',
    label: 'Product',
    children: [
      { key: '31', label: <NavLink to="/admin/products/add">Add New Product</NavLink>, path: '/admin/products/add' },
      {
        key: '32',
        label: <NavLink to="/admin/products/manage">Manage Products</NavLink>,
        path: '/admin/products/manage',
      },
    ],
  },
  { key: '5', label: <NavLink to="/admin/banner">Banner</NavLink>, path: '/admin/banner' },
  { key: '6', label: <NavLink to="/admin/order">Order</NavLink>, path: '/admin/order' },
  { key: '7', label: <NavLink to="/admin/user">User</NavLink>, path: '/admin/user' },
];

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let initialKey;
  items.forEach((item) => {
    if (item.path && location.pathname.startsWith(item.path)) {
      console.log(item.key);
      initialKey = item.key;
    } else {
      if (item.children) {
        const child = item.children.find((child) => location.pathname.startsWith(child.path));
        if (child) {
          initialKey = child.key;
        }
      }
    }
  });

  const [selectedKey, setSelectedKey] = useState(initialKey);
  useEffect(() => {
    setSelectedKey(initialKey);
  }, [location]);

  const onClickMenu = (current) => {
    let clicked;
    items.forEach((item) => {
      if (item.path && item.key === current.key) {
        clicked = item.path;
      } else {
        if (item.children && item.children.find((child) => child.key === current.key)) {
          clicked = item.children.find((child) => child.key === current.key).path;
        }
      }
    });
    navigate(clicked);
  };

  return (
    <div className="side-menu">
      <Menu
        theme="dark"
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        onClick={onClickMenu}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SideMenu;
