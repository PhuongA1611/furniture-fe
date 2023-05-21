import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { getMe, loginUser } from '../../../app/AuthSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    try {
      dispatch(loginUser(values)).then(() => {
        dispatch(getMe());
        navigate("/admin/dashboard");
      })
    } catch (error) {
      console.log(error);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='admin-login'>
      <div>
        <h2>Login</h2>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="normal_login"
          className='login-form'
          size='large'
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default AdminLogin
