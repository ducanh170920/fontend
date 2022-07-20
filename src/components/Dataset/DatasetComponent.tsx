import { Button, message, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { httpGet, httpPut } from '../../commons/Api.common';
import { GET_ALL_DATASET } from '../../constants/ApiPath.constant';
import { ACTION } from '../../constants/Common.constant';
import DatasetModel from './DatasetModal';

interface DataType {
  key: string;
  title: string;
  status: number;
  description: string;
  update_time: string;
}

const DatasetComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState<string>('');
  const [test, setTest] = useState<any>({});
  const [datasetList, setDatasetList] = useState<any>([]);
  const showModal = (action: string, record: any) => {
    if ( action === ACTION.edit ) {
      const rule = JSON.parse(record.rule);
      const ruleVal = rule.val;
      const criticals = ruleVal.map((val: any) => {
        return {
          andor: val.concat_rule,
          type: val.type,
          description: val.val.join(),
        }
      })
      const recordDetail = {
        key: record.key,
        status: record.status,
        title: record.title,
        description: record.description,
        andor_all: rule.concat_rule,
        criticals,
        top_relate: record.top_relate,
        type: record.type,
      }
      setTest(recordDetail);
    } else {
      setTest({});
    }
    setAction(action);
    setIsModalVisible(true);
  };

  const handleOk = async (data: any) => {
    httpPut(('/datasets/'+ data.id), data).then(res => {
      const getAllDataset = async () => {
        const res = await httpGet(GET_ALL_DATASET);
        const data = res.data.data;
        const datasets: any[] = data.map((dataset: any) => {    
          console.log(dataset.active);
              
          return {
            key: dataset.datasetId,
            title: dataset.title,
            description: dataset.description,
            update_time: dataset.timeUpdate,
            status: dataset.active,
            rule: dataset.rule,
            top_relate: dataset.top_relate,
          }
        });
        setDatasetList(datasets);
      }
      getAllDataset();
    })
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handelDeletDataset = (e?: React.MouseEvent<HTMLElement>) => {
    message.success('Delete success');
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      render: key => <a>{key}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Update Time',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(ACTION.edit, record)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this dataset?"
            onConfirm={handelDeletDataset}
            onCancel={cancelDeleteDataset}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];



  const cancelDeleteDataset = (e?: React.MouseEvent<HTMLElement>) => {
  };

  useEffect(() => {
    const getAllDataset = async () => {
      const res = await httpGet(GET_ALL_DATASET);
      const data = res.data.data;
      const datasets: any[] = data.map((dataset: any) => {    
        console.log(dataset.active);
            
        return {
          key: dataset.datasetId,
          title: dataset.title,
          description: dataset.description,
          update_time: dataset.timeUpdate,
          status: dataset.active,
          rule: dataset.rule,
          top_relate: dataset.top_relate,
        }
      });
      setDatasetList(datasets);
    }
    getAllDataset();
  }, [])
  return (
    <>
      <DatasetModel
        action={action}
        visible={isModalVisible}
        initValues={test}
        handleCancel={handleCancel}
        handleOk={(data: any) => handleOk(data)}
      ></DatasetModel>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Dataset Manager</h1>
      <Button type="primary" style={{ marginBottom: '15px' }} onClick={() => showModal(ACTION.add, {})}>Add</Button>
      <Table columns={columns} dataSource={datasetList} />
    </>
  )
}

export default DatasetComponent;
