import { Form, Input, Popconfirm, Space, Table, Upload } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useRef } from 'react'
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ElementLayout = (props) => {

    const [form] = Form.useForm();
    const btnSubmitRef = useRef();
    const uploadRef = useRef();
    const [initialValues, setInitialValues] = useState(null);
    const [fileList, setFileList] = useState(null);

    const { title, listdata, imageurl, nameItem, confirm, onSubmit, onSubmitEdit } = props;

    const onClickEdit = (id) => {
        const itemEdit = listdata.find(item => item.id === id);
        btnSubmitRef.current.innerHTML = "Update";
        setFileList([{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: itemEdit[imageurl],
        }])
        console.log("upload",uploadRef.current);
        const formEdit = {
            id: id,
            title: itemEdit[nameItem],
            image: itemEdit[imageurl],
        }
        setInitialValues(formEdit);
        form.setFieldsValue(formEdit);
        console.log('edit', fileList);
    }

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const cancel = (e) => {
    };

    const resetForm = () => {
        setInitialValues({ title: "" })
        form.setFieldsValue({ title: "" });
        form.resetFields();
        setFileList([]);
        btnSubmitRef.current.innerHTML = "Create";
    }

    const onFinish = (values) => {
        if (btnSubmitRef.current.innerText === "Update") {
            // console.log(values);
            onSubmitEdit(values);
            resetForm();
        } else {
            onSubmit(values);
            resetForm();
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='element-layout my-4 mx-5'>
            <h2 className='admin-heading'>{title}</h2>
            <Row>
                <Col sm={7}>
                    <Table
                        dataSource={listdata}
                        pagination={false}
                    >
                        <Column title="Image" dataIndex={imageurl} key={imageurl} render={(imageurl) => <img src={imageurl} />} />
                        <Column title="Title" dataIndex={nameItem} key={nameItem} />
                        <Column
                            title="Action"
                            key="action"
                            dataIndex="id"
                            render={(_, record) => (
                                <Space size="middle">
                                    <a onClick={(event) => onClickEdit(record.id)}>Edit</a>
                                    <Popconfirm
                                        title="Delete banner"
                                        description={`Are you sure to delete this ` + {title} +`?`}
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
                </Col>
                <Col sm={5}>
                    <Form
                        form={form}
                        initialValues={initialValues}
                        // layout="vertical"    
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                        name="id"
                        className='d-none'
                        >
                            <Input />
                        </Form.Item>
                        <  Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose image!',
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                accept="image/png, image/jpeg, "
                                listType="picture-card"
                                maxCount={1}
                                fileList={fileList}
                                onChange={handleChange}
                                ref={uploadRef}
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
                        <Form.Item className='mx-3'>
                            <Button type="primary" htmlType="submit" ref={btnSubmitRef}>
                                Create
                            </Button>
                            <Button className='mx-2' type='reset' onClick={resetForm}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ElementLayout
