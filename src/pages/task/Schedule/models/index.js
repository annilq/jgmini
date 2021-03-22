import { getTaskByDate, getScheduleByMonth } from '@/services/task/schedule';

export default {
  namespace: 'taskSchedule',

  state: {
    scheduleList: [],
    taskList: [],
  },

  reducers: {
    scheduleList(state, { payload }) {
      return { ...state, scheduleList: payload };
    },

    taskList(state, { payload }) {
      return { ...state, taskList: payload };
    },
  },

  effects: {
    *getTaskByDate({ payload }, { call, put }) {
      const response = yield call(getTaskByDate, payload);
      if (response) {
        const { resp } = response;
        yield put({ type: 'taskList', payload: resp });
      }
    },

    *getScheduleByMonth({ payload }, { call, put }) {
      const response = yield call(getScheduleByMonth, payload);
      if (response) {
        const { resp } = response;
        yield put({ type: 'scheduleList', payload: resp });
      }
    },
  },
};
