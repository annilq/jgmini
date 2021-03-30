import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

import { findMenuList } from '@/services/system/user';

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.url] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};


// 获取当前的的router配置项，里面包含service，formcode
export const getCurRouterConfigByParams = (params, routerData = []) => {
  const compareArr = Object.keys(params).filter(item => !!params[item]);
  const routesIterator = [...routerData];
  const matchRouter = [];
  while (routesIterator.length > 0) {
    const curRouter = routesIterator.shift();
    const match = compareArr.every(key => params[key] === curRouter[key] && curRouter.formCode);
    if (match) {
      matchRouter.push(curRouter);
    }
    if (curRouter.routes) {
      const router = getCurRouterConfigByParams(params, curRouter.routes);
      if (router.length > 0) {
        matchRouter.push(...router);
      }
    }
  }
  return matchRouter;
};

export const getStateData = stateKey => {
  const state = window.g_app._store.getState();
  return get(state, stateKey);
};

export const getRouterConfig = (params) => {
  const routerData = getStateData('menu.routerData');
  const curRouter = getCurRouterConfigByParams(params, routerData)[0];
  return { ...curRouter };
};

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
    curRouter: {},
  },

  effects: {
    *getMenuData({ callback }, { put, call }) {
      const response = yield call(findMenuList);
      if (response) {
        const { data } = response;
        yield put({
          type: 'save',
          payload: { menuData: data },
        });
        if(callback){
          callback(data)
        }
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurRouter(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
