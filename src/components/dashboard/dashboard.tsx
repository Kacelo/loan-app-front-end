import React from "react";
import { DashboardMenubar, MainNav } from "../menubar/menubar";
import OverviewTabs from "./overview/tabs";
import { Heading2 } from "../typography/typography";

function Dashboard() {
  return (
    <div style={{ textAlign: "center" }}>
      {/* <DashboardMenubar /> */}
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="space-y-0.5">
              <Heading2 text="Dashboard" />
            </div>
          </div>
          <div className="ml-auto items-start">
            <OverviewTabs />
            {/* <Search /> */}
            {/* <UserNav /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
