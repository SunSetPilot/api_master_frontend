import { Layout } from 'antd';
import { Route } from 'dva/router'
import styles from './index.less';

const { Header, Content, Footer } = Layout;

function CommonLayout(props) {
  const routerData = props.routerData;
  return (
    <Layout>
      <Header></Header>
      <Content className={styles.content}>
        <Route path={props.path} component={routerData[props.path].component}/>
      </Content>
      <Footer className={styles.footer}> @copyright API </Footer>
    </Layout>
  )
}

export default CommonLayout;