import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  // eslint-disable-next-line no-underscore-dangle
  models: () => models.filter(m => !app._models.some(({ namespace }) => namespace === m)).map(m => import(/* webpackChunkName: "_models_[request]" */`../models/${m}.js`)),
  // add routerData prop
  component: () => {
    const routerData = getRouterData(app);
    return component().then((raw) => {
      const Component = raw.default || raw;
      return props => <Component {...props} routerData={routerData} />;
    });
  },
});

export const getRouterData = (app) => {
  return {
    '/': {
      component: dynamicWrapper(app, ['user',], () => import('../layouts/Layout')),
    },
    '/login': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/LoginPage')),
    },
    '/register': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/RegisterPage')),
    },
    '/project/:id': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/IndexPage')),
    },
    '/projects': {
      component: dynamicWrapper(app, ['project'], () => import('../routes/ProjectList')),
    },
  };
}