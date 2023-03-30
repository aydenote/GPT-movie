import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

const init = {
  currentId: 0,
  dataList: [] as { question: string; answer: string }[],
};

const questionSlice = createSlice({
  name: 'QnA',
  initialState: init,

  reducers: {},
});

export const {} = questionSlice.actions;
export default questionSlice.reducer;
