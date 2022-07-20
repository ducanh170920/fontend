import { message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import BannerModel from './BannerModal';

interface DataType {
  key: string;
  description: string;
  image: string;
  url: string;
  update_time: string;
}

const data: DataType[] = [
  {
    key: '1',
    url: 'John Brown',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9PT4BnHehPBafeQLY-XBJTieuy2xywG--TXN6KGGDQH7j4P6YlaHsCulKHCzq5b1r9U&usqp=CAU',
    update_time: '2009-06-15T13:45:30',
    description: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    url: 'John Brown 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9PT4BnHehPBafeQLY-XBJTieuy2xywG--TXN6KGGDQH7j4P6YlaHsCulKHCzq5b1r9U&usqp=CAU',
    update_time: '2009-06-15T13:45:30',
    description: 'New York No. 1 Lake Park',
  },
  {
    key: '3',
    url: 'John Brown 3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9PT4BnHehPBafeQLY-XBJTieuy2xywG--TXN6KGGDQH7j4P6YlaHsCulKHCzq5b1r9U&usqp=CAU',
    update_time: '2009-06-15T13:45:30',
    description: 'New York No. 1 Lake Park',
  },
];

const BannerComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log(11111111);

    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handelDeleteBanner = (e?: React.MouseEvent<HTMLElement>) => {
    message.success('Delete success');
  };

  const cancelDeleteBanner = (e?: React.MouseEvent<HTMLElement>) => {
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: '1',
      render: key => <a>{key}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: '2',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: '3',
      render: image => <img style={{ width: '150px' }} src={image}></img>
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: '4',
    },
    {
      title: 'Update Time',
      dataIndex: 'update_time',
      key: '5',
    },
    {
      title: 'Action',
      key: '6',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showModal}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this banner?"
            onConfirm={handelDeleteBanner}
            onCancel={cancelDeleteBanner}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <BannerModel
        visible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></BannerModel>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Banner Manager</h1>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default BannerComponent;