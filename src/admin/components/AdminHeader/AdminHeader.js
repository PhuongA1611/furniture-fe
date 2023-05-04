import React from 'react'
import { Avatar } from 'antd'
import './AdminHeader.scss'
import { useSelector } from 'react-redux';

const AdminHeader = () => {
  const { current} = useSelector(state => state.auth);
  
  console.log(current);
  
  return (
    <div className='admin-header'>
      <h1><span>N</span>ordic</h1>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
    </div>
  )
}

export default AdminHeader
