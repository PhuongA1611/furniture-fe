import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import './Contact.scss'

const Contact = () => {
    return (
        <section className='contact my-5'>
            <Container>
                <Row>
                    <Col lg={4}>
                        <div className='contact__wrapper'>
                            <div className='contact__wrapper__heading'>
                                <h4>nordic FURNITURE</h4>
                                <h2>Get in touch !</h2>
                            </div>
                            <div className='contact__wrapper__content'>
                                <p>Biệt thự 69, đường số 23 <br />
                                KĐT TP Giao Lưu - Bắc Từ Liêm - Hà Nội</p>
                            </div>
                            <div className='contact__wrapper__content'>
                                <p>Parking only available on weekends</p>
                                <p>Feel free to buzz 101 at the intercom!</p>
                                <p><span>Email: alexandria@brosa.com</span></p>
                                <p><span>Ph: (02) 7202 5701</span></p>
                                <p>Customer Service: 1300 027 672 (for all queries)</p>
                            </div>
                            <div className='contact__wrapper__social'>
                                <h5>FOLLOW US</h5>
                                <div className='list-social'>
                                    <a><span><FontAwesomeIcon icon={faTwitter} /></span></a>
                                    <a><span><FontAwesomeIcon icon={faInstagram} /></span></a>
                                    <a><span><FontAwesomeIcon icon={faFacebookF} /></span></a>
                                    <a><span><FontAwesomeIcon icon={faYoutube} /></span></a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className='contact__map'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476815.5877786855!2d105.765794!3d20.987755000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab2e2881d2b7%3A0x827a4e784e5a3430!2zTuG7mWkgdGjhuqV0IELhuq9jIMOCdSAtIE5PUkRJQw!5e0!3m2!1svi!2sus!4v1680541877178!5m2!1svi!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Contact
