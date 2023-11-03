import { message } from 'antd';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { createCategory, deleteCategory, getListCategory, updateCategory } from '../../../app/CategorySlice';
import { ElementLayout } from '../../components';

const Category = () => {
  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      dispatch(getListCategory())
        .unwrap()
        .then((data) => setList(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEdit = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append('categoryName', values.title);
    formData.append('file', values.image.file);
    const id = values.id;
    try {
      dispatch(updateCategory({ id, formData })).then(() => {
        dispatch(getListCategory())
          .unwrap()
          .then((listCategory) => setList(listCategory));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteCategory(id)).then(() => {
        dispatch(getListCategory())
          .unwrap()
          .then((listCategory) => setList(listCategory));
        message.success('Delete success!');
      });
    } catch (error) {
      console.log(error);
      message.error('Cannot delete this category!');
    }
  };
  const handleFinish = (values) => {
    // const formData = convertForm(values);

    const formData = new FormData();
    formData.append('categoryName', values.title);
    formData.append('categoryIcon', values.image.file);
    try {
      dispatch(createCategory(formData)).then(() => {
        message.success('Add category success!');
        dispatch(getListCategory())
          .unwrap()
          .then((data) => setList(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const convertForm = (data) => {

  //   return formData;
  // }

  return (
    <div>
      <ElementLayout
        title="Category"
        listdata={list}
        imageurl="categoryIcon"
        nameItem="categoryName"
        confirm={handleDelete}
        onSubmit={handleFinish}
        onSubmitEdit={handleEdit}
      />
    </div>
  );
};

export default Category;
