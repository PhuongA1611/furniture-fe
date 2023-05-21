import { Button, Card, Col, Row, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  DollarOutlined,
  TeamOutlined,
  ContainerOutlined,
  FileSyncOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getReport } from '../../../app/reportSlice';
import { getAllOrder, updateStatus } from '../../../app/orderSlice';
import Column from 'antd/es/table/Column';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const list = useSelector(state => state.order.allOrder);
  const [change, setChange] = useState(0);

  useEffect(() => {
    try {
      dispatch(getReport()).unwrap().then((data) => setData(data.data));

      const params = {
        limit: 15,
        page: 1,
        sortBy: "desc",
      }
      dispatch(getAllOrder(params)).unwrap().then();
    } catch (error) {
      console.log(error);
    }
  }, [change]);

  const handleStatus = (id, status) => {
    if (status !== "pending") {
      const params = {
        status: "pending",
        orderId: id
      }
      try {
        dispatch(updateStatus(params)).then(() => {
          setChange(change + 1)
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const params = {
        status: "processing",
        orderId: id
      }
      try {
        dispatch(updateStatus(params)).then(() => {
          setChange(change + 1)
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='dashboard my-4 mx-5'>
      <Card>
        <Row gutter={16}>
          <Col span={9}>
            <div className='dashboard-h6'>
              <h4>Start adding products</h4>
              <p>Complete the following steps to sell</p>
            </div>
          </Col>
          <Col span={5}>
            <Link to="/admin/category">
              <Card bordered={false}
                bodyStyle={{ backgroundColor: 'rgb(216,240,227)', borderRadius: 8 }}
              >
                <div className='dashboard-add-content'>
                  <h6>1. Add category</h6>
                  <p>FIll in category information</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="/admin/products/add">
              <Card bordered={false}
                bodyStyle={{ backgroundColor: 'rgb(229,238,255)', borderRadius: 8 }}
              >
                <div className='dashboard-add-content'>
                  <h6>2. Upload a product</h6>
                  <p>Fill in product information</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="/admin/products/manage">
              <Card bordered={false}
                bodyStyle={{ backgroundColor: 'rgb(238,230,255)', borderRadius: 8 }}
              >
                <div className='dashboard-add-content'>
                  <h6>3. Manage products</h6>
                  <p>Select a product to edit</p>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card
        className='my-3'
        style={{ paddingTop: 10 }}
      >
        <h5>Today's data</h5>
        {
          data &&
          <Row gutter={16} className='my-4'>
            <Col span={6}>
              <Card bordered={false}
                bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}
              >
                <div className='dashboard-info'>
                  <div>
                    <p>Payment Amount</p>
                    <h3>{data.paymentAmount}</h3>
                  </div>
                  <DollarOutlined
                    style={{
                      fontSize: '40px',
                    }}
                  />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}
                bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}
              >
                <div className='dashboard-info'>
                  <div>
                    <p>Payment Order</p>
                    <h3>{data.paymentOrder}</h3>
                  </div>
                  <ContainerOutlined
                    style={{
                      fontSize: '40px',
                    }}
                  />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}
                bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}
              >
                <div className='dashboard-info'>
                  <div>
                    <p>Pending Order</p>
                    <h3>{data.pendingOrder}</h3>
                  </div>
                  <FileSyncOutlined
                    style={{
                      fontSize: '40px',
                    }}
                  />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}
                bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}
              >
                <div className='dashboard-info'>
                  <div>
                    <p>Paying Customer</p>
                    <h3>{data.paymentUser}</h3>
                  </div>
                  <TeamOutlined
                    style={{
                      fontSize: '40px',
                    }}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        }

        {
          list &&
          <Table
            dataSource={list}
            pagination={false}
          >
            <Column
              title="Index"
              key="index"
              render={(value, item, index) => index + 1}
            />
            <Column title="Status"
              // dataIndex="status"
              key="status"
              render={(_, record) => (
                <span className={`status` + ` ` + record.status}>{record.status}</span>
              )}
            />
            <Column title="Date" dataIndex="date" key="date" />
            <Column title="Price" dataIndex="totalPrice" key="totalPrice" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
              title=""
              key="action"
              render={(_, record) => (
                <Button type="primary" onClick={() => handleStatus(record.id, record.status)}>
                  Change
                </Button>
              )}
            />
            <Column
              title=""
              key="action"
              render={(_, record) => (
                <Link to={`/admin/order/` + record.id}>View</Link>
              )}
            />
          </Table>
        }
      </Card>
    </div>
  )
}

export default Dashboard
