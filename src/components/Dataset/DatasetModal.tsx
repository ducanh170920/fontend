import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Row, Col, Divider, Modal } from 'antd';
import 'antd/dist/antd.min.css';
import TextArea from 'antd/lib/input/TextArea';
import { ACTION } from '../../constants/Common.constant';
const { Option } = Select;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};

interface prop {
    action: string;
    visible: boolean,
    initValues: IInitDataSetValue,
    handleOk:(data: any) =>  void,
    handleCancel(): void,
}

interface ICriticalValue {
    andor: string,
    type: string,
    description: string
}
export interface IInitDataSetValue {
    criticals: ICriticalValue[],
    andor_all: string,
    status: string,
    title: string,
    description: string,
    top_relate: string,
    key: number,
}

const DatasetModel: React.FC<prop> = (props) => {
    const { visible, handleCancel, handleOk } = props;
    const [form] = Form.useForm();
    const {action, initValues} = props;
    
    const onFinishCritical = (values: any) => {
        console.log("Received values of form:", values,111, form.getFieldValue('criticals'));
    };
    const handleChangeType = (key: string) => {
        form.setFieldsValue({ [key]: true });
    };
    const onFinish = (values: any) => {
        console.log(values);
        const rule = {
            concat_rule: form.getFieldValue('andor_all'),
            type: 'group',
            val: [],
        }
        const criticals = form.getFieldValue('criticals');
        const val = criticals.map((critical: any) => {
            return {
                type: critical.type,
                val: critical.description.split(','),
                concat_rule: critical.andor
            }
        });
        rule.val = val;
        const data = {
            rule: JSON.stringify(rule),
            description: form.getFieldValue('description'),
            title: form.getFieldValue('title'),
            is_active:  form.getFieldValue('status'),
            id: initValues.key,
        }
        handleOk(data);
    };


    useEffect(() => {
        console.log('df', initValues);
        action === ACTION.add && form.resetFields();
        form.setFieldsValue(initValues);
    }, [initValues])
    return (
        <>
            <Modal title="Dataset Modal" visible={visible} onOk={onFinish} onCancel={handleCancel} width={800}>
                <div style={{ maxWidth: '1800px', margin: '15px auto', padding: '15px', border: '1px solid rgb(208 208 215)', borderRadius: '5px' }}>
                    <Divider orientation="left" orientationMargin="0">
                        <h3>Input Data</h3>
                    </Divider>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="title" label="Title" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item name="status" label="status" rules={[{ required: false }]} >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                            >
                                <Option value={true}>Active</Option>
                                <Option value={false}>No Active</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <Divider orientation="left" orientationMargin="0">
                        <h3>Critical</h3>
                    </Divider>
                    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinishCritical} autoComplete="off">
                        <Form.List name="criticals" >
                            {(fields, { add, remove }) => (
                                <>
                                    {(fields).map(({ key, name, ...restField }) => (
                                        <>
                                        <Row key={name}>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'type']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing type name',
                                                        },
                                                    ]}
                                                    style={{ padding: '0 8px' }}
                                                >
                                                    <Select placeholder="--- Select item ---" onChange={() => handleChangeType(`type${key}`)}>
                                                        <Option value="domain">Domain</Option>
                                                        <Option value="tag">Tag</Option>
                                                        <Option value="url">Url</Option>
                                                        <Option value="category">Category</Option>
                                                        <Option value="keyword">Keyword</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'description']}
                                                    style={{ padding: '0 8px' }}
                                                >
                                                    <Input disabled={action === 'add' && !form.getFieldValue(`type${key}`)} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'andor']}
                                                    style={{ padding: '0 8px' }}
                                                    initialValue="or"
                                                >
                                                    <Select>
                                                        <Select.Option value="or">OR</Select.Option>
                                                        <Select.Option value="and">AND</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2} style={{ paddingTop: '5px' }}>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Col>
                                        </Row>
                                        {/* {action === ACTION.add && (remove(name))} */}
                                        </>
                                    ))}
                                    <Row>
                                        <Col span={4}>
                                            <Form.Item style={{ width: 100 }}>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add filter
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                        <Col span={4} offset={16}>
                                            <Form.Item name='andor_all' style={{ width: 100 }}>
                                                <Select defaultValue="or">
                                                    <Select.Option value="or">OR</Select.Option>
                                                    <Select.Option value="and">AND</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Form.List>
                        {/* <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default DatasetModel;