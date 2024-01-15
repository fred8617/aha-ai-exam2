"use client";
import { FC } from "react";
import { useTagsQuery } from "../api";
import Card from "@/components/Card";

export type TagsGridProps = {};

const postSize = 150;

const TagsGrid: FC<TagsGridProps> = () => {
  const { data, isLoading } = useTagsQuery();
  return (
    <div className="grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4 overflow-auto xs:h-[calc(100vh-150px)] h-[calc(100vh-149px)] grid grid-rows-[199px] 2xl:grid-cols-5 gap-x-[24px] gap-y-[36px] xs:gap-y-[24px]">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <Card.LoadingCard
              post={{ width: postSize, height: postSize }}
              key={index}
            />
          ))
        : data?.data.map((tag) => (
            <Card
              titleClassName="w-[150px] xs:mt-[10px]"
              key={tag.id}
              post={
                <div
                  className={`relative w-[150px] h-[150px] bg-[rgba(255,255,255,.06)] rounded-[8px]`}
                >
                  <div className="font-[700] truncate max-w-[130px] left-[10px] bottom-[14px] absolute text-[24px] leading-[36px] border-4 text-[var(--Greyscale-white)] bg-[var(--Greyscale-BG---dark)] px-[10px] py-[3px] rounded-[8px]">
                    {tag.name}
                  </div>
                </div>
              }
              title={tag.name}
              description={`${tag.count} Results`}
            />
          ))}
    </div>
  );
};
export default TagsGrid;
