import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */
const Signin: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <>
            <Row style={{ maxWidth: '100%', minHeight: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Col span={24} style={{ maxWidth: '500px' }}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item>
                            <h1>Sign In</h1>
                        </Form.Item>
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99, required: true }]}>
                            <InputNumber style={{display: 'block'}}/>
                        </Form.Item>
                        <Form.Item name={['user', 'adress']} label="Adress">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'company']} label="Company's name">
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>
        </>
    );
}

export default Signin;