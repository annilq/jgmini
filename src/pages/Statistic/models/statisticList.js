export default {
  namespace: 'statisticList',

  state: {
    detailListParams: {},
    detailList: {
      list: []
    }
  },

  reducers: {
    // 列表数据
    detailList(state, { payload }) {
      return {
        ...state,
        detailList: payload.data,
        detailListParams: payload.params,
      };
    },
  },

  effects: {
    // 列表
    *detailListRemote({ payload, serviceFn }, { call, put }) {
      const response = yield call(serviceFn, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'detailList',
          payload: {
            data: resp,
            params: payload,
          },
        });
      }
    },

    // 分页
    *pageByProjectRemote({ payload, serviceFn }, { put, select }) {
      const params = yield select(({ statisticList }) => statisticList.detailListParams);
      yield put({ type: 'detailListRemote', payload: { ...params, ...payload }, serviceFn });
    },
  },
};
