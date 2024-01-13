"use client";
import { useSearchParams } from "next/navigation";
import Search from "./components/Search";
import Result from "./components/Result";
import Friends from "./components/Friends";

export default function Home() {
  const params = useSearchParams();

  return (
    <div className="flex h-screen">
      <div className="flex-auto">
        <div className="mx-[131px]">
          {params.size === 0 ? <Search /> : <Result />}
        </div>
      </div>
      <div className="basis-[375px] pt-[19px] max-[1439px]:hidden bg-[var(--Greyscale-BG---light)]">
        <Friends />
      </div>
    </div>
  );
}
