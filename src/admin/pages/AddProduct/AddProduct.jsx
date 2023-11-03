import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Upload } from 'antd';
import AntdInputTag from 'antd-input-tag';
import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListCategory } from '../../../app/CategorySlice';
import { createProduct, getDetail, updateProduct } from '../../../app/ProductSlice';
import './AddProduct.scss';

const { TextArea } = Input;

const AddProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [listCategory, setListCategory] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();

  const sizeRef = useRef();
  const [size, setSize] = useState([]);
  const colorRef = useRef();
  const [color, setColor] = useState([]);

  useEffect(() => {
    try {
      dispatch(getListCategory())
        .unwrap()
        .then((data) => {
          const list = [];
          data.map((item) =>
            list.push({
              value: item.id,
              label: item.categoryName,
            }),
          );
          setListCategory(list);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      try {
        dispatch(getDetail(id))
          .unwrap()
          .then((data) => {
            console.log(data);
            const formValue = {
              productName: data.productName,
              productCode: data.productCode,
              sellingPrice: data.sellingPrice,
              discountPrice: data.discountPrice,
              productDescription: data.productDescription,
              categoryId: data.categoryId,
              productImg: '',
              product3DModelPath: '',
            };

            setSize([data.productSize]);
            setColor(data.productColor);
            setInitialValues(formValue);
            form.setFieldsValue(formValue);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, form]);

  const onFinish = (values) => {
    const formData = convertForm(values);
    if (id) {
      dispatch(updateProduct(id, formData)).then(() => {
        message.success('Update product success!');
      });
    } else {
      dispatch(createProduct(formData)).then(() => {
        message.success('Add product success!');
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
    }
  };

  const convertForm = (values) => {
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('productCode', values.productCode);
    formData.append('productSize', sizeRef.current.changeVal().join(','));
    formData.append('productColor', colorRef.current.changeVal().join(','));
    formData.append('sellingPrice', values.sellingPrice);
    formData.append('discountPrice', values.discountPrice);
    formData.append('files', values.productThumbnail.file);
    formData.append('files', values.product3DModelPath.file);
    values.productImg.fileList.forEach((img) => {
      formData.append('files', img.originFileObj);
    });
    formData.append('productDescription', values.productDescription);
    formData.append('categoryId', values.categoryId);

    return formData;
  };
  return (
    <div className="addProduct">
      {id ? <h2 className="admin-heading">Edit Product</h2> : <h2 className="admin-heading">Add New Product</h2>}
      <div className="addProduct__form">
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        >
          <div className="addProduct__form__grid">
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[
                {
                  required: true,
                  message: 'Please input product name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Product Code"
              name="productCode"
              rules={[
                {
                  required: true,
                  message: 'Please input product code!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId">
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={listCategory}
              ></Select>
            </Form.Item>

            <div className="addProduct__form__tag">
              <label>Size</label>
              <AntdInputTag value={size} ref={sizeRef} />
            </div>

            <Form.Item
              label="Selling Price"
              name="sellingPrice"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="addProduct__form__tag">
              <label>Color</label>
              <AntdInputTag value={color} ref={colorRef} />
            </div>
            <Form.Item
              label="Discount Price"
              name="discountPrice"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="File 3D"
              name="product3DModelPath"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input!',
              //   },
              // ]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>3D model</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Description"
              name="productDescription"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            {/* <div className='addProduct__group'> */}
            <Form.Item
              label=""
              name="productThumbnail"
              // getValueFromEvent={({ file }) => file.originFileObj}
            >
              <Upload
                beforeUpload={() => false}
                // accept="image/png, image/jpeg, "
                listType="picture-card"
                maxCount={1}
              >
                <div>
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Image Thumbnail
                  </div>
                </div>
              </Upload>
              {/* <input type="file" name='file' /> */}
            </Form.Item>
            <Form.Item
              label=""
              name="productImg"
              // getValueFromEvent={({ file }) => file.originFileObj}
            >
              <Upload
                beforeUpload={() => false}
                // accept="image/png, image/jpeg, "
                listType="picture-card"
              >
                <div>
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Image
                  </div>
                </div>
              </Upload>
              {/* <input type="file" name='file' /> */}
            </Form.Item>
            {/* </div> */}
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
