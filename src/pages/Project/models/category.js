import { add, query, remove, treeList, update } from '@/services/project/projectCategory';
import { projectCategory as api } from '@/services/api';

export default {
  namespace: 'projectCategory',

  state: {
    list: [],
    item: {},
    editVisible: false,
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },

    // 条目数据
    item(state, { payload }) {
      return { ...state, item: payload };
    },

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },
  },

  effects: {
    // 列表
    *listRemote(_, { call, put }) {
      const response = yield call(treeList);
      if (response) {
        const { resp } = response;
        yield put({ type: 'list', payload: resp });
        yield put({ type: 'updateGlobalCategory' });
      }
    },

    // 新增
    *addRemote({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response) {
        yield put({ type: 'listRemote' });
        yield put({ type: 'toggleEdit', payload: false });

        if (callback) callback();
      }
    },

    // 修改
    *updateRemote({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (response) {
        yield put({ type: 'listRemote' });
        yield put({ type: 'toggleEdit', payload: false });

        if (callback) callback();
      }
    },

    // 删除
    *removeRemote({ payload, callback }, { call, put }) {
      const response = yield call(remove, { id: payload.id });
      if (response) {
        yield put({ type: 'listRemote' });

        if (callback) callback();
      }
    },

    // 查询
    *queryRemote({ payload = {} }, { put, call }) {
      yield put({ type: 'toggleEdit', payload: true });
      const response = yield call(query, { id: payload.id });
      if (response) {
        const { resp } = response;
        yield put({ type: 'item', payload: resp });
      }
    },

    // 更新全局分类
    *updateGlobalCategory(_, { put, select }) {
      const data = yield select(({ projectCategory }) => projectCategory.list);
      yield put({
        type: 'global/queryData',
        payload: { data, url: api.treeList },
      });
    },
  },
};
