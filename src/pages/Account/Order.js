import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Account.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getListOrder } from '../../app/OrderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [listOrder, setListOrder] = useState(null);

  useEffect(() => {
    if (userId) {
      try {
        const params = {
          userId: userId,
          page: 1,
          limit: 15,
          sortBy: "desc",
        }
        dispatch(getListOrder(params)).unwrap().then(data => setListOrder(data.data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [userId]);

  console.log(listOrder);

  const convertDate = (stringDate) => {
    const date = new Date(stringDate);
    const dateTime = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();

    return dateTime;
  }

  return (
    <div className='account__order'>
      {
        (listOrder && listOrder.length !== 0) ?
          <Table className='table-order' responsive>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>status</th>
                <th>shipping</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                listOrder.map((order, index) => (
                  <tr key={index}>
                    <td><Link to={`` + order.id}>#{order.id}</Link></td>
                    <td><span>{convertDate(order.created_at)}</span></td>
                    <td><span>{order.status}</span></td>
                    <td><span>{order.shipping.fullName + `, ` + order.shipping.address}</span></td>
                    <td><Link to={`` + order.id}>View</Link></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          : <div className='account__order__none'>
            <div className='main-notice'>
              <p>No order has been made yet.</p>
            </div>
            <Link to="/shop" className='main-return'>Return to shop</Link>
          </div>
      }
    </div>
  )
}

export default Order
