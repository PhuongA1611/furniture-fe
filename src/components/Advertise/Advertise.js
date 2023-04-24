import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Advertise.scss'

const Advertise = (props) => {
    const { listAdver } = props
    return (
        <>
            {
                listAdver && <section className='adver'>
                    <Container>
                        <Row>
                            {
                                listAdver.map((item, index) => (
                                    <Col lg={6}>
                                        <div className='adver__item' key={index}>
                                            <div className='adver__item__image'>
                                                <img src={item.url} />
                                            </div>
                                            <div className='adver__item__wrap'>
                                                <div className='adver__item__content'>
                                                    <h5>30 % OFF ALL ORDER</h5>
                                                    <h3>{item.alt}</h3>
                                                    <Link to="/shop">Shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </section>
            }
        </>
    )
}

export default Advertise
