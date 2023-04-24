import React from 'react'
import './Header.scss'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ig10 from "../../assets/images/ig-10.png"
import { useDispatch } from 'react-redux'
import { cartLocalactions } from '../../app/cartLocalSlice'


const CartItem = (props) => {

    const { item } = props;
    const dispatch = useDispatch();

    let sale = true;
    if (item.discountPrice == 0) {
        sale = false;
    }

    const handleMinus = () => {
        dispatch(cartLocalactions.reduceItem(item.id));
    }

    const handleAdd = () => {
        dispatch(cartLocalactions.addItem(item));
    }

    const handleDelete = () => {
        dispatch(cartLocalactions.deleteItem(item.id));
    }

    return (
        <div className='header__cart__item mini-item'>
            <div className='mini-item__wrapper'>
                <Link to={`/shop/` + item.id}><img src={item.productThumbnail} /></Link>
                <div className='mini-item__content'>
                    <Link to={`/shop/` + item.id} className='mini-item__content__title'>{item.productName}</Link>
                    <div className='mini-item__content__price'>
                        {
                            sale ? (
                                <>
                                    <del>${item.sellingPrice}</del>
                                    <ins>${item.discountPrice}</ins>
                                </>
                            ) : (
                                <ins>${item.sellingPrice}</ins>
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
