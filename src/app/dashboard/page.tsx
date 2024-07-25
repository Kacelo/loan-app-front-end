"use client";

import Dashboard from "@/components/dashboard/dashboard";
import { MainNav } from "@/components/menubar/menubar";

// import { Provider } from "react-redux";
// import store from "@/store";

export default function DashboardHome() {
  return (
    // <Provider store={store}>
    <>
      <MainNav className="mx-6" />
      <Dashboard />
      Welcome to your dashboard
    </>
    // </Provider>
  );
}
