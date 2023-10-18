import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/menu';

function RouterConfig({ history, app }) {

  const routerData = getRouterData(app);
  const SiteLayout = routerData['/'].component;

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" render={props => <SiteLayout {...props} />} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
