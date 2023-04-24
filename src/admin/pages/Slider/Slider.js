
import { Button, Form, Input, message, Popconfirm, Space, Table, Upload } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBanner, getListBanner } from '../../../app/bannerSlice'
import { ElementLayout } from '../../components'

const Slider = () => {
    const dispatch = useDispatch();

    const [list, setList] = useState([]);

    useEffect(() => {
        try {
            dispatch(getListBanner()).unwrap().then(data => setList(data.topSlider));
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
        // console.log("value", values);
        const formData = convertForm(values);
        try {
            dispatch(createBanner(formData)).then(() => {
                message.success("Add banner success!");
                dispatch(getListBanner()).unwrap().then(data => setList(data.topSlider));
            })
        } catch (error) {
            console.log(error);
        }
    }

    const convertForm = (values) => {
        const formData = new FormData();
        formData.append('image', values.image.file);
        formData.append('alt', values.title);
        formData.append('position', 'top');

        return formData;
    }


    return (
        <div>
            <ElementLayout  
                title='Slider'
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

export default Slider