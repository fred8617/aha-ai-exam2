"use client";
import Left from "@/components/icons/Left";
import { HeadLine4, HeadLine5 } from "@/components/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { Button } from "@mui/material";
import { SearchParams, useSearchQuery } from "../api";
import queryString from "query-string";
import Card from "@/components/Card";
import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import NavBack from "@/components/NavBack";

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

  // When loading add the loading count then we can use Skeleton
  const length = isLoading
    ? totalDataLoaded + loadingCardNumber
    : totalDataLoaded;

  const handleGoBack = () => {
    router.back();
  };

  const handleShowMore = () => {
    setPage(page + 1);
  };
  return (
    <>
      <HeadLine4 className="xs:hidden relative ml-[7px] mt-[92px] mb-[24px]">
        Results
        <div
          onClick={handleGoBack}
          className="absolute top-1/2 left-[-51px] translate-y-[-50%] cursor-pointer"
        >
          <Left />
        </div>
      </HeadLine4>
      <NavBack onBackIconClick={handleGoBack}> Home Page</NavBack>
      <HeadLine5 className="xs:flex hidden pt-[20px] pb-[24px]">
        Results
      </HeadLine5>
      <div className="xs:h-[calc(100vh-150px)] overflow-hidden h-[calc(100vh-167px)]">
        <AutoSizer
          onResize={() =>
            listRef.current?.resetAfterIndices({ columnIndex: 0, rowIndex: 0 })
          }
        >
          {({ height, width }) => {
            const screenWidth = document.documentElement.clientWidth;
            const xs = screenWidth > 0 && screenWidth <= 850;
            const md = screenWidth > 850 && screenWidth < 1024;
            const lg = screenWidth >= 1024;
            const columnCount = lg ? 3 : md ? 2 : xs ? 1 : 3;
            const columnWidth = width / columnCount;
            const rowCount = Math.ceil(length / columnCount);
            // From figma picture
            const pictureScale = 222.67 / 335;
            const scaleHeight = width * pictureScale;
            const rowHeight = xs ? scaleHeight + 20.33 + 22 + 17 + 40 : 228;
            const postProps = xs ? { width, height: scaleHeight } : undefined;
            return (
              <Grid
                onScroll={({ scrollTop }) => {
                  if (isLoading) {
                    return;
                  }
                  if (
                    showMoreButton &&
                    xs &&
                    // Because the loading text height is less than 40
                    // If there more data, we can scroll 1px to trigger load more
                    scrollTop >= rowCount * rowHeight - height
                  ) {
                    setPage(page + 1);
                  }
                }}
                ref={listRef}
                columnCount={columnCount}
                columnWidth={() => columnWidth}
                height={height}
                width={width}
                rowCount={rowCount}
                rowHeight={() => rowHeight}
              >
                {({ rowIndex, columnIndex, style }) => {
                  const index = rowIndex * columnCount + columnIndex;
                  const user = allDatas.current[index];
                  // The accurate condition to judge if render the MORE button
                  const isLast =
                    rowIndex === rowCount - 1 &&
                    columnIndex === columnCount - 1;

                  return (
                    <>
                      <div style={style}>
                        {user ? (
                          <Card
                            postProps={postProps}
                            post={`/image ${(index % 3) + 1}.png`}
                            title={user.name}
                            // Add a index for clearly desc
                            description={
                              index + 1 + "  " + `by ${user.username}`
                            }
                          />
                        ) : (
                          isLoading && <Card.LoadingCard post={postProps} />
                        )}
                      </div>
                      {xs && isLast && (
                        <div
                          style={{
                            ...style,
                            textAlign: "center",
                            // Make loading text heigt less than normal height then we can trigger load more
                            height: isLoading ? 39 : 40,
                            top: (style.top! as number) + rowHeight,
                          }}
                        >
                          {isLoading
                            ? "Loading..."
                            : showMoreButton
                            ? "Pull to Load More"
                            : "No More Data"}
                        </div>
                      )}
                      {showMoreButton && !xs && isLast && (
                        <div
                          style={{
                            ...style,
                            height: 40,
                            left: 0,
                            top: (style.top! as number) + rowHeight + 8,
                          }}
                        >
                          <Button
                            onClick={handleShowMore}
                            disabled={isLoading}
                            className="w-[343px]"
                            variant="aha-contained"
                          >
                            {isLoading ? "LOADING..." : "MORE"}
                          </Button>
                        </div>
                      )}
                    </>
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
