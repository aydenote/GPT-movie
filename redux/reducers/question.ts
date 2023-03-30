import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

const init = {
  currentId: 0,
  dataList: [] as { question: string; answer: string }[],
};

const questionSlice = createSlice({
  name: 'QnA',
  initialState: init,

  reducers: {
    ADD: (state, action) => {
      const { question, answer } = action.payload;
      return produce(state, draft => {
        draft.currentId += 1;
        draft.dataList.push({ question, answer });
      });
    },
    UPDATE: (state, action) => {
      const { id, answer } = action.payload;
      return produce(state, draft => {
        draft.currentId += 1;
        draft.dataList[id].answer = answer;
      });
    },
    BEFORE: state => {
      return produce(state, draft => {
        draft.currentId -= 1;
      });
    },
    RESET: () => {
      return init;
    },
  },
});

export const { ADD, UPDATE, BEFORE, RESET } = questionSlice.actions;
export default questionSlice.reducer;
