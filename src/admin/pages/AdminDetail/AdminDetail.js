import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetail, updateStatus } from '../../../app/orderSlice';
import { Col, Row, Table } from 'react-bootstrap';
import { Button } from 'antd';

const AdminDetail = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const [detail, setDetail] = useState(null);
    const totalPrice = useSelector(state => state.order.totalPrice);
    const [change, setChange] = useState(0);

    useEffect(() => {
        try {
            dispatch(getOrderDetail(orderId)).unwrap().then(data => setDetail(data.data));
        } catch (error) {
            console.log(error);
        }
    }, [orderId, change])

    console.log(detail);

    const handleStatus = () => {
        if (orderId && detail) {
            if (detail.status !== "pending") {
                const params = {
                    status: "pending",
                    orderId: orderId
                }
                try {
                    dispatch(updateStatus(params)).then(() => {
                        setChange(change + 1)
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                const params = {
                    status: "processing",
                    orderId: orderId
                }
                try {
                    dispatch(updateStatus(params)).then(() => {
                        setChange(change + 1)
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

        const convertDate = (stringDate) => {
            const date = new Date(stringDate);
            const dateTime = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();

            return dateTime;
        }

        return (
            <>
                {
                    detail &&
                    <div className='admin-detail my-4 mx-5'>

                        <div>
                            <h2 className='admin-heading'>#{orderId}
                                <Button type='primary' className='btn-change' onClick={handleStatus}>Change Status</Button></h2>
                            <p>{convertDate(detail.created_at)} <span className='status'>{detail.status}</span></p>
                        </div>
                        <Row>
                            <Col xl={8}>
                                <div className='account__order__detail'>
                                    <Table className='table-detail'>
                                        <thead>
                                            <tr>
                                                <th>PRODUCT</th>
                                                <th>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detail.ordersDetail && detail.ordersDetail.map((item, index) => (
                                                    <tr>
                                                        <td>
                                                            <div className='account__order__product'>
                                                                <Link to={`/shop/` + item.productId}><img src={item.product.productThumbnail} /></Link>
                                                                <Link to={`/shop/` + item.productId}>{item.product.productName}</Link>
                                                                <strong>× {item.quantity}</strong>
                                                            </div>
                                                        </td>
                                                        <td><span>${item.price}</span></td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <th>Subtotal:</th>
                                                <td><span>${totalPrice}</span></td>
                                            </tr>
                                            <tr>
                                                <th>Shipping:</th>
                                                <td><span>Free shipping</span></td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td><span>${totalPrice}</span></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col xl={4}>
                                <div className='account__order__address'>
                                    <h3>Shipping address</h3>
                                    <address>{detail.shipping.fullName} <br />
                                        {detail.shipping.phone}<br />
                                        {detail.shipping.address}<br />
                                        {detail.shipping.ward}, {detail.shipping.district}, {detail.shipping.province}</address>
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </>
        )
    }

    export default AdminDetail
