import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartLocalactions } from '../../app/CartLocalSlice';
import { addActiveCart, getListCart } from '../../app/CartSlice';
import { addFavorite } from '../../app/FavoriteSlice';
import './ProductCard.scss';
// new-main.png

const Card = (props) => {
  const item = props.item;
  const link = '/shop/' + item.id;
  const dispatch = useDispatch();

  const isLogined = useSelector((state) => state.auth.isLogged);

  const addToCart = () => {
    if (isLogined) {
      const itemAdd = {
        productId: item.id,
        quantity: 1,
        productSize: item.productSize.split(',')[0],
        productColor: item.productColor.split(',')[0],
      };
      dispatch(addActiveCart(itemAdd)).then(() => {
        dispatch(getListCart());
        message.success('The product has been added to cart!');
      });
    } else {
      const itemAdd = {
        productId: item.id,
        productName: item.productName,
        productThumbnail: item.productThumbnail,
        sellingPrice: item.sellingPrice,
        discountPrice: item.discountPrice,
        size: item.productSize.split(',')[0],
        color: item.productColor.split(',')[0],
        quantity: 1,
      };
      dispatch(cartLocalactions.addItem(itemAdd));
      message.success('The product has been added to cart!');
    }
  };

  const addToFavorite = () => {
    if (isLogined) {
      const params = {
        productId: item.id,
      };
      dispatch(addFavorite(params));
    } else {
      message.warning('Please login!');
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__wrap">
        <div className="product-card__thumb">
          <Link to={link}>
            <img src={item.productThumbnail} />
          </Link>
          <div className="product-card__thumb__btn">
            <button onClick={addToCart}>
              <FontAwesomeIcon icon={faCartPlus} size="1x" />
            </button>
            <button onClick={addToFavorite}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      </div>
      <div className="product-card__content">
        <h3>
          <Link to={link}>{item.productName}</Link>
        </h3>
        <p className="product-card__content__price">
          {item.discountPrice === 0 ? (
            <ins>${item.sellingPrice}</ins>
          ) : (
            <>
              <del>${item.sellingPrice}</del>
              <ins>${item.discountPrice}</ins>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
