import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/soundpipe': {
      component: dynamicWrapper(app, ['soundpipe'], () => import('../routes/Dashboard/SoundPipe/index')),
    },
    '/waterpot': {
      component: dynamicWrapper(app, ['waterpot'], () => import('../routes/Dashboard/WaterPot/index')),
    },
    '/scalemodel': {
      component: dynamicWrapper(app, [], () => import('../routes/Dashboard/ScaleModel/index')),
    },
    '/msgmanage/sample': {
      component: dynamicWrapper(app, ['soundpipe'], () => import('../routes/MsgManage/SampleManage')),
    },
    '/msgmanage/backing': {
      component: dynamicWrapper(app, [], () => import('../routes/MsgManage/BackingManage')),
    },
    '/msgmanage/inner': {
      component: dynamicWrapper(app, [], () => import('../routes/MsgManage/InnerManage')),
    },
    '/msgmanage/outer': {
      component: dynamicWrapper(app, [], () => import('../routes/MsgManage/OuterManage')),
    },
    '/msgmanage/test': {
      component: dynamicWrapper(app, [], () => import('../routes/MsgManage/TestManage')),
    },
    '/msgmanage/experment': {
      component: dynamicWrapper(app, [], () => import('../routes/MsgManage/ExpermentManage')),
    },
    '/msgmanage/lay': {
      component: dynamicWrapper(app, [], () => import('../routes/MsgManage/LayManage')),
    },
    '/datamanager/sounddata': {
      component: dynamicWrapper(app, ['soundpipe'], () => import('../routes/DataManager/SoundData')),
    },
    '/datamanager/waterpotdata': {
      component: dynamicWrapper(app, [], () => import('../routes/DataManager/WaterPotData')),
    },
    '/datamanager/scaledata': {
      component: dynamicWrapper(app, [], () => import('../routes/DataManager/ScaleData')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
