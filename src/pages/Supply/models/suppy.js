import { list } from '@/services/database/material';
import { list as depotList } from '@/services/supply/depotDetail';
import { list as detailList } from '@/services/supply/depotInOutDetail';
import { list as checkdetailList } from '@/services/supply/depotCheckDetail';

export default {
  namespace: 'suppy',

  state: {
    params: {},
    data: {
      list: [],
      pagination: {},
    },
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: { list: payload.list, pagination: payload.pagination },
        params: payload.params,
      };
    },
  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'list',
          payload: {
            list: resp.list,
            pagination: {
              current: resp.currentPage,
              pageSize: resp.pageSize,
              total: resp.totalSize,
            },
            params: payload,
          },
        });
      }
    },
    // 详情
    *queryDetails({ payload, callback }, { call }) {
      const response = yield call(detailList, payload);
      if (response) {
        const { resp } = response;
        if (callback) callback(resp);
      }
    },
    // 获取库存盘点详情
    *queryCheckDetails({ payload, callback }, { call }) {
      const response = yield call(checkdetailList, payload);
      if (response) {
        const { resp } = response;
        if (callback) callback(resp.list);
      }
    },
    // 获取仓库详情
    *querydepotList({ payload, callback }, { call }) {
      const response = yield call(depotList, payload);
      if (response) {
        const { resp } = response;
        if (callback) callback(resp.list);
      }
    },
  },
};
