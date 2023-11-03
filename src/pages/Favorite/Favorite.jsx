import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts } from '../../app/ProductSlice';

import { message } from 'antd';
import { Link } from 'react-router-dom';
import { addActiveCart, getListCart } from '../../app/CartSlice';
import { deleteFavorite } from '../../app/FavoriteSlice';
import './Favorite.scss';

const Favorite = () => {
  const [listFavorite, setListFavorite] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    try {
      const params = {
        limit: 15,
        page: 1,
        userId: userId,
      };
      dispatch(getListProducts(params))
        .unwrap()
        .then((data) => setListFavorite(data.products.filter((item) => item.favoriteStatus === true)));
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const handleDelete = (id) => {
    console.log(id);
    try {
      const paramsDelete = {
        productId: id,
      };
      dispatch(deleteFavorite(paramsDelete)).then(() => {
        const params = {
          limit: 15,
          page: 1,
          userId: userId,
        };
        dispatch(getListProducts(params))
          .unwrap()
          .then((data) => setListFavorite(data.products.filter((item) => item.favoriteStatus === true)));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (id) => {
    const item = listFavorite.find((item) => item.id === id);
    const itemAdd = {
      productId: id,
      quantity: 1,
      productSize: item.productSize.split(',')[0],
      productColor: item.productColor.split(',')[0],
    };
    dispatch(addActiveCart(itemAdd)).then(() => {
      dispatch(getListCart());
      message.success('The product has been added to cart!');
    });
  };

  return (
    <div className="favorite my-5">
      <Container>
        {listFavorite && listFavorite.length !== 0 ? (
          <div className="favorite__table">
            <Table>
              <tbody>
                {listFavorite.map((item, index) => (
                  <tr key={index}>
                    <td className="td-btn-close">
                      <button className="btn-main-close" onClick={() => handleDelete(item.id)}>
                        <FontAwesomeIcon icon={faClose} size="xs" />
                      </button>
                    </td>
                    <td className="td-image">
                      <div className="favorite__image">
                        <Link to={`/shop/` + item.id}>
                          <img src={item.productThumbnail} />
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="favorite__content">
                        <Link to={`/shop/` + item.id}>{item.productName}</Link>
                        <p>
                          {item.discountPrice === 0 ? (
                            <>${item.sellingPrice}</>
                          ) : (
                            <>
                              <del>${item.sellingPrice}</del>
                              <ins>${item.discountPrice}</ins>
                            </>
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="td-add-cart">
                      <button className="favorite__btn-delete " onClick={() => handleDelete(item.id)}>
                        Delete from favorite
                      </button>
                      <button className="favorite__btn-cart" onClick={() => addToCart(item.id)}>
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="favorite__none">
            <div className="main-notice">
              <p>Your favorite is currently empty.</p>
            </div>
            <Link to="/shop" className="main-return">
              Return to shop
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Favorite;
