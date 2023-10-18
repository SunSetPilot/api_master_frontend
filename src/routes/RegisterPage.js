import React, { Component } from 'react';
import { connect } from 'dva';
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

function RegisterPage(props) {
  async function createNewAccount(values) {
    console.log('props', props);
    let res = await props.dispatch({
      type: 'user/createUser',
      payload: {
        user_name: values.user_name,
        user_email: values.user_email,
        user_password: values.user_password,
      },
    });
    console.log(111,res);
    if(res && res.status == 200) {
      message.success('Create a new account successfully!')
      props.history.push({
        pathname: '/login',
      });
    }
  }

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
            initialValues={{}}
            onFinish={createNewAccount}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h2 className={styles.loginCardTitle}>NEW ACCOUNT</h2>
            <Form.Item label="Username" name="user_name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="user_email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="user_password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label="ResetPassword" name="Resetpassword"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
          <a className={styles.createNewAccount} onClick={() => props.history.push('/')}>Already have an account? Sign in</a>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default connect(({ user }) => ({ user }))(RegisterPage);
