import React from 'react';
import { Link } from 'react-router-dom';

import './Account.scss';

const Address = () => {
  return (
    <div className='account__address'>
      <div className='account__address__heading'>
        <p>The following addresses will be used on the checkout page by default.</p>
        <Link to="new-address">Add New Address</Link>
      </div>
      <div className='account__address__container'>
        <div className='account__address__item'>
          <div className='account__address__item__heading'>
            <h3>Shipping address</h3>
            <Link to="1">Edit</Link>
          </div>
          <div className='account__address__item__content'>
            <address>phuong tran<br />
              kkk<br />
              12344<br />
              hn<br />
              Vietnam</address>
          </div>
        </div>
        <div className='account__address__item'>
          <div className='account__address__item__heading'>
            <h3>Shipping address</h3>
            <Link to="2">Edit</Link>
          </div>
          <div className='account__address__item__content'>
            <address>phuong tran<br />
              kkk<br />
              12344<br />
              hn<br />
              Vietnam</address>
          </div>
        </div>
        <div className='account__address__item'>
          <div className='account__address__item__heading'>
            <h3>Shipping address</h3>
            <Link to="3">Edit</Link>
          </div>
          <div className='account__address__item__content'>
            <address>phuong tran<br />
              kkk<br />
              12344<br />
              hn<br />
              Vietnam</address>
          </div>
        </div>
        <div className='account__address__item'>
          <div className='account__address__item__heading'>
            <h3>Shipping address</h3>
            <Link to="4">Edit</Link>
          </div>
          <div className='account__address__item__content'>
            <address>phuong tran<br />
              kkk<br />
              12344<br />
              hn<br />
              Vietnam</address>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Address
