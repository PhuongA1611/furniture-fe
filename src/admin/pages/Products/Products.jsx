import { Form, Input, message, Popconfirm, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteProduct, getListProducts } from '../../../app/ProductSlice';
import { searchProduct } from '../../../app/SearchSlice';
import './Products.scss';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = searchParams.get('search');
  const [list, setList] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);
  useEffect(() => {
    if (searchKey) {
      const params = {
        keyword: searchKey,
        typeCategory: 'all',
        limit: 15,
        page: pageCurrent,
      };
      dispatch(searchProduct(params))
        .unwrap()
        .then((data) => {
          setList(data.data.products);
          setTotalProduct(data.data.total);
        });
    } else {
      try {
        const params = {
          limit: 15,
          page: pageCurrent,
          sortBy: 'createdAt=desc',
        };
        dispatch(getListProducts(params))
          .unwrap()
          .then((data) => {
            setList(data.products);
            setTotalProduct(data.total);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [pageCurrent, searchKey]);

  const onChange = (current) => {
    setPageCurrent(current);
  };

  const handleEdit = (id) => {
    const link = 'edit/' + id;
    navigate(link);
  };

  const confirm = (id) => {
    // console.log(id);
    try {
      dispatch(deleteProduct(id)).then(() => {
        const params = {
          limit: 15,
          page: 1,
        };
        dispatch(getListProducts(params))
          .unwrap()
          .then((data) => setList(data.products));
      });
    } catch (error) {
      console.log(error);
    }
    message.success('Delete success!');
  };

  const cancel = (e) => {};

  const onFinish = (values) => {
    console.log(values);
    if (values.search) {
      setSearchParams({ search: values.search });
    } else {
      setSearchParams();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="my-4 mx-5 admin-products">
      <div className="admin-products__wrapper">
        <h2 className="admin-heading">List Product</h2>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className="admin-products__search">
          <Form.Item label="" name="search" className="admin-products__search__input">
            <Input placeholder="Search..." />
          </Form.Item>
          <Form.Item className="admin-products__search__btn">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        dataSource={list}
        pagination={{
          total: totalProduct,
          pageSize: 15,
          onChange: onChange,
        }}
      >
        <Column title="ID" key="index" render={(value, item, index) => (pageCurrent - 1) * 15 + index + 1} />
        <Column
          title="Product Thumbnail"
          dataIndex="productThumbnail"
          key="product_thumbnail"
          render={(productThumbnail) => <img src={productThumbnail} />}
        />
        <Column title="Product Name" dataIndex="productName" key="product_name" />
        <Column title="Product Code" dataIndex="productCode" key="product_code" />
        <Column title="Selling Price" dataIndex="sellingPrice" key="selling_price" />
        <Column title="Discount Price" dataIndex="discountPrice" key="discount_price" />
        <Column title="Product Size" dataIndex="productSize" key="product_size" />
        <Column title="Product Color" dataIndex="productColor" key="product_color" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={(event) => handleEdit(record.id)}>Edit</a>
              <Popconfirm
                title="Delete product"
                description="Are you sure to delete this product?"
                onConfirm={(e) => confirm(record.id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default Products;
