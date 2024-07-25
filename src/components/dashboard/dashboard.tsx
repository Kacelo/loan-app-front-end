import React from "react";
import { DashboardMenubar, MainNav } from "../menubar/menubar";

function Dashboard() {
  return (
    <div style={{textAlign: 'center'}}>
      {/* <DashboardMenubar /> */}
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}

export default Dashboard;
