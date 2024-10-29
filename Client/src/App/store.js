import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice/generalSlice";
import endpointSlice from "./generalSlice/endpoints";

export default configureStore({
  reducer: {
    general: generalSlice,
    endpoint: endpointSlice,
  },
});
