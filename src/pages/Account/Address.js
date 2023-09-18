import React from 'react';
import { Link } from 'react-router-dom';

import './Account.scss';
import { ShipCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListShipping } from '../../app/UserSlice';
import { useState } from 'react';

const Address = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [listShipping, setListShipping] = useState(null);

  useEffect(() => {
    try {
      dispatch(getListShipping(userId)).unwrap().then(data => setListShipping(data.data))
    } catch (error) {
      console.log(error);
    }
  }, [userId])

  return (
    <div className='account__address'>
      <div className='account__address__heading'>
        <p>The following addresses will be used on the checkout page by default.</p>
        <Link to="new-address">Add New Address</Link>
      </div>
      <div className='account__address__container'>
        {
          listShipping && listShipping.length !== 0 &&
          listShipping.map((item, index) => (
            <ShipCard
              key={index}
              id={item.id}
              name={item.fullName}
              phone={item.phone}
              address={item.address}
              ward={item.ward}
              district={item.district}
              province={item.province}
            />
          ))
        }
      </div>
    </div >
  )
}

export default Address
