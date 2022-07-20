import { message, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import CampaignModal from './CampaignModal';

interface DataType {
    key: string;
    name: string;
    description: string;
    dataset_id: number;
}

const CampaignComponent: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handelDeleteCampaign = (e?: React.MouseEvent<HTMLElement>) => {
        message.success('Delete success');
    };

    const cancelDeleteCampaign = (e?: React.MouseEvent<HTMLElement>) => {
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
            title: 'Name',
            dataIndex: 'name',
            key: '3',
        },
        {
            title: 'Dataset id',
            dataIndex: 'dataset_id',
            key: '4',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={showModal}>Edit</a>
                    <Popconfirm
                        title="Are you sure to delete this campaign?"
                        onConfirm={handelDeleteCampaign}
                        onCancel={cancelDeleteCampaign}
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
            name: 'John Brown',
            dataset_id: 1,
            description: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'John Brown 2',
            dataset_id: 2,
            description: 'New York No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'John Brown 3',
            dataset_id: 3,
            description: 'New York No. 1 Lake Park',
        },
    ];
    
    return (
        <>
            <CampaignModal
                visible={isModalVisible}
                handleCancel={handleCancel}
                handleOk={handleOk}
            ></CampaignModal>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Campaign Manager</h1>
            <Table columns={columns} dataSource={data} />
        </>
    )
}

export default CampaignComponent;