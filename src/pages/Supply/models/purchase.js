import { PurNeedDetail, PurApplyDetail } from '@/services/purchase/index';

export default {
  namespace: 'purchase',

  state: {
    purNeedList: [],
    purApplyList: {
      pageList: { list: [] },
    },
    detailLists: [],
  },

  reducers: {
    // 采购计划详情
    purNeedList(state, { payload }) {
      return {
        ...state,
        purNeedList: payload.list,
      };
    },
    // 获取采购申请详情
    purApplyList(state, { payload }) {
      return {
        ...state,
        purApplyList: payload,
      };
    },
    // 明细列表
    detailLists(state, { payload }) {
      return {
        ...state,
        detailLists: payload.list,
      };
    },
  },

  effects: {
    // 采购计划详情
    *queryPurNeedDetail({ payload, callback }, { call, put }) {
      const response = yield call(PurNeedDetail.list, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'purNeedList',
          payload: {
            list: resp.list,
          },
        });
        if (callback) callback(resp.list);
      }
    },

    // 获取采购申请详情
    *queryPurApplyDetail({ payload, callback }, { call, put }) {
      const response = yield call(PurApplyDetail.list, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'purApplyList',
          payload: resp,
        });
        if (callback) callback(resp);
      }
    },
    // 获取仓库详情
    *querydepotList({ payload, callback }, { call, put }) {
      const response = yield call(PurNeedDetail.detail, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'detailLists',
          payload: {
            list: resp.list,
          },
        });
        if (callback) callback(resp.list);
      }
    },
  },
};
