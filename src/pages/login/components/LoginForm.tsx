/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 14:40:05
 * @LastEditTime: 2022-08-05 10:02:27
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { HOME_URL } from '@/config/index'
import { useNavigate } from 'react-router-dom';
import { Login } from '@/config/interface';
import { loginApi } from '@/api/modules/login'
import { setToken } from '@/store/global';
import { setTabsList } from '@/store/tabs';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (LoginForm: Login.ReqLoginForm) => {
    try {
      setLoading(true);
      // loginForm.password = md5(loginForm.password);
      const { data } = await loginApi(LoginForm);
      dispatch(setToken(data?.access_token));
      data?.access_token && localStorage.setItem('token', data?.access_token)
      dispatch(setTabsList([]));
      message.success("登录成功！");
      navigate(HOME_URL);
    } finally {
      setLoading(false);
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return <Form
    form={form}
    name="basic"
    labelCol={{ span: 5 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    size="large"
    autoComplete="off"
  >
    <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
      <Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
      <Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
    </Form.Item>
    <Form.Item className="login-btn">
      <Button
        onClick={() => {
          form.resetFields();
        }}
        icon={<CloseCircleOutlined />}
      >
        取消
      </Button>
      <Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
        确认
      </Button>
    </Form.Item>
  </Form>
}

export default LoginForm