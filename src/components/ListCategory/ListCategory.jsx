import { faCaretRight, faCouch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import './ListCategory.scss';

const ListCategory = (props) => {
  const { listCate } = props;

  return (
    <section className="selection">
      <Container>
        <Row>
          <Col lg={3}>
            <div className="selection__title">
              <h2>
                Shop <br />
                by categories
              </h2>
              <div className="selection__title__note">
                <FontAwesomeIcon icon={faCouch} size="3x" />
                <p>
                  200 +<br />
                  Unique products
                </p>
              </div>
              <Link to="/shop">
                <span>ALL CATEGORIES</span> <FontAwesomeIcon icon={faCaretRight} size="sm" />
              </Link>
            </div>
          </Col>
          <Col lg={9}>
            {listCate && (
              <Swiper
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                  480: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                navigation={true}
                modules={[Navigation]}
                className="selection__slider main-slider"
              >
                {listCate.map((cate, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`shop/product-category/` + cate.categorySlug}>
                      <div className="selection__slider__item">
                        <img src={cate.categoryIcon} />
                        <h2>{cate.categoryName}</h2>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ListCategory;
