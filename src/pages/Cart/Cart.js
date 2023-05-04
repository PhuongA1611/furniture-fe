import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faMinus } from '@fortawesome/free-solid-svg-icons';
import { cartLocalactions } from '../../app/cartLocalSlice';
import { message } from 'antd';

const Cart = () => {
    const dispatch = useDispatch();
    const cartLocal = useSelector((state) => state.cartLocal);
    const cart = useSelector((state) => state.cart);
    const [cartData, setCartData] = useState({
        cartItems: [],
        totalQuantity: 0,
        totalAmount: 0,
    })
    const isLogined = useSelector((state) => state.auth.isLogged);

    useEffect(() => {
        if (isLogined) {
            setCartData(cart)
        } else {
            setCartData(cartLocal)
        }
    }, [isLogined, cart, cartLocal])

    const handleMinus = (id) => {
        dispatch(cartLocalactions.reduceItem(id));
    }

    const handleAdd = (item) => {
        dispatch(cartLocalactions.addItem(item));
    }

    const handleDelete = (id) => {
        dispatch(cartLocalactions.deleteItem(id));
    }

    return (

        <div className='cart my-5'>
            <Container>
                {
                    cartData.totalQuantity === 0 ? (
                        <div className='cart__none'>
                            <div className='main-notice'>
                                <p>Your cart is currently empty.</p>
                            </div>
                            <Link to="/shop" className='main-return'>Return to shop</Link>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <Col xl={9}>
                                    <div className='cart__table table-responsive'>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Size</th>
                                                    <th>Color</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartData.cartItems && cartData.cartItems.map((item, index) => (
                                                        <tr>
                                                            <td>
                                                                <button className='cart__table__close btn-main-close' onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faClose} size='xs' /></button>
                                                            </td>
                                                            <td>
                                                                <Link to={`/shop/` + item.id}>
                                                                    <div className='cart__table__img'><img src={item.productThumbnail} /></div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/shop/` + item.id} className='cart__table__title'>{item.productName}</Link>
                                                            </td>
                                                            <td>
                                                                <div className='cart__table__price'>{
                                                                    item.discountPrice == 0 ? (
                                                                        <ins>${item.sellingPrice}</ins>
                                                                    ) : (
                                                                        <>
                                                                            <del>${item.sellingPrice}</del>
                                                                            <ins>${item.discountPrice}</ins>
                                                                        </>
                                                                    )
                                                                }</div>
                                                            </td>
                                                            <td><span className='cart__table__option'>{item.size}</span></td>
                                                            <td><span className='cart__table__option'>{item.color}</span></td>
                                                            <td>
                                                                <div className='cart__table__quantity'>
                                                                    <button className='btn-quantity btn-minus' onClick={() => handleMinus(item.id)}><FontAwesomeIcon icon={faMinus} size='xs' /></button>
                                                                    <div className='quantity'><span>{item.quantity}</span></div>
                                                                    <button className='btn-quantity btn-add' onClick={() => handleAdd(item)}><FontAwesomeIcon icon={faAdd} size='xs' /></button>
                                                                </div>
                                                            </td>
                                                            <td><h4 className='cart__table__subtotal'>${item.totalPrice}</h4></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col xl={3}>
                                    <div className='cart__totals'>
                                        <h2>Cart totals</h2>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td><span className='cart__totals__sub'>${cartData.totalAmount}</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td><p>Free shipping</p></td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td><span className='cart__totals__final'>${cartData.totalAmount}</span></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        {
                                            isLogined ?
                                                <Link to='/checkout' className='checkout'>PROCEED TO CHECKOUT</Link> : <Link to='/login' className='checkout' onClick={() => { message.warning("Please login!") }}>PROCEED TO CHECKOUT</Link>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                }

            </Container>
        </div>
    )
}

export default Cart
