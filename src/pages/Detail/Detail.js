import React, { useEffect, useState } from 'react'
import './Detail.scss'
import { Col, Container, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Detail3D, ProductCard, ProductSlider } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, getListProducts } from '../../app/productSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import "swiper/css/navigation";
import { cartLocalactions } from '../../app/cartLocalSlice'
import { message } from 'antd'
import { addFavorite } from '../../app/favoriteSlice'


const detailSchema = yup.object().shape({
  size: yup.string().required(`you haven't chosen the size!`).nullable(),
  color: yup.string().required(`you haven't chosen the color!`).nullable(),
})

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const navigate = useNavigate();
  const isLogined = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    try {
      dispatch(getDetail(id)).unwrap().then(data => setDetail(data));
    } catch (error) {
      console.log(error);
    }
  }, [id])

  let sale = true;
  if (detail && (detail.discountPrice == 0)) {
    sale = false;
  }

  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(detailSchema),
    defaultValues: {
      quantity: 1
    }
  });

  useEffect(() => {
    try {
      const params = {
        limit: 15,
        page: 1,
        categoryId: detail.categoryId,
      }
      dispatch(getListProducts(params)).unwrap().then(data => setRelatedProducts(data.products))
    } catch (error) {
      console.log(error);
    }
  }, [detail])

  const quantity = watch("quantity");
  const increaseQuantity = () => setValue("quantity", quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setValue("quantity", quantity - 1);
    }
  };

  const handleAddToCart = () => {
    handleSubmit((data) => {
      const item = addToCart(data);
      // console.log(item);
      dispatch(cartLocalactions.addItem(item));
      message.success("The product has been added to cart!");
    })()
  }

  const handleBuy = () => {
    handleSubmit((data) => {
      const item = addToCart(data);
      // console.log(item);
      dispatch(cartLocalactions.addItem(item));
      navigate('/cart');
    })()
  }

  const addToFavorite = () => {
    if (isLogined) {
      const params = {
        productId: detail.id
      }
      dispatch(addFavorite(params));
    } else {
      navigate('/login');
      message.warning("Please login!");
    }
  }

  const addToCart = (laterData) => {
    const itemAdd = {
      id: detail.id,
      productName: detail.productName,
      productThumbnail: detail.productThumbnail,
      sellingPrice: detail.sellingPrice,
      discountPrice: detail.discountPrice,
      size: laterData.size,
      color: laterData.color,
      quantity: laterData.quantity,
    }

    return itemAdd;
  }

  return (
    <>
      {
        detail && (<div className='detail'>
          <div className='detail__main'>
            <Container>
              <Row>
                <Col lg={7}>
                  <div className='detail__wrapper'>
                    <Detail3D
                      product3D={detail.product3DModelPath}
                    />
                    <div className='detail__image'>
                      <Swiper
                        slidesPerView={3}
                        spaceBetween={15}
                        breakpoints={{
                          480: {
                            slidesPerView: 4,
                          },
                          1199: {
                            slidesPerView: 5,
                          },
                        }}
                        modules={[Navigation]}
                        navigation={true}
                        className="main-slider">
                        {
                          detail.productImg.split(",").map((url, index) => (
                            <SwiperSlide key={index}>
                              <div className='detail__image__item'>
                                <img src={url} />
                              </div>
                            </SwiperSlide>
                          ))
                        }
                      </Swiper>
                    </div>
                  </div>
                </Col>
                <Col lg={5}>
                  <div className='detail__content'>
                    <form>
                      <h2>{detail.productName}</h2>
                      {
                        sale ? (
                          <p className='detail__content__price'>
                            <del>${detail.sellingPrice}</del>
                            <ins>${detail.discountPrice}</ins>
                          </p>
                        ) : (
                          <p className='detail__content__price'>
                            <ins>${detail.sellingPrice}</ins>
                          </p>
                        )
                      }
                      <div className='detail__content__selection'>
                        <h3>Size: </h3>
                        <div className='selection-wrapper'>
                          {
                            detail.productSize && detail.productSize.split(",").map((value, index) => (
                              <label htmlFor={value} key={index}>
                                <input {...register("size")} type="radio" value={value} />
                                {value}
                              </label>
                            ))
                          }
                        </div>
                        {errors.size && <span className='error'>{errors.size?.message}</span>}
                      </div>
                      <div className='detail__content__selection'>
                        <h3>Color: </h3>
                        <div className='selection-wrapper'>
                          {
                            detail.productColor && detail.productColor.split(",").map((value, index) => (
                              <label htmlFor={value} key={index}>
                                <input {...register("color")} type="radio" value={value} />
                                {value}
                              </label>
                            ))
                          }
                        </div>
                        {errors.color && <span className='error'>{errors.color?.message}</span>}
                      </div>
                      <div className='detail__content__quantity'>
                        {/* <div className='quantity__btn'> */}
                        <button type="button" className='minus' onClick={decreaseQuantity}>
                          -
                        </button>

                        <input {...register("quantity")} id="quantity" type="number" />
                        <button type="button" className='plus' onClick={increaseQuantity}>
                          +
                        </button>
                        {/* </div> */}
                      </div>
                    </form>
                    <div className='detail__content__btn'>
                      <button type='submit' className='add-cart' onClick={handleAddToCart}>Add to cart</button>
                      <button type='submit' className='buy-now' onClick={handleBuy}>buy now</button>
                    </div>
                    <div className='detail__content__feature'>
                      <button type='submit' className='add-favorite' onClick={addToFavorite}>
                        Add to favorite
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className='detail__desc'>
            <Tabs
              defaultActiveKey="description"
              className="detail__desc__tabs"
            >
              <Tab eventKey="description" title="DESCRIPTION">
                <Container>
                  <div className='detail__desc__content'>
                    <p>{detail.productDescription}</p>
                  </div>
                </Container>
              </Tab>
              <Tab eventKey="Information" title="Information">
                <Container>
                  <div className='detail__desc__content'>
                    <Table>
                      <tbody>
                        <tr>
                          <th>Name:</th>
                          <td>{detail.productName}</td>
                        </tr>
                        <tr>
                          <th>Size:</th>
                          <td>{detail.productSize}</td>
                        </tr>
                        <tr>
                          <th>Color:</th>
                          <td>{detail.productColor}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Container>
              </Tab>
            </Tabs>
            {/* </Container> */}
          </div>
          {relatedProducts && (<Container>
            <div className='detail__related'>
              <div className='detail__related__title'>
                <h2>Related Products</h2>
              </div>
              <ProductSlider listProduct={relatedProducts} />
            </div>
          </Container>)}
        </div>
        )
      }
    </>
  )
}

export default Detail
