import React from 'react';
import { connect } from 'dva';
import Cookies from 'js-cookie';
import {
  Card,
  Button,
  Form,
  Input,
  Checkbox,
  message,
} from 'antd';
import Banner from '../components/Banner';
import styles from './index.less';

function LoginPage(props) {
  async function login(values) {
    let res = await props.dispatch({
      type: 'user/loginUser',
      payload: {
        ...values
      },
    });
    if(res.status === 200) {
      message.success('Login successfully!');
      props.history.push({
        pathname: '/example',
      });
    } else {
      message.error(res && res.message);
    }
  }

  const onFinish = (values) => {
    login(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Banner />
        <Card className={styles.loginCard}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h2 className={styles.loginCardTitle}>USER LOGIN</h2>
            <Form.Item label="Email" name="user_email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="user_password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className={styles.forgotPwd}>Forgot password?</a>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <a className={styles.createNewAccount} onClick={() => props.history.push('/register')}>Not a member? Create a new account</a>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default connect(({ user }) => ({ user }))(LoginPage);
