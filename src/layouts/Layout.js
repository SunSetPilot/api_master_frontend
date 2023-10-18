import React from 'react';
import { connect } from 'dva';
import Cookies from 'js-cookie';
import { Redirect, Route, Switch } from 'dva/router';


function Layout(props) {
  const routerData = props.routerData;
  let userLoggedIn = Cookies.get('JSESSIONID');
  if (!userLoggedIn && props.location.pathname !== '/login') {
    return (<Redirect to="/login" />)
  } else if (userLoggedIn && props.location.pathname !== '/project') {
    return (<Redirect to="/project" />)
  }
  return (
    <Switch>
      <Route path={props.location.pathname} component={routerData[props.location.pathname].component}/>
      <Redirect from="/" to="/login" />
    </Switch>
  )
}
export default connect(({ user }) => ({ user }))(Layout);