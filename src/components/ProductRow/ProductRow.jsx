import { Link } from 'react-router-dom';

import './ProductRow.scss';

const ProductRow = (props) => {
  const { item } = props;
  return (
    <div className="product-row">
      <Link to={`/shop/` + item.id}>
        <img src={item.productThumbnail} />
      </Link>
      <div className="product-row__content">
        <Link to={`/shop/` + item.id}>{item.productName}</Link>
        <p>
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

export default ProductRow;
