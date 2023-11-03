import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetail } from '../../app/OrderSlice';
import './Account.scss';

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const totalPrice = useSelector((state) => state.order.totalPrice);

  useEffect(() => {
    try {
      dispatch(getOrderDetail(orderId))
        .unwrap()
        .then((data) => setDetail(data.data));
    } catch (error) {
      console.log(error);
    }
  }, [orderId]);

  const convertDate = (stringDate) => {
    const date = new Date(stringDate);
    const dateTime =
      date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear();

    return dateTime;
  };

  return (
    <>
      {detail && (
        <div className="account__order">
          <div className="account__order__heading">
            <p>
              Order <mark>#{detail.id}</mark> was placed on <mark>{convertDate(detail.created_at)}</mark> and is
              currently <mark>{detail.status}</mark>.
            </p>
            <h2>Order details</h2>
            <div className="account__order__detail">
              <Table className="table-detail">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.ordersDetail &&
                    detail.ordersDetail.map((item, index) => (
                      <tr>
                        <td>
                          <div className="account__order__product">
                            <Link to={`/shop/` + item.productId}>
                              <img src={item.product.productThumbnail} />
                            </Link>
                            <Link to={`/shop/` + item.productId}>{item.product.productName}</Link>
                            <strong>× {item.quantity}</strong>
                          </div>
                        </td>
                        <td>
                          <span>${item.price}</span>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <th>Subtotal:</th>
                    <td>
                      <span>${totalPrice}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Shipping:</th>
                    <td>
                      <span>Free shipping</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Total:</th>
                    <td>
                      <span>${totalPrice}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {detail.shipping && (
              <div className="account__order__address">
                <h3>Shipping address</h3>
                <address>
                  {detail.shipping.fullName} <br />
                  {detail.shipping.phone}
                  <br />
                  {detail.shipping.address}
                  <br />
                  {detail.shipping.ward}, {detail.shipping.district}, {detail.shipping.province}
                </address>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
