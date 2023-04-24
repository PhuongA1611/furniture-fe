import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, DropdownButton, NavDropdown, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom'
import { getListProducts } from '../../app/productSlice'
import { ProductCard, ProductRow } from '../../components'
import './Category.scss'
import { searchProduct } from '../../app/searchSlice'
import { PaginationControl } from 'react-bootstrap-pagination-control'


const filter = [
    {
        title: "Price Low",
        query: "price",
        param: "sellingPrice=asc",
    },
    {
        title: "Price High",
        query: "price-desc",
        param: "sellingPrice=desc",
    },
    {
        title: "Lastest",
        query: "lastest",
        param: "createdAt=desc",
    },
]

const Category = () => {

    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const orderby = searchParams.get('orderby');
    const searchKey = searchParams.get('search');
    const dispatch = useDispatch();
    const [listProduct, setListProduct] = useState(null);
    const [totalProduct, setTotalProduct] = useState(0);
    const [isloading, setIsloading] = useState(0);
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const pageTopRef = useRef(null);
    const [selectValue, setSelectValue] = useState("Default sorting");

    const listCate = useSelector((state) => state.category.current);



    useEffect(() => {
        // console.log(searchKey);
        let params = {};
        if (searchKey) {
            params = {
                keyword: searchKey,
                typeCategory: 'all',
                limit: limit,
                page: page,
            }
            dispatch(searchProduct(params)).unwrap().then(
                data => {
                    setListProduct(data.data.products)
                    setTotalProduct(data.data.total);
                })
        } else {
            if (category) {
                if (listCate) {
                    const categoryId = listCate.find((item) => item.categorySlug === category
                    ).id;
                    params = {
                        limit: limit,
                        page: page,
                        categoryId: categoryId,
                    }

                    if (orderby) {
                        const sortBy = filter.find((sort) => sort.query === orderby).param;
                        params = {
                            limit: limit,
                            page: page,
                            categoryId: categoryId,
                            sortBy: sortBy,
                        }
                    }
                } else {
                    setIsloading(prev => prev + 1);
                }
            } else {
                params = {
                    limit: limit,
                    page: page,
                }
                if (orderby) {
                    const sortBy = filter.find((sort) => sort.query === orderby).param;
                    params = {
                        limit: limit,
                        page: page,
                        sortBy: sortBy,
                    }
                }
            }
            dispatch(getListProducts(params)).unwrap().then(data => {
                setListProduct(data.products);
                setTotalProduct(data.total);
            });
        }
    }, [category, isloading, searchKey, orderby, page, limit])

    useEffect(() => {
        setPage(1);
    }, [category, orderby, limit])

    const handleSelect = (type) => {
        if (!type) {
            setSearchParams();
            setSelectValue("Default sorting");
        } else {
            setSearchParams({ orderby: type.query });
            setSelectValue(type.title);
        }
    }

    return (
        <div className='category py-5' ref={pageTopRef}>
            <Container>
                <Row className='reverse'>
                    <Col lg={9}>
                        <div className='category__select'>
                            <div className='category__select__show'>
                                <label>Show</label>
                                <ul>
                                    <li>
                                        <span className='type-limit' >10</span>
                                        <input type='radio' name='typelimit' value="10" onClick={() => setLimit(10)} />
                                    </li>
                                    <li>
                                        <span className='type-limit'>15</span>
                                        <input type='radio' name='typelimit' value="15" onClick={() => setLimit(15)} />
                                    </li>
                                    <li>
                                        <span className='type-limit'>30</span>
                                        <input type='radio' name='typelimit' value="30" onClick={() => setLimit(30)} />
                                    </li>
                                </ul>
                            </div>
                            <div className='category__select__sort'>
                                <DropdownButton
                                    align="end"
                                    title={<span>{selectValue}</span>
                                    }
                                    className='dropdown-btn-sort'
                                    id="dropdown-sort-btn"
                                >
                                    <ul className='dropdown-sort'>
                                        <li><a onClick={() => handleSelect()}>Default sorting</a></li>
                                        {
                                            filter && filter.map((type, index) => (
                                                <li key={index}>
                                                    <a onClick={() => handleSelect(type)}>{type.title}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </DropdownButton>
                            </div>
                        </div>
                        <div className='category__content'>
                            {listProduct && listProduct.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}

                        </div>
                        <div className='category__pagination'>
                            <PaginationControl
                                page={page}
                                between={4}
                                total={totalProduct}
                                limit={limit}
                                changePage={(page) => {
                                    setPage(page);
                                    pageTopRef.current.scrollIntoView();
                                }}
                                ellipsis={1}
                            />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='category__nav'>
                            <h3 className='category__title'>Categories</h3>
                            <ul>
                                <li><NavLink to="/shop" end>All shop</NavLink></li>
                                {listCate && listCate.map((cate) => {
                                    const link = '/shop/product-category/' + cate.categorySlug
                                    return (
                                        <li key={cate.id}>
                                            <NavLink
                                                exact="true"
                                                to={link}
                                            >
                                                {cate.categoryName}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='category__list'>
                            <h3 className='category__title'>Products on sale</h3>
                            {
                                listProduct && listProduct.slice(0, 3).map((item, index) => (
                                    <ProductRow key={index} item={item} />
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Category
