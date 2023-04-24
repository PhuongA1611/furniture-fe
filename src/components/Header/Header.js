import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, Offcanvas, Row } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { searchProduct } from '../../app/searchSlice'
import CartItem from './CartItem'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { message } from 'antd'
import { getListCart } from '../../app/cartSlice'

let searchSchema = yup.object().shape({
  search: yup.string().required('This field is required')
})

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const [cartData, setCartData] = useState({ cartItems: [], totalQuantity: 0, totalAmount: 0 })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const category = useSelector((state) => state.category.current);
  const cartLocal = useSelector((state) => state.cartLocal);

  const isLogined = useSelector((state) => state.auth.isLogged);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (isLogined) {
      setCartData(cart)
    } else {
      setCartData(cartLocal)
    }
  }, [isLogined, cart, cartLocal])

  const onSubmit = data => {
    let link = '/shop';
    console.log(data);
    if (data.searchmobile) {
      link = '/shop?search=' + data.searchmobile;
    } else {
      link = '/shop?search=' + data.search;
    }
    navigate(link);
  };

  const handleActiveSearch = () => {
    setShowSearch(!showSearch);
  }

  return (
    <div className='header'>
      <Container>
        <Row>
          <Col xs={9} md={7} lg={6}>
            <div className='header__main'>
              <div className='header__logo'>
                <Link to='/'><h1><span>N</span>ordic</h1></Link>
              </div>
              <div className='header__main__navbar'>
                <ul>
                  <li>
                    <NavLink to='/'>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to='/shop'>Shop</NavLink>
                    <ul>
                      <li><NavLink to="/shop">All Shop</NavLink></li>
                      {category && category.map((cate, index) => {
                        const link = 'shop/product-category/' + cate.categorySlug;
                        return (
                          <li key={index}>
                            <NavLink to={link}>{cate.categoryName}</NavLink>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                  <li>
                    <NavLink to='/about'>About us</NavLink>
                  </li>
                  <li>
                    <NavLink to='/contact'>Contact</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className='header__mobile'>
              <Row>
                <Col xs={4}>
                  <div className='header__mobile__navbar'>
                    <Navbar
                      expand="lg"
                      collapseOnSelect
                    >
                      <Navbar.Toggle aria-controls={`mobile-navbar`} />
                      <Navbar.Offcanvas
                        id={`mobile-navbar`}
                        placement="start"
                      >
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title>
                            {/* <Nav.Link className="logo" eventKey="1"><NavLink to="/home"><h1><span>N</span>ordic</h1></NavLink></Nav.Link> */}
                          </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <Nav className="justify-content-end flex-grow-1 pe-3">

                            <div className='header__mobile__search' eventKey="7">
                              <form
                                onSubmit={handleSubmit(onSubmit)}>
                                <div className='search-form'>
                                  <input {...register("searchmobile")} type="text" name='searchmobile' placeholder='Search...' />
                                  <button type="submit" className='search-submit'>
                                    <i className='icon-search'></i>
                                  </button>
                                </div>
                                {/* {errors.search && <span className='error'>{errors.search?.message}</span>} */}
                              </form>
                            </div>
                            <Nav.Link eventKey="2" className='mobile-nav-link'><NavLink to='home'>Home</NavLink ></Nav.Link>
                            <NavDropdown
                              title={<NavLink to="/shop">
                                shop</NavLink>}
                              className='mobile-nav-link'
                            >
                              <NavDropdown.Item href="">
                                <Nav.Link eventKey="3" className='mobile-nav-sub'>
                                  <NavLink to="/shop" end>
                                    All shop</NavLink>
                                </Nav.Link>
                              </NavDropdown.Item>
                              {category && category.map((cate, index) => {
                                const link = 'shop/product-category/' + cate.categorySlug;
                                return (
                                  <NavDropdown.Item key={index} href="">
                                    <Nav.Link eventKey={`3.` + index} className='mobile-nav-sub'>
                                      <NavLink to={link}>
                                        {cate.categoryName}</NavLink>
                                    </Nav.Link>
                                  </NavDropdown.Item>
                                )
                              })}
                            </NavDropdown>
                            <Nav.Link eventKey="4" className='mobile-nav-link'>
                              <NavLink to='/about'>About us</NavLink>
                            </Nav.Link>
                            <Nav.Link eventKey="5" className='mobile-nav-link'>
                              <NavLink to='/contact'>Contact</NavLink>
                            </Nav.Link>
                            <Nav.Link eventKey="6" className='mobile-nav-link'>
                              {
                                isLogined ? <NavLink to="/account">Account</NavLink> : <NavLink to="/login">Login</NavLink>
                              }
                            </Nav.Link>
                          </Nav>
                        </Offcanvas.Body>
                      </Navbar.Offcanvas>
                    </Navbar>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className='header__logo'>
                    <NavLink to='/'><h1><span>N</span>ordic</h1></NavLink>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={3} md={5} lg={6}>
            <div className='header__right'>
              <div className='header__search'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={showSearch ? 'show' : null}>
                  <div className='search-form'>
                    <input {...register("search")} type="text" name='search' placeholder='Search...' />
                    <button type="submit" className='search-submit'>
                      <i className='icon-search'></i>
                    </button>
                    <a onClick={handleActiveSearch} className='show-search-btn'><i className='icon-search'></i></a>
                  </div>
                  {/* {errors.search && <span className='error'>{errors.search?.message}</span>} */}
                </form>
              </div>
              <div className='header__link'>
                <div className='header__login'>
                  {
                    isLogined ? <Link to="/account"><FontAwesomeIcon icon={faUser} size='lg' /></Link> : <Link to="/login">Login</Link>
                  }
                </div>
                <div className='header__favorite'>
                  {
                    isLogined ? <Link to="/favorite"><FontAwesomeIcon icon={faHeart} size='lg' /></Link> : <Link to="/login" onClick={() => { message.warning("Please login!") }}><FontAwesomeIcon icon={faHeart} size='lg' /></Link>
                  }
                </div>
                <div className='header__cart'>
                  <DropdownButton
                    align="end"
                    title={
                      <span><FontAwesomeIcon icon={faCartShopping} /></span>
                    }
                    id="dropdown-cart"
                    className='dropdown-cart'>
                    {/* <Dropdown.Item> */}
                    {/* No products in the cart */}
                    {/* </Dropdown.Item> */}
                    {/* <Dropdown.Item> */}
                    {/* <CartItem />
                      <CartItem /> */}
                    {/* </Dropdown.Item> */}
                    {
                      cartData.totalQuantity === 0
                        ? (<div>No products in the cart</div>)
                        : cartData.cartItems.map((item, index) => (<CartItem key={index} item={item} />))
                    }
                    {
                      (cartData.totalQuantity !== 0) && (
                        <>
                          <div className='header__cart__total'>
                            <h5>total:</h5>
                            <span>${cartData.totalAmount}</span>
                          </div>
                          <div className='header__cart__btn'>
                            <Link to='/cart' className='view-cart'>View cart</Link>
                            <Link to='/check-out' className='check-out'>Check out</Link>
                          </div>
                        </>
                      )
                    }
                  </DropdownButton>
                  <div className='count-cart'>
                    <span>{cartData.totalQuantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header