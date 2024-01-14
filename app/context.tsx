"use client";
import { Menu } from "@/components/NavBar";
import { FC, PropsWithChildren, createContext, useContext } from "react";

type AppContextProps = {
  menus: Menu[];
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider: FC<PropsWithChildren<AppContextProps>> = ({
  menus,
  children,
}) => <AppContext.Provider value={{ menus }}>{children}</AppContext.Provider>;

export const useAppContext = () => useContext(AppContext);
