import { message, Popconfirm, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getListUser } from '../../../app/UserSlice';

const AdminUser = () => {
  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      const params = {
        limit: 15,
        page: 1,
        role: 2,
        // keyword: '',
      };
      dispatch(getListUser(params))
        .unwrap()
        .then((data) => setList(data.users));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const confirm = (id) => {
    message.success('Delete success!');
  };
  const cancel = (e) => {};

  return (
    <div className="my-4 mx-5 admin-user">
      <h2 className="admin-heading">List User</h2>
      <Table dataSource={list} pagination={false}>
        <Column title="Index" key="index" render={(value, item, index) => index + 1} />
        <Column title="Avatar" dataIndex="image" key="avatar" render={(image) => <img src={image} />} />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Full name" dataIndex="full_name" key="full_name" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        {/* <Column title="Address" dataIndex="address" key="address" /> */}
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
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

export default AdminUser;
