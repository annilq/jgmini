import { list, myCreated } from '@/services/workflow/approval';
import { Payment, Receipt } from '@/services/finance';

function convertFinanceData(data = []) {
  return data.map(item => ({
    x: item.month,
    y: parseFloat(item.num),
  }));
}

export default {
  namespace: 'dashboard',

  state: {
    approvalList: [], // 我的审批
    approvalCreateList: [], // 我发起的审批
    payList: [], // 支付
    receiptList: [], // 收入
  },

  reducers: {
    approvalList(state, { payload }) {
      return {
        ...state,
        approvalList: payload,
      };
    },

    approvalCreateList(state, { payload }) {
      return {
        ...state,
        approvalCreateList: payload,
      };
    },

    payList(state, { payload }) {
      return {
        ...state,
        payList: payload,
      };
    },

    receiptList(state, { payload }) {
      return {
        ...state,
        receiptList: payload,
      };
    },
  },

  effects: {
    *approvalRemote(_, { call, put }) {
      const response = yield call(list, { pageSize: 10 });
      if (response) {
        const { resp } = response;
        yield put({
          type: 'approvalList',
          payload: resp.list,
        });
      }
    },

    *approvalCreateRemote(_, { call, put }) {
      const response = yield call(myCreated, { pageSize: 10 });
      if (response) {
        const { resp } = response;
        yield put({
          type: 'approvalCreateList',
          payload: resp.list,
        });
      }
    },

    *payRemote({ payload }, { call, put }) {
      const response = yield call(Payment.findLast, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'payList',
          payload: convertFinanceData(resp),
        });
      }
    },

    *receiptRemote({ payload }, { call, put }) {
      const response = yield call(Receipt.findLast, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'receiptList',
          payload: convertFinanceData(resp),
        });
      }
    },
  },
};
