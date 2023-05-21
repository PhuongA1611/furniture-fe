import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb } from '../../components'
import userIcon from '../../assets/images/u_user-circle.png'

import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, loginUser } from '../../app/AuthSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { addActiveCart, getListCart } from '../../app/cartSlice'
import { cartLocalactions } from '../../app/cartLocalSlice'

let loginSchema = yup.object().shape({
    email: yup.string().email().required('This field is required'),
    password: yup.string().min(4).required('This field is required'),
})

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const cartLocal = useSelector((state) => state.cartLocal.cartItems);

    const onSubmit = data => {
        try {
            dispatch(loginUser(data)).then(() => {
                dispatch(getMe());
                if (cartLocal.length !== 0) {
                    cartLocal.map((item, índex) => {
                        const itemAdd = {
                            productId: item.productId,
                            quantity: item.quantity,
                            productSize: item.size,
                            productColor: item.color,
                        }
                        dispatch(addActiveCart(itemAdd)).then(() => {
                            dispatch(cartLocalactions.deleteItem(item));
                            dispatch(getListCart());
                        });
                    })
                }
                navigate(-1);
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='login my-5'>
                <Container>
                    <div className='login__container'>
                        <h2><img src={userIcon}></img>Login</h2>
                        <div className='login__content'>
                            <form onSubmit={handleSubmit(onSubmit)} className='login__form'>
                                <div className='login__form__group'>
                                    <label>Email address <span>*</span></label>
                                    <input {...register("email")} type="text" name='email' />
                                    {errors.email && <span className='error'>{errors.email?.message}</span>}
                                </div>
                                <div className='login__form__group'>
                                    <label>Password <span>*</span></label>
                                    <input {...register("password")} type="password" name='password' />
                                    {errors.password && <span className='error'>{errors.password?.message}</span>}
                                </div>
                                <div className='login__form__option'>
                                    <div className='remember'>
                                        <input type="checkbox" id='remember' name='remember' />
                                        <label>Remember me</label>
                                    </div>
                                    <div className='lost-password'><Link to="/">Lost your password?</Link></div>
                                </div>
                                <div className='login__form__submit'>
                                    <input type="submit" name='login' value="Login" />
                                </div>
                                <div className='login__link'><Link to='/register'>Create an account</Link></div>
                            </form>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Login
