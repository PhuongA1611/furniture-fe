import { ContainerOutlined, DollarOutlined, FileSyncOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrder, updateStatus } from '../../../app/OrderSlice';
import { getReport } from '../../../app/ReportSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const list = useSelector((state) => state.order.allOrder);
  const [change, setChange] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaldata, setmodaldata] = useState([]);

  useEffect(() => {
    try {
      dispatch(getReport())
        .unwrap()
        .then((data) => setData(data.data));

      const params = {
        limit: 15,
        page: 1,
        sortBy: 'desc',
      };
      dispatch(getAllOrder(params)).unwrap().then();
    } catch (error) {
      console.log(error);
    }
  }, [change]);

  const showModal = (id) => {
    // console.log(id);
    setmodaldata(id);
    setIsModalVisible(true);
  };

  const changeStatus = (status) => {
    const params = {
      status: status,
      orderId: modaldata,
    };
    try {
      dispatch(updateStatus(params)).then(() => {
        setChange(change + 1);
        setIsModalVisible(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="dashboard my-4 mx-5">
      <Card>
        <Row gutter={16}>
          <Col span={9}>
            <div className="dashboard-h6">
              <h4>Start adding products</h4>
              <p>Complete the following steps to sell</p>
            </div>
          </Col>
          <Col span={5}>
            <Link to="/admin/category">
              <Card bordered={false} bodyStyle={{ backgroundColor: 'rgb(216,240,227)', borderRadius: 8 }}>
                <div className="dashboard-add-content">
                  <h6>1. Add category</h6>
                  <p>FIll in category information</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="/admin/products/add">
              <Card bordered={false} bodyStyle={{ backgroundColor: 'rgb(229,238,255)', borderRadius: 8 }}>
                <div className="dashboard-add-content">
                  <h6>2. Upload a product</h6>
                  <p>Fill in product information</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="/admin/products/manage">
              <Card bordered={false} bodyStyle={{ backgroundColor: 'rgb(238,230,255)', borderRadius: 8 }}>
                <div className="dashboard-add-content">
                  <h6>3. Manage products</h6>
                  <p>Select a product to edit</p>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card className="my-3" style={{ paddingTop: 10 }}>
        <h5>Today's data</h5>
        {data && (
          <Row gutter={16} className="my-4">
            <Col span={6}>
              <Card bordered={false} bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}>
                <div className="dashboard-info">
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
              <Card bordered={false} bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}>
                <div className="dashboard-info">
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
              <Card bordered={false} bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}>
                <div className="dashboard-info">
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
              <Card bordered={false} bodyStyle={{ backgroundColor: '#f5f5f9', borderRadius: 8 }}>
                <div className="dashboard-info">
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
        )}

        {list && (
          <Table dataSource={list} pagination={false}>
            <Column title="Index" key="index" render={(value, item, index) => index + 1} />
            <Column
              title="Status"
              // dataIndex="status"
              key="status"
              render={(_, record) => <span className={`status` + ` ` + record.status}>{record.status}</span>}
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
                <Button type="primary" onClick={() => showModal(record.id)}>
                  Change
                </Button>
              )}
            />
            <Column title="" key="action" render={(_, record) => <Link to={`/admin/order/` + record.id}>View</Link>} />
          </Table>
        )}
      </Card>
      <Modal title="Change Status" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Space className="my-5">
          <Button className="btn-status btn-pending" onClick={() => changeStatus('pending')}>
            pending
          </Button>
          <Button className="btn-status btn-processing" onClick={() => changeStatus('processing')}>
            processing
          </Button>
          <Button className="btn-status btn-completed" onClick={() => changeStatus('completed')}>
            completed
          </Button>
          <Button className="btn-status btn-cancelled" onClick={() => changeStatus('cancelled')}>
            cancelled
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default Dashboard;
