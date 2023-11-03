import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Banner.scss';

const Banner = (props) => {
  const { listBanner } = props;

  return (
    <section className="banner">
      {listBanner && (
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="banner__slider"
        >
          {listBanner.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="banner__item">
                <img src={item.url} />
                <div className="banner__item__container">
                  <Container>
                    <div className="banner__item__content">
                      <h4>
                        Nordic furniture <br /> 2023
                      </h4>
                      <h5>New Arrivals</h5>
                      <h2>{item.alt}</h2>
                      <div className="btn-shop">
                        <Link to="/shop">Shop now</Link>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Banner;
