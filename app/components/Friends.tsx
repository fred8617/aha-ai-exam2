import { FC, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useFriendsQuery } from "../api";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { Button } from "@mui/material";
import ListItem from "@/components/ListItem";

export type FriendsProps = {};

export enum FriendsType {
  FOLLOWERS = "Followers",
  FOLLOWING = "Following",
}

const itemSize = 61;

const Friends: FC<FriendsProps> = () => {
  const [value, setValue] = useState<FriendsType>(FriendsType.FOLLOWERS);
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useFriendsQuery({
    page,
    pageSize,
    type: value,
  });
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
  const totalDataLoaded = allDatas.current.length;
  // caculate the left size of data
  const left = total.current - totalDataLoaded;

  /**
   * Number of the cards showing Skeleton
   * The initial request will show `pageSize` <LoadingListItem/>
   */
  const loadingCardNumber = Math.min(left, pageSize) || pageSize;
  // When loading, add the loading count then we can use Skeleton
  const itemCount = isLoading
    ? totalDataLoaded + loadingCardNumber
    : Math.min(totalDataLoaded + 1, total.current);
  const handleChangeTab = (
    _event: React.SyntheticEvent,
    newValue: FriendsType
  ) => {
    allDatas.current = [];
    setValue(newValue);
    setPage(1);
  };
  return (
    <>
      <Tabs
        onChange={handleChangeTab}
        value={value}
        variant="fullWidth"
        aria-label="friends tab"
      >
        <Tab value={FriendsType.FOLLOWERS} label={FriendsType.FOLLOWERS} />
        <Tab value={FriendsType.FOLLOWING} label={FriendsType.FOLLOWING} />
      </Tabs>
      <div className="pt-[32px] h-[calc(100vh-71px)]">
        <AutoSizer>
          {({ height, width }) => {
            return (
              <InfiniteLoader
                isItemLoaded={(index) => !!allDatas.current[index]}
                itemCount={itemCount}
                loadMoreItems={() => {
                  if (isLoading) {
                    return;
                  }
                  setPage(page + 1);
                }}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    height={height}
                    itemCount={itemCount}
                    itemSize={itemSize}
                    width={width}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {({ style, index }) => {
                      const user = allDatas.current[index];
                      return (
                        <div className="px-[16px]" style={style}>
                          {user ? (
                            <ListItem
                              action={
                                <Button
                                  size="small"
                                  variant={
                                    user.isFollowing
                                      ? "aha-contained-round"
                                      : "aha-outlined-round"
                                  }
                                >
                                  {user.isFollowing ? "Following" : "Follow"}
                                </Button>
                              }
                              title={user.name}
                              avatar={`/user${(index % 3) + 1}.png`}
                              // Add a index for clearly desc
                              description={
                                index + 1 + "  " + `@${user.username}`
                              }
                            />
                          ) : (
                            <ListItem.LoadingListItem />
                          )}
                        </div>
                      );
                    }}
                  </List>
                )}
              </InfiniteLoader>
            );
          }}
        </AutoSizer>
      </div>
    </>
  );
};
export default Friends;
