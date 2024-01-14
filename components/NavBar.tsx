"use client";
import { FC } from "react";
import classnames from "classnames";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Dot from "./icons/Dot";
import { Logo } from "./styled";

export type Menu = {
  route: string;
  label: string;
  icon: React.ComponentType;
  // The blue dot on the top right corner
  dot?: boolean;
};

export type NavBarProps = {
  menus: Menu[];
  className?: string;
};

const NavBar: FC<NavBarProps> = ({ menus, className }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={classnames(
        "xs:flex xs:basis-[66px] xs:justify-center basis-20 shrink-0 h-screen bg-[var(--Greyscale-light-bg)]",
        className
      )}
    >
      <div className="xs:hidden flex items-center justify-center w-full h-[88px] mb-2">
        <Logo />
      </div>
      <div className="xs:flex xs:items-center">
        {menus.map((menu) => {
          const routeMatch = pathname === menu.route;
          return (
            <div
              onClick={() => router.push(menu.route)}
              className={classnames(
                "xs:mb-0",
                "xs:px-[25px]",
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
                  <div className="xs:hidden absolute top-0 right-0 translate-y-[-50%] translate-x-1/2">
                    <Dot />
                  </div>
                )}
              </div>
              <span className="xs:hidden">{menu.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NavBar;
