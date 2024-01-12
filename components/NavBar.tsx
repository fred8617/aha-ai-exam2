"use client";
import { FC } from "react";
import classnames from "classnames";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Dot from "./icons/Dot";

export type Menu = {
  route: string;
  label: string;
  icon: React.ComponentType;
  // The blue dot on the top right corner
  dot?: boolean;
};

export type NavBarProps = {
  menus: Menu[];
};

const NavBar: FC<NavBarProps> = ({ menus }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="basis-20 h-screen bg-[var(--Greyscale-light-bg)]">
      <div className="flex items-center justify-center w-full h-[88px] mb-2">
        <div className="leading-[15px] text-[13px] text-fill-transparent bg-tutor-gradient--light bg-clip-text font-bold">
          LOGO
        </div>
      </div>
      <div>
        {menus.map((menu) => {
          const routeMatch = pathname === menu.route;
          return (
            <div
              onClick={() => router.push(menu.route)}
              className={classnames(
                "mb-[22px]",
                "flex",
                "items-center",
                "justify-center",
                "flex-col",
                "text-xs",
                "cursor-pointer",
                { "text-transparent": !routeMatch, "text-white": routeMatch }
              )}
              key={menu.label}
            >
              <div
                className={classnames("relative", {
                  "text-white": routeMatch,
                  "text-[#8A8A8F]": !routeMatch,
                })}
              >
                {React.createElement(menu.icon)}
                {menu.dot && !routeMatch && (
                  <div className="absolute top-0 right-0 translate-y-[-50%] translate-x-1/2">
                    <Dot />
                  </div>
                )}
              </div>
              {menu.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NavBar;
