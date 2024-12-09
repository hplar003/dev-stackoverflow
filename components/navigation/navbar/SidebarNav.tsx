import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

const SidebarNav = () => {
  return (
    <Sidebar
      collapsible="icon"
      className=" background-light850_dark100 border-none "
    >
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 ">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavLinks />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-3">
          <Link href={ROUTES.SIGN_IN}>
            <Button className="small-medium btn-secondary  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient">Log In</span>
            </Button>
          </Link>
          <Link href={ROUTES.SIGN_UP}>
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
