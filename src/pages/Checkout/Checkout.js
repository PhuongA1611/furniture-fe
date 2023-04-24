import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import './Checkout.scss';
import { getProvince } from '../../app/checkoutSlice';

const checkoutSchema = yup.object().shape({

});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartLocal = useSelector((state) => state.cartLocal);
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState({
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
  })
  const [province, setProvince] = useState([]);
  const isLogined = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    try {
      dispatch(getProvince()).unwrap().then(data => setProvince(data)); 
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(province);

  useEffect(() => {
    if (isLogined) {
      setCartData(cart)
    } else {
      setCartData(cartLocal)
    }
  }, [isLogined])
  // const listCart = useSelector((state) => state.cartLocal.cartItems);
  // const total = useSelector((state) => state.cartLocal.totalAmount);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = data => {
    console.log(data);
  }

  return (
    <section className='checkout my-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='checkout__form'>
        <Container>
          <Row>
            <Col lg={7}>
              <div className='checkout__detail'>
                <h3 className='checkout__heading'>BILLING DETAILS</h3>
                <div className='checkout__wrapper'>
                  <div className='checkout__form__group'>
                    <label>Name<span>*</span></label>
                    <input {...register("name")} type='text' name="name" />
                  </div>
                  <div className='checkout__form__group'>
                    <label>Phone<span>*</span></label>
                    <input {...register("phone")} type='text' name="phone" />
                  </div>
                  <div className='checkout__form__group'>
                    <label>Email address <span>*</span></label>
                    <input {...register("email")} type='email' name="email" />
                  </div>
                  {/* <div className='checkout__form__group'>
                    <label></label>
                    <input {...register("")} type='' name="" />
                  </div>
                  <div className='checkout__form__group'>
                    <label></label>
                    <input {...register("")} type='' name="" />
                  </div>
                  <div className='checkout__form__group'>
                    <label></label>
                    <input {...register("")} type='' name="" />
                  </div> */}
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className='checkout__order'>
                <h3 className='checkout__heading'>YOUR ORDER</h3>
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
                              <td>{item.productName} <strong className='checkout__order__quantity'>x {item.quantity}</strong></td>
                              <td><span>${item.totalPrice}</span></td>
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
                          <td>Free shipping</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td><span className='order-total'>${cartData.totalAmount}</span></td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                  <input type='submit' name='submit' value="place order" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </section>
  )
}

export default Checkout
