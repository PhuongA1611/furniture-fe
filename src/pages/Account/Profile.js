import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import userImg from "../../assets/images/avatar-user.jpg";

import './Account.scss'

const gender = {
  men: 1,
  women: 2,
}

const accountSchema = yup.object().shape({
  // size: yup.string().required(`you haven't chosen the size!`).nullable(),
  // color: yup.string().required(`you haven't chosen the color!`).nullable(),
})

const Profile = () => {
  const user = useSelector((state) => state.auth.current);
  const avatarRef = useRef();
  const [preview, setPreview] = useState(userImg)

  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(accountSchema),
  });

  useEffect(() => {
    if (user) {
      user.full_name && setValue('name', user.full_name);
      user.gender && setValue('gender', user.gender);
      user.image && setValue('avatar', user.image);
      if (user.image) {
        setPreview(user.image)
      }
      user.email && setValue('email', user.email);
      user.phone && setValue('phone', user.phone);
    }
  }, user)

  const handleAvatar = e => {
    e.preventDefault();
    avatarRef.current.click();
  }

  const handleChange = e => {
    const objectUrl = URL.createObjectURL(e.target.files[0])
    setPreview(objectUrl);
  }

  const onSubmit = data => {
    console.log(data);
  }
  return (
    <div className='account__profile'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='account__grid'>
          <Row>
            <Col xl={10} lg={9}>
              <div className='account__group'>
                <div className='account__form__group'>
                  <label>Name:</label>
                  <input {...register("name")} type='text' name='name' />
                </div>

                <div className='account__form__group select-radio' >
                  <label>Gender:</label>
                  <label><input {...register("gender")} type='radio' name='gender' value={gender.men} />Men</label>
                  <label><input {...register("gender")} type='radio' name='gender' value={gender.women} />Women</label>
                </div>

                <div className='account__form__group' >
                  <label>Birthday:</label>
                  <input {...register("dateOfBirth")} type='date' name='dateOfBirth' />
                </div>
              </div>
            </Col>
            <Col xl={2} lg={3}>
              <div className='account__profile__avatar'>
                <img src={preview} />
              </div>
              <div className='account__profile__btn'>
                <input {...register("avatar")} type="file" id="selectedFile" ref={avatarRef} onChange={handleChange} />
                <button className='avatar-btn' onClick={handleAvatar} >Change</button>
              </div>
            </Col>
            <div className='account__form__group' >
              <label>Email:</label>
              <input {...register("email")} type='text' name='email' />
            </div>
            <div className='account__form__group' >
              <label>Phone Number:</label>
              <input {...register("phone")} type='text' name='phone' />
            </div>
            <div className='account__form__group' >
              <input type="submit" name='login' value="Save changes" />
            </div>
          </Row>
        </div>
      </form>
    </div>
  )
}

export default Profile
