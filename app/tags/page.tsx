"use client";
import { HeadLine4, HeadLine5 } from "@/components/styled";
import TagsGrid from "./components/TagsGrid";
import NavBack from "@/components/NavBack";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";

export default function Tags() {
  const router = useRouter();
  const { menus } = useAppContext();
  const handleGoBack = () => {
    // This will use `key` to find the route in the formal env.
    router.push(menus.find((menu) => menu.label === "Home")!.route);
  };
  return (
    <div className="xs:mt-0 xs:mx-[20px] mx-[57px] md:mx-[100px] mt-[80px] 2xl:mx-[257px]">
      <HeadLine4 className="xs:hidden">Tags</HeadLine4>
      <NavBack onBackIconClick={handleGoBack}>Home Page</NavBack>
      <HeadLine5 className="pt-[20px] xs:block hidden">Tags</HeadLine5>
      <div className="pt-[24px]">
        <TagsGrid />
      </div>
    </div>
  );
}
