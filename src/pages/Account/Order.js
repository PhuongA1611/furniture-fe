import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Account.scss'

const Order = () => {
  return (
    <div className='account__order'>
      <Table className='table-order' responsive>
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>status</th>
            <th>total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link to="1">#14802</Link></td>
            <td><span>April 9, 2023</span></td>
            <td><span>On hold</span></td>
            <td><span>$50.00 for 2 items</span></td>
            <td><Link to="1">View</Link></td>
          </tr>
          <tr>
            <td><Link to="1">#14802</Link></td>
            <td><span>April 9, 2023</span></td>
            <td><span>On hold</span></td>
            <td><span>$50.00 for 2 items</span></td>
            <td><Link to="1">View</Link></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Order
