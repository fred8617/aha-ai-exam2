"use client";
import Left from "@/components/icons/Left";
import { HeadLine4 } from "@/components/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { Button } from "@mui/material";
import { SearchParams, useSearchQuery } from "../api";
import queryString from "query-string";
import Card from "@/components/Card";

export type ResultProps = {};

const Result: FC<ResultProps> = () => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const params: SearchParams = {
    ...queryString.parse(urlParams.toString()),
    page,
  };
  const pageSize = Number(params.pageSize);
  const { data, isLoading } = useSearchQuery(params);
  const results = data?.data.data;
  const dataCache = useRef<NonNullable<typeof results>>([]);
  const allDatas = useRef<NonNullable<typeof results>>([]);
  const totalPages = useRef<number>(0);
  const total = useRef<number>(0);

  if (results && !isLoading && dataCache.current !== results) {
    dataCache.current = results;
    allDatas.current.push(...results);
    totalPages.current = data.data.totalPages;
    total.current = data.data.total;
  }
  // caculate the left size of data
  const left = total.current - allDatas.current.length;
  /**
   * Number of the cards showing Skeleton
   * The initial request will show `pageSize` <LoadingCard/>
   */
  const loadingCardNumber = Math.min(left, pageSize) || pageSize;
  const showMoreButton = totalPages.current > page;

  const handGoback = () => {
    router.back();
  };

  const handleShowMore = () => {
    setPage(page + 1);
  };
  return (
    <>
      <HeadLine4 className="relative ml-[7px] mt-[92px]">
        Results
        <div
          onClick={handGoback}
          className="absolute top-1/2 left-[-51px] translate-y-[-50%]"
        >
          <Left />
        </div>
      </HeadLine4>
      <div className="overflow-auto h-[calc(100vh-167px)]">
        <div className="grid grid-cols-3 gap-x-[34px] gap-y-[31px] mt-[24px]">
          {allDatas.current.map((user, index) => (
            <div key={user.id}>
              <Card
                post={`/image ${(index % 3) + 1}.png`}
                title={user.name}
                description={`by ${user.username}`}
              />
            </div>
          ))}
          {isLoading &&
            Array.from({ length: loadingCardNumber }).map((_, i) => (
              <Card.LoadingCard key={i} />
            ))}
        </div>
        {showMoreButton && (
          <div className="mt-[39px]">
            <Button
              onClick={handleShowMore}
              disabled={isLoading}
              className="w-[343px]"
              variant="contained"
            >
              {isLoading ? "LOADING..." : "MORE"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default Result;
