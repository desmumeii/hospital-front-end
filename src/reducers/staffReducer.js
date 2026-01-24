import { createSlice } from "@reduxjs/toolkit";
import staffService from "../services/staffs";

const staffSlice = createSlice({
  name: "staffs",
  initialState: [],
  reducers: {
    setStaffs(state, action) {
      return action.payload;
    },
    createStaff(state, action) {
      state.push(action.payload);
    },
    updateStaff(state, action) {
      const updatedStaff = action.payload;
      return state.map((staff) =>
        staff.id === updatedStaff.id ? updatedStaff : staff
      );
    },
    deleteStaff(state, action) {
      const id = action.payload;
      return state.filter((staff) => staff.id !== id);
    },
  },
});

export const { setStaffs, createStaff, updateStaff, deleteStaff } = staffSlice.actions;
export const initializeStaffs = () => {
  return async (dispatch) => {
    const staffs = await staffService.getAll();
    dispatch(setStaffs(staffs));
  };
};


export default staffSlice.reducer;