import { Layout } from 'antd';
import { Route } from 'dva/router'

function InitLayout(props) {
  const routerData = props.routerData;
  return (
    <Layout>
      <Route path={props.path} component={routerData[props.path].component}/>
    </Layout>
  )
}

export default InitLayout;