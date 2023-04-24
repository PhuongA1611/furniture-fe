import React from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { ProductCard } from '..'
import { Link } from 'react-router-dom';

import './TabProducts.scss'

const TabProducts = (props) => {
    const { listTab } = props;
    return (
        <>
            {listTab && <section className='hot-product'>
                <Container>
                    <div className='hot-product__container'>
                        <div className='hot-product__heading'>
                            <h2>Hot products</h2>
                        </div>
                        <div className='hot-product__link'>
                            <Link to="/shop">All products</Link>
                        </div>
                        <Tabs
                            defaultActiveKey="arrival"
                            className="hot-product__tabs"
                        >
                            {listTab.map((tab, index) => (
                                <Tab eventKey={tab.eventKey} title={tab.title} key={index}>
                                    <div className='hot-product__group'>
                                        <Row>
                                            {tab.products && tab.products.map((item, index) => (
                                                <Col lg={3} md={6}>
                                                    <ProductCard
                                                        key={index}
                                                        item={item}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </Tab>
                            ))}
                        </Tabs>
                    </div>
                </Container>
            </section>}
        </>
    )
}

export default TabProducts
