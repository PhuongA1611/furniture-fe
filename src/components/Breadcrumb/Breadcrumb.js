import React from 'react'
import { Container } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import bg from "../../assets/images/breadcrumb.png"
import './Breadcrumb.scss'
import { useSelector } from 'react-redux';

const Breadcrumb = () => {
    const location = useLocation();
    const { id } = useParams();

    const slug = useSelector((state) => state.product.current.productName);

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '' && crumb !== 'product-category');

    const accountCrumb = crumbs.find(crumb => crumb === 'account');

    return (
        <>
            {
                (!accountCrumb && (crumbs.length !== 0)) &&
                <div className={id ? 'breadcrumb-detail' : 'breadcrumb-main'} style={id ? {} : { backgroundImage: `url(${bg})` }}>
                    <Container>
                        <h1>{crumbs.slice(-1)}</h1>
                        <div className='breadcrumb'>
                            <div className='breadcrumb__item'>
                                <Link to='/home'>Home</Link>
                            </div>
                            {
                                crumbs.slice(0, -1).map((crumb, index) => (
                                    <div className='breadcrumb__item' key={index}>
                                        <Link to={`/` + crumb}>{crumb}</Link>
                                    </div>
                                ))
                            }
                            <div className='breadcrumb__item'>
                                <span>{id ? slug : crumbs.slice(-1)}</span>
                            </div>
                        </div>
                    </Container>
                </div>
            }
        </>
    )
}

export default Breadcrumb
