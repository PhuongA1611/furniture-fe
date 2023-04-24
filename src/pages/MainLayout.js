import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { getListCategory } from '../app/CategorySlice'
import { Breadcrumb, Footer, Header } from '../components'
import { getMe } from '../app/AuthSlice'
import { getListCart } from '../app/cartSlice'

const MainLayout = () => {
  const dispatch = useDispatch();
  const path = useLocation();
  const isLogined = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    try {
      dispatch(getListCategory());
      if (isLogined) {
        dispatch(getMe());
        dispatch(getListCart());
      }
    } catch (error) {
      console.log(error);
    }
  }, [])
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [path.pathname]);

  return (
    <>
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout
