"use client";
import Left from "@/components/icons/Left";
import { HeadLine4 } from "@/components/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { SearchParams, useSearchQuery } from "../api";
import queryString from "query-string";
import Card from "@/components/Card";
import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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
  const listRef = useRef<InstanceType<typeof Grid>>(null);
  if (results && !isLoading && dataCache.current !== results) {
    dataCache.current = results;
    allDatas.current.push(...results);
    totalPages.current = data.data.totalPages;
    total.current = data.data.total;
  }
  const totalDataLoaded = allDatas.current.length;
  // caculate the left size of data
  const left = total.current - totalDataLoaded;
  /**
   * Number of the cards showing Skeleton
   * The initial request will show `pageSize` <LoadingCard/>
   */
  const loadingCardNumber = Math.min(left, pageSize) || pageSize;
  const showMoreButton = totalPages.current > page;
  const columnCount = 3;
  // When loading add the loading count then we can use Skeleton
  const length = isLoading
    ? totalDataLoaded + loadingCardNumber
    : totalDataLoaded;
  const basicRowCount = Math.ceil(length / columnCount);
  // Left 1 row for MORE button
  const rowCount = showMoreButton ? basicRowCount + 1 : basicRowCount;
  // A little hack way for reset the vitual list
  const prevRowCount = useRef<number>(rowCount);
  const handGoback = () => {
    router.back();
  };

  const handleShowMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (isLoading) {
      listRef.current?.resetAfterRowIndex(prevRowCount.current - 1, true);
      prevRowCount.current = rowCount;
    }
  }, [isLoading]);
  return (
    <>
      <HeadLine4 className="relative ml-[7px] mt-[92px] mb-[24px]">
        Results
        <div
          onClick={handGoback}
          className="absolute top-1/2 left-[-51px] translate-y-[-50%] cursor-pointer"
        >
          <Left />
        </div>
      </HeadLine4>
      <div className="overflow-hidden h-[calc(100vh-167px)]">
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Grid
                ref={listRef}
                columnCount={columnCount}
                columnWidth={() => width / columnCount}
                height={height}
                width={width}
                rowCount={rowCount}
                rowHeight={(index: number) =>
                  showMoreButton
                    ? index === rowCount - 1
                      ? // MORE button height
                        40
                      : 228
                    : 228
                }
              >
                {({ rowIndex, columnIndex, style }) => {
                  const index = rowIndex * columnCount + columnIndex;
                  const user = allDatas.current[index];
                  // The accurate condition to judge if render the MORE button
                  const showMore =
                    showMoreButton &&
                    rowIndex === rowCount - 1 &&
                    columnIndex === 0;
                  return (
                    <div style={style}>
                      {showMore ? (
                        <div className="mt-[8px]">
                          <Button
                            onClick={handleShowMore}
                            disabled={isLoading}
                            className="w-[343px]"
                            variant="contained"
                          >
                            {isLoading ? "LOADING..." : "MORE"}
                          </Button>
                        </div>
                      ) : user ? (
                        <Card
                          post={`/image ${(index % 3) + 1}.png`}
                          title={user.name}
                          // Add a index for clearly desc
                          description={index + 1 + "  " + `by ${user.username}`}
                        />
                      ) : (
                        isLoading && <Card.LoadingCard />
                      )}
                    </div>
                  );
                }}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>
    </>
  );
};
export default Result;
