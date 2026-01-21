import { createSlice } from "@reduxjs/toolkit";
import staffService from "../services/staffs";

const staffSlice = createSlice({
  name: "staffs",
  initialState: [],
  reducers: {
    setStaffs(state, action) {
      return action.payload;
    }
  },
});

export const { setStaffs } = staffSlice.actions;

export const initializeStaffs = () => {
  return async (dispatch) => {
    const staffs = await staffService.getAll();
    dispatch(setStaffs(staffs));
  };
};

export default staffSlice.reducer;