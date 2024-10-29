import { createSlice } from "@reduxjs/toolkit";

// Determine the initial state based on window width
const getInitialDeviceState = () => {
  const width = window.innerWidth;

  return {
    isMobile: width <= 768, // Mobile if width is <= 768px
    isTab: width > 768 && width <= 1024, // Tablet if width is between 768px and 1024px
    isDesktop: width > 1024, // Desktop if width is > 1024px
  };
};

const initialState = getInitialDeviceState();

const endPointSlice = createSlice({
  name: "endPoint",
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setIsTab(state, action) {
      state.isTab = action.payload;
    },
    setIsDesktop(state, action) {
      state.isDesktop = action.payload;
    },
    updateDeviceState(state) {
      const width = window.innerWidth;
      state.isMobile = width <= 768;
      state.isTab = width > 768 && width <= 1024;
      state.isDesktop = width > 1024;
    },
  },
});

export const { setIsMobile, setIsTab, setIsDesktop, updateDeviceState } =
  endPointSlice.actions;
export default endPointSlice.reducer;
