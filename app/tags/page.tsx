import { HeadLine4 } from "@/components/styled";
import TagsGrid from "./components/TagsGrid";

export default function Tags() {
  return (
    <div className="mt-[80px] mx-[257px]">
      <HeadLine4>Tags</HeadLine4>
      <div className="mt-[24px]">
        <TagsGrid />
      </div>
    </div>
  );
}
