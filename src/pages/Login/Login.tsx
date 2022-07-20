import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { httpPost } from '../../commons/Api.common';
import { LOGIN } from '../../constants/ApiPath.constant';
interface ILogin {
    username: string,
    password: string,
}
const Login: React.FC = () => {
    const navigate = useNavigate()
    const authContext = React.useContext(AuthContext);
    const onFinish = async (values: any) => {
        console.log('Success:', values.username);
        const body: ILogin = {
            username: values.username,
            password: values.password,
        }
        await httpPost(LOGIN, body).then((response: any) => {            
            const data = JSON.parse(response.data.data.replace(/'/g, '"'));
            if (data.jwt) {
                localStorage.setItem('token', data.jwt);
                authContext.user = { name: values.username }
                navigate('/admin');
            }
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Row style={{ maxWidth: '100%', minHeight: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Col span={24} style={{ maxWidth: '400px' }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item>
                            <h1 style={{ textAlign: 'center' }}>Login</h1>
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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

export default Login;