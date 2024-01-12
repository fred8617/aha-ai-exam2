"use client";

import Search from "./components/Search";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-auto">
        <div className="mx-[131px]">
          <Search />
        </div>
      </div>
      <div className="basis-[375px]">follower</div>
    </div>
  );
}
