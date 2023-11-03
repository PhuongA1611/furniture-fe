import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import 'swiper/css';
import * as yup from 'yup';
import './Footer.scss';
import { footerList } from './contants';

let searchSchema = yup.object().shape({
  search: yup.string().required('This field is required'),
});

const Footer = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const onSubmit = (data) => {
    const link = '/shop?search=' + data.search;
    navigate(link);
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 80) {
      setVisible(true);
    } else if (scrolled <= 80) {
      setVisible(false);
    }
  };
  window.addEventListener('scroll', toggleVisible);

  return (
    <>
      <div className="footer">
        <div className="footer__search">
          <Container>
            <Row>
              <Col lg={7}>
                <div className="footer__search__content">
                  <h2>Join now and get 10% off your next purchase!</h2>
                  <p>Subscribe to the weekly newsletter for all the latest updates</p>
                </div>
              </Col>
              <Col lg={5}>
                <div className="footer__search__form">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('search')} type="text" name="search" placeholder="Search..." />
                    <button type="submit">search</button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer__container">
          <Container>
            <div className="footer__content">
              <ul>
                {footerList.map((group, key) => (
                  <li key={key}>
                    <h4>{group.title}</h4>
                    <ul>
                      {group.child.map((row, key) => (
                        <li key={key}>
                          <Link to={row.link}>{row.content}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
        <div className="footer__row">
          <Container>
            <Row>
              <Col lg={8} md={9}>
                <div className="footer__row__left">
                  <div className="footer__widget">
                    <p>© 2023 – By Phuong</p>
                  </div>
                  <div className="footer__widget">
                    <ul>
                      <li>
                        <a href="">Privacy</a>
                      </li>
                      <li>
                        <a href="">Terms</a>
                      </li>
                      <li>
                        <a href="">*Promo T&Cs Apply (view here)</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={3}>
                <div className="footer__row__right">
                  <img src="/footer-image.png" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="scroll-top">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className={visible ? 'show' : ''}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </div>
    </>
  );
};

export default Footer;
