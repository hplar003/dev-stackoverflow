import React, { ReactNode } from "react";

import LeftSidebar from "@/components/navigation/LeftSidebar";
import Navbar from "@/components/navigation/navbar/page";
import RightSidebar from "@/components/navigation/RightSidebar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative font-inter ">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-3xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      {/* <SidebarProvider defaultOpen>
        <SidebarNav />
        <main>
          <SidebarTrigger />
      {children}
      </main>
      </SidebarProvider> */}
    </main>
  );
};

export default RootLayout;
