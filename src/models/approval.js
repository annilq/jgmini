import {
  approval,
  reject,
  pass,
  viewProcess,
  auditList,
  getCanModifyColumn,
} from '../services/workflow/approval';
import getServiceFromFormCode from '@/components/CustomForm/FormCodeService';

export default {
  namespace: 'workflow',

  state: {
    params: {},
    data: {
      list: [],
      pagination: {},
    },
    curRouter: {},
    detail: {},
    editVisible: false,
    workFlowData: {},
    flowData:{},
    auditList: [],
    canModifyColumn: [],
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

    // 条目数据
    flowData(state, { payload }) {
      return { ...state, flowData: payload };
    },

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },

    // 流程执行数据
    workFlowData(state, { payload }) {
      return { ...state, ...payload };
    },

    // 流程执行数据
    auditList(state, { payload }) {
      return { ...state, ...payload };
    },

    curRouter(state, { payload }) {
      return { ...state, curRouter: payload };
    },
    // 可以修改的表单
    canModifyColumn(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, put, select }) {
      const curRouter = yield select(({ workflow }) => workflow.curRouter);
      const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      const response = yield call(serviceObject.list, { ...payload, pageSize: 10 });
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

    // 审批通过
    *approval({ payload, callback }, { call, put, select }) {
      const response = yield call(approval, payload);
      if (response) {
        yield put({ type: 'jgTableModel/toggleDetail', payload: false });
        const params = yield select(({ workflow }) => workflow.params);
        yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },

    // 审批驳回
    *reject({ payload, callback }, { call, put, select }) {
      const response = yield call(reject, payload);
      if (response) {
        yield put({ type: 'jgTableModel/toggleDetail', payload: false });
        const params = yield select(({ workflow }) => workflow.params);
        yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },

    // 跳过
    *pass({ payload, callback }, { call, put, select }) {
      const response = yield call(pass, payload);
      if (response) {
        yield put({ type: 'jgTableModel/toggleDetail', payload: false });
        const params = yield select(({ workflow }) => workflow.params);
        yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },

    // 分页
    *pageRemote({ payload }, { put, select }) {
      const params = yield select(({ workflow }) => workflow.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload } });
    },

    // 查询流程图进度
    *queryWorkFlow({ payload = {}, callback }, { put, call }) {
      // yield put({ type: 'toggleEdit', payload: true });
      const response = yield call(viewProcess, payload);

      if (response) {
        const { resp } = response;
        yield put({ type: 'workFlowData', payload: { workFlowData: resp } });
        if (callback) callback(resp);
      }
    },

    // 查询审批记录
    *queryAuditList({ payload = {} }, { put, call }) {
      const response = yield call(auditList, payload);

      if (response) {
        const { resp } = response;
        yield put({ type: 'auditList', payload: { auditList: resp } });
      }
    },
    // 查询审批记录
    *getCanModifyColumn({ payload = {} }, { put, call }) {
      const response = yield call(getCanModifyColumn, payload);

      if (response) {
        const { resp } = response;
        yield put({ type: 'canModifyColumn', payload: { canModifyColumn: resp } });
      }
    },
  },
};
