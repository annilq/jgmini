import getServiceFromFormCode from '@/components/CustomForm/FormCodeService';
import request from '@/utils/request';

export function flatdata(data) {
  const { exts, ...rest } = data || {};
  let newexts;
  try {
    newexts = exts && JSON.parse(exts);
  } catch (error) {
    console.log('JSON parse Error', exts);
  }
  if (!newexts) {
    return rest;
  }
  const { versionId, sysVersionId, controls } = newexts;
  return { versionId, sysVersionId, ...controls, ...rest };
}
// 根据serviceType来判断是那个模块发起的请求
export default {
  namespace: 'jgTableModel',

  state: {
    params: {},
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    editVisible: false,
    detailVisible: false,

    currentStep: 0,
    dataId: '', // 新增后的数据Id，用于明细信息提交数据
  },

  reducers: {
    // 分步
    currentStep(state, { payload }) {
      return { ...state, currentStep: payload };
    },

    // 数据ID
    dataId(state, { payload }) {
      return { ...state, dataId: payload };
    },

    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: { list: payload.list, pagination: payload.pagination },
        params: payload.params,
      };
    },

    // 条目数据
    item(state, { payload }) {
      return { ...state, item: payload };
    },

    // 详细开关
    toggleDetail(state, { payload }) {
      return { ...state, detailVisible: payload };
    },

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },
  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, select, put }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      const project = yield select(({ project }) => project.project);
      // console.log(curRouter);
      // const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      // console.log(serviceObject);
      // if (!serviceObject) {
      //   return;
      // }
      const response = yield call(list, {
        ...payload,
        ...(curRouter.params || {}),
        ...((project.id && { projectId: project.id }) || {}),
      });
      if (response) {
        const { resp } = response;
        const list = resp.list.map(flatdata);
        yield put({
          type: 'list',
          payload: {
            list: list,
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

    // 列表中新增
    *addRemote({ payload, callback }, { call, put, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      const project = yield select(({ project }) => project.project);
      // console.log(curRouter);
      // const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      const response = yield call(add, {
        ...payload,
        ...(curRouter.params || {}),
        ...((project.id && { projectId: project.id, projectName: project.name }) || {}),
      });
      if (response) {
        yield put({ type: 'dataId', payload: response.resp });
        if (callback) callback(response);
      }
    },

    // 新增
    *addNewItem({ payload, callback }, { call, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      // const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      const response = yield call(add, payload);
      if (response) {
        if (callback) callback(response);
      }
    },

    // 修改
    *updateRemote({ payload, callback }, { call, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      const project = yield select(({ project }) => project.project);
      // console.log(curRouter);
      // const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      const response = yield call(update, {
        ...payload,
        projectId: project.id,
        ...(curRouter.params || {}),
      });
      if (response) {
        if (callback) callback(response);
      }
    },

    // 删除
    *removeRemote({ payload, callback }, { call, put, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      // const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      const response = yield call(remove, { id: payload });
      if (response) {
        const params = yield select(({ jgTableModel }) => jgTableModel.params);
        yield put({ type: 'listRemote', payload: params });

        if (callback) callback();
      }
    },

    // 分页
    *pageRemote({ payload }, { put, select }) {
      const params = yield select(({ jgTableModel }) => jgTableModel.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload } });
    },

    *queryRemote({ formCode, payload = {}, callback }, { put, select, call }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      const serviceObject = getServiceFromFormCode(formCode);
      if (!serviceObject) {
        console.log('no service');
        return;
      }
      if (!serviceObject.query) {
        yield put({ type: 'dataId', payload: payload });
        // 执行回调，方便展开
        if (callback) callback();
        console.log('no query service');
        // 自己实现
        return;
      }
      // 根据id在基础表查基础数据，在子表查询拓展数据
      const baseResp = yield call(serviceObject.query, payload);
      if (baseResp) {
        const { resp } = baseResp;
        if (resp) {
          // 将用户自定义的字段数据提取出来
          // 需要将拓展字段exts格式打平，提升到data中，方便回显表单数据
          const newData = flatdata(resp);
          yield put({ type: 'item', payload: newData });
          if (callback) callback(newData);
        } else {
          console.warn('no query data');
        }
      }
    },

    // 提交审批
    *approve({ payload, callback }, { call, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      const project = yield select(({ project }) => project.project);

      // const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      if (!approve) {
        console.warn('no approve function');
      }
      const response = yield call(approve, { ...payload, projectId: project.id });
      if (response) {
        if (callback) callback();
      }
    },
  },
};
