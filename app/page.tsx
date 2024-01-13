"use client";
import { useSearchParams } from "next/navigation";
import Search from "./components/Search";
import Result from "./components/Result";

export default function Home() {
  const params = useSearchParams();

  return (
    <div className="flex">
      <div className="flex-auto">
        <div className="mx-[131px]">
          {params.size === 0 ? <Search /> : <Result />}
        </div>
      </div>
      <div className="basis-[375px] max-[1439px]:hidden">follower</div>
    </div>
  );
}
