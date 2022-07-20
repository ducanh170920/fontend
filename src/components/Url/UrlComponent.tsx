import { message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { httpGet } from '../../commons/Api.common';
import { GET_URL_DETAIL } from '../../constants/ApiPath.constant';
import UrlModal from './UrlModal';

interface DataType {
  key: string;
  url: string;
}


const UrlComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [urlDataDetail, setUrlDataDetail] = useState({});

  const showModal = (url: string) => {
    setUrl(url);
    getDetailDataUrl(url).then(data => {
      setUrlDataDetail(data);
  });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handelDeleteUrl = (e?: React.MouseEvent<HTMLElement>) => {
    message.success('Delete success');
  };

  const cancelDeleteUrl = (e?: React.MouseEvent<HTMLElement>) => {
  };

  const getDetailDataUrl = async (url: string) => {
    const { data: urlDetail } = await httpGet(GET_URL_DETAIL, {
        url,
    });
    return urlDetail.data;
}

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: '1',
      render: key => <a>{key}</a>,
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: '2',
      render: key => {
        return (
          <a onClick={() => showModal(key)}>{key}</a>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <Popconfirm
            title="Are you sure to delete this url?"
            onConfirm={handelDeleteUrl}
            onCancel={cancelDeleteUrl}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      url: 'https://vnexpress.net/ruoc-dau-bang-12-xe-container-4477937.html',
    },
    {
      key: '2',
      url: 'https://vnexpress.net/ruoc-dau-bang-12-xe-container-4477937.html',
    },
    {
      key: '3',
      url: 'https://vnexpress.net/ruoc-dau-bang-12-xe-container-4477937.html',
    },
  ];

  return (
    <>
      <UrlModal
        visible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        url={url}
        urlDetail={urlDataDetail}
      ></UrlModal>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Url Manager</h1>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default UrlComponent;