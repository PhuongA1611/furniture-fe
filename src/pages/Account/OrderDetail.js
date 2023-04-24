import React from 'react';
import { Table } from 'react-bootstrap';
import userImg from "../../assets/images/avatar-user.jpg";
import './Account.scss';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  return (
    <div className='account__order'>
      <div className='account__order__heading'>
        <p>Order <mark>#14802</mark> was placed on <mark>April 9, 2023</mark> and is currently <mark>On hold</mark>.</p>
        <h2>Order details</h2>
        <div className='account__order__detail'>
          <Table className='table-detail'>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className='account__order__product'>
                  <img src={userImg} />
                  <Link to="/shop">Briarwood Decorative 2</Link>
                  <strong>× 1</strong>
                </div></td>
                <td><span>$25</span></td>
              </tr>
              <tr>
                <td><div className='account__order__product'>
                  <Link to="/shop"><img src={userImg} /></Link>
                  <Link to="/shop">Briarwood Decorative 2</Link>
                  <strong>× 1</strong>
                </div></td>
                <td><span>$25</span></td>
              </tr>
              <tr>
                <th>Subtotal:</th>
                <td><span>$50.00</span></td>
              </tr>
              <tr>
                <th>Shipping:</th>
                <td><span>Free shipping</span></td>
              </tr>
              <tr>
                <th>Total:</th>
                <td><span>$50.00</span></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className='account__order__address'>
          <h3>Shipping address</h3>
          <address>phuong tran <br />
            kkk<br />
            12344<br />
            hn<br />
            Vietnam</address>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
