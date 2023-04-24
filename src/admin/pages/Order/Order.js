import React, { useEffect, useState } from 'react'
import { ElementLayout } from '../../components'
import { useDispatch } from 'react-redux';
import { getListBanner } from '../../../app/bannerSlice';

const Order = () => {
  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      dispatch(getListBanner()).unwrap().then(data => setList(data.bottomSlider));
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleEdit = (values) => {
    console.log("edit");
    console.log(values);
  }

  const handleDelete = (id) => {
    console.log(id);
  }
  const handleFinish = (values) => {
    console.log("value", values);
  }

  return (
    <div>
      <ElementLayout
        title='Order'
        listdata={list}
        imageurl='url'
        nameItem='alt'
        confirm={handleDelete}
        onSubmit={handleFinish}
        onSubmitEdit={handleEdit}
      />
    </div>
  )
}

export default Order
