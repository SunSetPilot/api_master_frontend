import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
} from 'antd';
import './index.css';

function LoginPage() {
  return (
    <Card title="Login">
      <Button>Sign in</Button>
    </Card>
  );
}

LoginPage.propTypes = {
};

export default connect()(LoginPage);
