import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {  useForm } from 'react-hook-form';
import './Checkout.scss';
import { createOrder, getProvince } from '../../app/OrderSlice';
import { ShipCard } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { getListCart } from '../../app/CartSlice';
import { getListShipping } from '../../app/UserSlice';

const checkoutSchema = yup.object().shape({
  shipping: yup.number().required(`you haven't chosen the shipping!`),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartLocal = useSelector((state) => state.cartLocal);
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState({
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
  })
  const userId = useSelector((state) => state.auth.userId);
  const [listShipping, setListShipping] = useState(null);


  useEffect(() => {
    if (userId) {
      setCartData(cart);
      try {
        dispatch(getListShipping(userId)).unwrap().then(data => setListShipping(data.data))
      } catch (error) {
        console.log(error);
      }
    } else {
      setCartData(cartLocal)
    }
  }, [userId, cart, cartLocal])


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = data => {
    try {
      const params = {
        shippingId: data.shipping,
        cartItems: cartData.cartItems.map((item, index) => item.id),
      }
      console.log(params);
      dispatch(createOrder(params)).then(() => {
        dispatch(getListCart());
        navigate("/account/orders");
      })
    } catch (error) {
      
    }
  }

  return (
    <section className='checkout my-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='checkout__form'>
        <Container>
          <Row>
            <Col lg={6}>
              <div className='checkout__order'>
                <div className='checkout__heading'><h3>YOUR ORDER</h3></div>
                <div className='checkout__order__wrapper'>
                  <div className='checkout__order__table'>
                    <Table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartData.cartItems.map((item, index) => (
                            <tr key={index}>
                              <td><Link to={`/shop/` +item.productId}>{item.productName}</Link> <strong className='checkout__order__quantity'>x {item.quantity}</strong></td>
                              <td><span>${item.subTotal}</span></td>
                            </tr>
                          ))
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Subtotal</td>
                          <td>${cartData.totalAmount}</td>
                        </tr>
                        <tr>
                          <td>Shipping</td>
                          <td>Free</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td><span className='order-total'>${cartData.totalAmount}</span></td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                  <input className='submit-pc' type='submit' name='submit' value="place order" />
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className='checkout__shipping'>
                <div className='checkout__heading'>
                  <h3>Shipping</h3>
                  <Link to="/account/addresses/new-address">Add new address</Link>
                  {errors.shipping && <span className='error'>{errors.shipping?.message}</span>}
                </div>
                {
                  listShipping && listShipping.length !== 0 &&
                  listShipping.map((item, index) => (
                    <div
                      className='checkout__shipping__item'
                      key={index}>
                      <input {...register("shipping")} type='radio' name='shipping' value={item.id} />
                      <ShipCard
                        id={item.id}
                        name={item.fullName}
                        phone={item.phone}
                        address={item.address}
                        ward={item.ward}
                        district={item.district}
                        province={item.province}
                      />
                    </div>
                  ))
                }
                <input className='submit-mobile' type='submit' name='submit' value="place order" />
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </section>
  )
}

export default Checkout
