import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import userIcon from '../../assets/images/u_user-circle.png'

import './Login.scss'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../app/AuthSlice'
import { useNavigate } from 'react-router-dom'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const registerSchema = yup.object().shape({
  email: yup.string().email().required('This field is required'),
  password: yup.string().min(4).required('This field is required'),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'Passwords must match')
})

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = data => {
    try {
      dispatch(registerUser(data)).then(() => {
        navigate(-1);
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login my-5'>
      <Container>
        <div className='login__container'>
          <h2><img src={userIcon}></img>Register</h2>
          <div className='login__content'>
            <form onSubmit={handleSubmit(onSubmit)} className='login__form'>
              <div className='login__form__group'>
                <label>Email address <span>*</span></label>
                <input {...register("email")} type='text' name='email' />
                {errors.email && <span className='error'>{errors.email?.message}</span>}
              </div>
              <div className='login__form__group'>
                <label>Password <span>*</span></label>
                <input {...register("password")} type='password' name='password' />
                {errors.password && <span className='error'>{errors.password?.message}</span>}
              </div>
              <div className='login__form__group'>
                <label>Confirm Password <span>*</span></label>
                <input {...register("confirmPassword")} type='password' name='confirmPassword' />
                {errors.confirmPassword && <span className='error'>{errors.confirmPassword?.message}</span>}
              </div>
              <div className='login__form__submit'>
                <input type="submit" name='submit' value="Register" />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Register
