// import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.";
import "../index.css";
import store from "./App/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <RouterProvider router={router} />
      </ParallaxProvider>
    </QueryClientProvider>
  </Provider>
);
