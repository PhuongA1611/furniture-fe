import { faBox, faCaretRight, faCouch, faCreditCard, faSwatchbook, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { igContent, listNote } from './contants'

import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.scss"
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getListProducts } from '../../app/productSlice'
import { Advertise, Banner, ListCategory, NoteCard, ProductCard, TabProducts } from '../../components'
import { getListBanner } from '../../app/bannerSlice'

const Home = () => {

  const dispatch = useDispatch();
  const listCate = useSelector((state) => state.category.current);
  const [listArrival, setListArrival] = useState(null);
  const [listSale, setListSale] = useState(null);
  const [listAdver, setListAdver] = useState(null);
  const [listBanner, setListBanner] = useState(null);

  useEffect(() => {
    try {
      dispatch(getListBanner()).unwrap().then(data => setListBanner(data.topSlider));
      dispatch(getListBanner()).unwrap().then(data => setListAdver(data.bottomSlider));

      const paramsArrival = {
        limit: 8,
        page: 1,
        sortBy: "createdAt=desc",
      }
      dispatch(getListProducts(paramsArrival)).unwrap().then(data => setListArrival(data.products))

      const paramsSale = {
        limit: 8,
        page: 1,
        sortBy: "createdAt=asc",
      }
      dispatch(getListProducts(paramsSale)).unwrap().then(data => setListSale(data.products))
    } catch (error) {
      console.log(error);
    }


  }, [])

  return (
    <>
      <Banner listBanner={listBanner} />

      <ListCategory listCate={listCate} />
      
      <Advertise listAdver={listAdver} />

      <TabProducts listTab={[
        {
          eventKey: "arrival",
          title: "Arrival",
          products: listArrival,
        },
        {
          eventKey: "onSale",
          title: "On Sale",
          products: listSale,
        }
      ]} />

      <section>
        <Container>
          <div className='quick'>
            <Row>
              <Col lg={2} md={1} />
              <Col lg={8} md={10}>
                <div className='quick__container'>
                  <div className='quick__content'>
                    <h2>Over 100 products ready to ship today</h2>
                    <Link to="/shop">Shop now</Link>
                  </div>
                </div>
              </Col>
              <Col lg={2} md={1} />
            </Row>
          </div>
        </Container>
      </section>
      
      <NoteCard listNote={listNote} />

      <section className='instagram'>
        <div className='instagram__heading'>
          <Container>
            <div className='instagram__heading__content'>
              <div className='icon'><FontAwesomeIcon icon={faInstagram} size="3x" /></div>
              <h2>#Nordicfurniture</h2>
              <h6>See how our customers have styled davici products in their home</h6>
            </div>
          </Container>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          className="instagram__slider"
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 6,
            },
          }}
          modules={[Autoplay]}
        >
          {
            igContent && igContent.map((slide, index) => (
              <SwiperSlide key={index}>
                <a className='instagram__slider__child' href='https://www.instagram.com/nordic_furnituredesign/'>
                  <img src={slide} />
                </a>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </section>
    </>
  )
}

export default Home
