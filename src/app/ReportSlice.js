import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reportAPi from '../api/reportApi';

export const getReport = createAsyncThunk('report/getReport', async (params) => await reportAPi.getReport(params));

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    current: null,
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getReport.rejected, (state, action) => {
      // state.current = {};
    });
    buider.addCase(getReport.fulfilled, (state, action) => {
      // state.current = ;
    });
  },
});

const { reducer: ReportReducer } = reportSlice;
export default ReportReducer;
