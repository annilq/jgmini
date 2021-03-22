import { list,exportList } from '@/services/supply/depotDetail';
import { pageListByMaterial } from '@/services/supply/depotInOutDetail';
import { list as depot } from '@/services/database/depot';

export default {
  namespace: 'depotDetail',

  state: {
    params: {},
    subParams: {},
    data: {
      list: [],
    },
    depot: [],
    item: {},
    subData: {
      list: [],
    },
    editVisible: false,
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: payload.data,
        params: payload.params,
      };
    },

    // 条目数据
    item(state, { payload }) {
      return { ...state, item: payload };
    },

    params(state, { payload }) {
      return { ...state, params: payload };
    },

    depot(state, { payload }) {
      return { ...state, depot: payload };
    },
    subData(state, { payload }) {
      return {
        ...state,
        subData: payload.data,
        subParams: payload.params,
      };
    },
    // 编辑开关
    toggleEdit(state, { payload }) {
      return {
        ...state,
        editVisible: payload,
        item: payload ? {} : state.item,
        subParams: payload ? {} : state.subParams,
        subData: payload ? {} : state.subData,
      }; // 避免关闭体验不佳
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
            data: resp,
            params: payload,
          },
        });
      }
    },

    *exportRemote({ callback }, { select, call }) {
      const params = yield select(({ depotDetail }) => depotDetail.params);
      const baseResp = yield call(
        exportList,
        params
      );
      if (baseResp) {
        callback(baseResp)
      }
    },
    // 分页
    *pageRemote({ payload }, { put, select }) {
      const params = yield select(({ depotDetail }) => depotDetail.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload } });
    },

    *pageSubRemote({ payload }, { put, select }) {
      const params = yield select(({ depotDetail }) => depotDetail.subParams);
      yield put({ type: 'queryRemote', payload: { ...params, ...payload } });
    },

    // 查询
    *queryRemote({ payload = {} }, { put, call, select }) {
      yield put({ type: 'toggleEdit', payload: true });
      const params = yield select(({ depotDetail }) => depotDetail.params);
      const response =
        params && params.depotId
          ? yield call(pageListByMaterial, { ...payload, depotId: params.depotId })
          : yield call(pageListByMaterial, payload);
      if (response) {
        const { resp } = response;
        yield put({ type: 'item', payload });
        yield put({
          type: 'subData',
          payload: {
            data: resp,
            params: payload,
          },
        });
      }
    },

    *depotRemote({ payload }, { call, put }) {
      const response = yield call(depot, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'depot',
          payload: resp.list,
        });
      }
    },
  },
};
