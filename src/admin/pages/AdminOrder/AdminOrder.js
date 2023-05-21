import React, { useEffect, useState } from 'react'
import { ElementLayout } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { getListBanner } from '../../../app/bannerSlice';
import { getAllOrder, updateStatus } from '../../../app/orderSlice';
import { Button, Modal, Popover, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router-dom';

const AdminOrder = () => {
  const dispatch = useDispatch();

  const list = useSelector(state => state.order.allOrder);
  const [total, setTotal] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaldata, setmodaldata] = useState([]);
  const [change, setChange] = useState(0);
  const pageSize = 15;

  useEffect(() => {
    try {
      const params = {
        limit: pageSize,
        page: pageCurrent,
      }
      dispatch(getAllOrder(params)).unwrap().then(data => {
        setTotal(data.total);
      });
    } catch (error) {
      console.log(error);
    }
  }, [pageCurrent, change])

  const onChange = current => {
    setPageCurrent(current);
  }

  const showModal = (id) => {
    // console.log(id);
    setmodaldata(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeStatus = (status) => {
    const params = {
      status: status,
      orderId: modaldata
    }
    try {
      dispatch(updateStatus(params)).then(() => {
        setChange(change + 1)
        setIsModalVisible(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='my-4 mx-5 admin-order'>
      <h2 className='admin-heading'>List Order</h2>
      {list && <Table
        dataSource={list}
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange: onChange
        }}
      >
        <Column
          title="Index"
          key="index"
          render={(value, item, index) => (pageCurrent - 1) * pageSize + index + 1}
        />
        <Column
          title="Code"
          key="id"
          dataIndex="id"
          render={(_, record) => (
            "#" + record.id
          )}
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
            <Button type="primary" onClick={() => showModal(record.id)}>
              Change
            </Button>
          )}
        />
        <Column
          title=""
          key="action"
          render={(_, record) => (
            <Link to={``+record.id}>View</Link>
          )}
        />
      </Table>}
      <Modal
        title="Change Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space className='my-5'>
          <Button className='btn-status btn-pending' onClick={() => changeStatus("pending")}>
            pending
          </Button>
          <Button className='btn-status btn-processing' onClick={() => changeStatus("processing")}>
            processing
          </Button>
          <Button className='btn-status btn-completed' onClick={() => changeStatus("completed")}>
            completed
          </Button>
          <Button className='btn-status btn-cancelled' onClick={() => changeStatus("cancelled")}>
            cancelled
          </Button>
        </Space>
      </Modal>
    </div>
  )
}

export default AdminOrder
