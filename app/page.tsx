"use client";
import { useSearchParams } from "next/navigation";
import Search from "./components/Search";
import Result from "./components/Result";
import Friends from "./components/Friends";
import NavBar from "@/components/NavBar";
import { useAppContext } from "./context";

export default function Home() {
  const params = useSearchParams();
  const isSearchPage = params.size === 0;
  const { menus } = useAppContext();
  return (
    <div className="reltive xs:flex-col flex h-screen">
      <div className="flex-auto relative">
        <div className="xs:mx-[20px] mx-[131px]">
          {isSearchPage ? <Search /> : <Result />}
        </div>
      </div>
      {isSearchPage && <NavBar className="xs:block hidden" menus={menus} />}
      <div className="hidden basis-[375px] pt-[19px] 2xl:block bg-[var(--Greyscale-BG---light)]">
        <Friends />
      </div>
    </div>
  );
}
