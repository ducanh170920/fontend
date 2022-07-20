import { Button, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

interface prop {
    visible: boolean,
    handleOk(): void,
    handleCancel(): void,
    urlDetail: any,
    url: string,
}

const { Option } = Select;

const UrlModal: React.FC<prop> = (props) => {
    const [form] = Form.useForm();
    const { visible, handleCancel, handleOk, urlDetail } = props;
    const onFinish = (values: any) => {
        console.log('Received values from form: ', values);
    };
    useEffect(() => {
        const data = {
            url: urlDetail.url,
            search: urlDetail,
            title: urlDetail.title,
        }
        form.setFieldsValue(data);
    }, [form]);
    return (
        <>
            <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <Form
                    name="customized_form_controls"
                    layout="inline"
                    onFinish={onFinish}
                    style={{ width: '100%' }}
                    form={form}
                >
                    <Row style={{ width: '100%' }}>
                        <Col span={15}>
                            <Form.Item name="url" style={{ paddingRight: '8px' }}>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="dataset" style={{ padding: '0 8px' }}>
                                <Select>
                                    <Option value="rmb">Test1</Option>
                                    <Option value="dollar">Test2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider orientation="left" orientationMargin="0">
                    <h3>Content</h3>
                </Divider>
                <Form
                    name="customized_form_controls"
                    layout="inline"
                    onFinish={onFinish}
                    style={{ width: '100%' }}
                    form={form}
                >
                    <Form.Item name="search" style={{ width: '100%', margin: '15px 0' }}>
                        <Input prefix={<SearchOutlined />} />
                    </Form.Item>
                    <Form.Item name="title" style={{ width: '100%', margin: '15px 0' }}>
                        <h2 style={{ display: 'block', width: '100%', }}>Me bau</h2>
                    </Form.Item>
                    <Form.Item name="description" style={{ width: '100%' }}>
                        <TextArea style={{ width: '100%', minHeight: '400px' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UrlModal;
