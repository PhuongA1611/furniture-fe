import React from 'react'
import imgBanner from '../../assets/images/about-banner.png';
import img1 from '../../assets/images/about-1.png';
import img2 from '../../assets/images/about-2.png';
import { Col, Container, Row } from 'react-bootstrap';

import "./About.scss"

const About = () => {
    return (
        <section className='about'>
            <Container>
                <div className='about__logo'>
                    <h2>The furture of <span>N</span>ordic</h2>
                    <h4>GETTING BETTER AND BETTER – TOGETHER</h4>
                </div>
                <div className='about__banner'>
                    <img src={imgBanner} />
                </div>
                <div className='about__element'>
                    <Row className='about__reverse'>
                        <Col md={6}>
                            <div className='about__element__wrapper about__pl'>
                                <div className='about__element__heading'>
                                    <h5>WE DESIGN FURNITURE</h5>
                                    <h3>Simple Creative</h3>
                                </div>
                                <div className='about__element__content'>
                                    <p>Ut leo. Vivamus aliquet elit ac nisl. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac enim. Sed cursus turpis vitae tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus.In consectetuer turpis ut velit. Suspendisse feugiat. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo suscipit quam.</p>
                                    <p>Suspendisse feugiat. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo suscipit quam.</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='about__element__img'>
                                <img src={img1} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='about__element'>
                    <Row>
                        <Col md={6}>
                            <div className='about__element__wrapper about__pr'>
                                <div className='about__element__heading'>
                                    <h5>WE DESIGN FURNITURE</h5>
                                    <h3>Design Quaility</h3>
                                </div>
                                <div className='about__element__content'>
                                    <p>Ut leo. Vivamus aliquet elit ac nisl. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac enim. Sed cursus turpis vitae tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus.In consectetuer turpis ut velit. Suspendisse feugiat. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo suscipit quam.</p>
                                    <p>Suspendisse feugiat. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo suscipit quam.</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='about__element__img'>
                                <img src={img2} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default About
