import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { httpGet } from '../../commons/Api.common';
import { GET_ALL_USER } from '../../constants/ApiPath.constant';

interface IUserType {
  key: string;
  name: string;
  email: string;
  address: string;
}

const columns: ColumnsType<IUserType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


const CustomerComponent: React.FC = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getUserList = async () => {
      const res = await httpGet(GET_ALL_USER);
      const data = res.data.data;
      const users = data.map((user: any) => {
        return {
          key: user.userId,
          name: user.fullName,
          address: user.address,
          email: user.email,
        }
      });

      setUserList(users);
    }
    getUserList();
  }, []);
  return (
    <>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Customer Manager</h1>
      <Table columns={columns} dataSource={userList} />
    </>
  )
}

export default CustomerComponent;