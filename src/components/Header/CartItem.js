import React from 'react'
import './Header.scss'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartLocalactions } from 'app/CartLocalSlice'
import { deleteCart, getListCart } from 'app/CartSlice'


const CartItem = (props) => {

    const { item } = props;
    const dispatch = useDispatch();
    const isLogined = useSelector((state) => state.auth.isLogged);

    const handleDelete = () => {
        if (isLogined) {
            dispatch(deleteCart(item.id)).then(() => {
                dispatch(getListCart());
            });
        } else {
            dispatch(cartLocalactions.deleteItem(item));
        }
    }

    return (
        <div className='header__cart__item mini-item'>
            <div className='mini-item__wrapper'>
                <Link to={`/shop/` + item.productId}><img src={item.productThumbnail} /></Link>
                <div className='mini-item__content'>
                    <Link to={`/shop/` + item.productId} className='mini-item__content__title'>{item.productName}</Link>
                    <div className='mini-item__content__price'>
                        {
                            item.discountPrice === 0 ? (
                                <ins>${item.sellingPrice}</ins>
                            ) : (
                                <>
                                    <del>${item.sellingPrice}</del>
                                    <ins>${item.discountPrice}</ins>
                                </>
                            )
                        }
                        <div className='mini-item__content__quantity'>
                            <span>x {item.quantity}</span>
                        </div>
                    </div>
                    <div className='mini-item__content__option'>
                        <span>{item.size}</span>
                        <span>{item.color}</span>
                    </div>

                </div>
            </div>
            <button className='mini-item__close' onClick={handleDelete}><FontAwesomeIcon icon={faClose} size='2xs' /></button>
        </div>
    )
}

export default CartItem
