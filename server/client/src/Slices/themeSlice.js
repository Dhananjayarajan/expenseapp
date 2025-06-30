import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(localStorage.getItem("theme"));

const themeSlice = createSlice({
  name: "theme",
  initialState: savedTheme || {
    isDark: true,
    headerBg: "flex justify-between items-center p-1 bg-amber-400 h-25",
    headerButton: "bg-blue-500 text-gray-300 p-2.5 text-2xl rounded-2xl",
    bodyBg: "bg-gray-800 min-h-screen w-full",
    formColor: "bg-white",
    tableColor: "text-white",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.isDark = !state.isDark;
      if (state.isDark) {
        state.headerBg =
          "flex justify-between items-center p-1 bg-amber-400 h-25";
        state.headerButton =
          "bg-blue-700 text-gray-300 p-2.5 text-2xl rounded-2xl";
        state.bodyBg = "bg-gray-800 min-h-screen w-full";
        state.formColor = "bg-white";
        state.tableColor = "text-white";
      } else {
        state.headerBg =
          "flex justify-between items-center p-1 bg-gray-400 h-25";
        state.headerButton =
          "bg-blue-200 text-black p-2.5 text-2xl rounded-2xl";
        state.bodyBg = "bg-gray-200 min-h-screen w-full";
        state.formColor = "bg-gray-100 text-gray-800";
        state.tableColor = "text-black";
      }
      localStorage.setItem("theme", JSON.stringify(state));
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
