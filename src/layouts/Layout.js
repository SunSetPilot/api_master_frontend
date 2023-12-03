import React from 'react';
import { connect } from 'dva';
import Cookies from 'js-cookie';
import { Redirect, Switch } from 'dva/router';
import CommonLayout from './CommonLayout';
import InitLayout from './InitLayout';


function Layout(props) {
  const routerData = props.routerData;
  const currentPath = props.location.pathname; // current URL path

  let userLoggedIn = Cookies.get('JSESSIONID');
  // if (!userLoggedIn && props.location.pathname !== '/login') {
  //   return (<Redirect to="/login" />)
  // } else if (userLoggedIn && props.location.pathname !== '/project') {
  //   return (<Redirect to="/project" />)
  // }

  function pathMatchRouter() {
    const pathList = Object.keys(routerData);
    let newPath = currentPath;
    return pathList.find(path => {
      // path in routerData
      if (path === currentPath) return path;

      // path contain id, replace number to :id so that it can match the routerData
      if (/\d/.test(currentPath)) {
        const cPathList = currentPath.split('/');
        const newCPath = cPathList.map(p => {
          if (Number(p)) return ':id'
          return p;
        }).join('/');
        if (path === newCPath) return path;
      }
      return false;
    })
  }

  const path = pathMatchRouter(); // path match RouterData or false
  function getLayout() {
    if (path && (path === '/login' || path === '/register')) {
      // Layout for login and register pages, includes banner
      return (<InitLayout path={path} routerData={routerData} />)
    } else if (path && path !== '/') {
      // Layout for common pages, includes header, footer
      return (<CommonLayout path={path} routerData={routerData} />)
    }<Redirect from="/" to="/login" />
  }

  return (
    <Switch>
      { getLayout() }
      <Redirect from="/" to="/login" />
    </Switch>
  )
}
export default connect(({ user }) => ({ user }))(Layout);