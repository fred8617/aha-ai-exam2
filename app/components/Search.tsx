"use client";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { HeadLine3, HeadLine5, Logo, Subtitle } from "@/components/styled";
import Slider from "@mui/material/Slider";
import { FC, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import queryString from "query-string";

const marks = [
  {
    value: 1,
    label: 3,
  },
  {
    value: 2,
    label: 6,
  },
  { value: 3, label: 9 },
  { value: 4, label: 12 },
  { value: 5, label: 15 },
  { value: 6, label: 50 },
];

const marksValueMap = marks.reduce<Record<number, number>>(
  (accumulator, currentValue) => {
    accumulator[currentValue.value] = currentValue.label;
    return accumulator;
  },
  {}
);

export type SearchProps = {};
const Search: FC<SearchProps> = () => {
  const [sliderValue, setSliderValue] = useState<number>(marks[4].value);
  const [keyword, setKeyword] = useState<string>();
  const router = useRouter();
  const pageSize = marksValueMap[sliderValue];
  const handleSliderChange = (_e: Event, value: number | number[]): void => {
    setSliderValue(value as number);
  };
  const handleKeywordChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setKeyword(e.target.value);
  };
  // If there are too many params, then we can use `useMemo` to cache them.
  const searchParams = { keyword, pageSize };

  const handleSearchClick = () => {
    router.push(`/?${queryString.stringify(searchParams)}`);
  };
  return (
    <>
      <div className="xs:block leading-[15px] hidden pl-[1px] py-[27px] tracking-[-0.65px]">
        <Logo />
      </div>
      <HeadLine5 className="xs:mt-0 mt-[54px]">Search</HeadLine5>
      <TextField
        value={keyword}
        onChange={handleKeywordChange}
        className="xs:mt-[16px] mt-5 w-full"
        label="Keyword"
        id="keyword"
        variant="outlined"
      />
      <Divider className="xs:hidden my-[30px]" />
      <HeadLine5 className="xs:pt-[28px]"># Of Results Per Page</HeadLine5>
      <div className="xs:mt-[16px] xs:mb-[20px] flex items-baseline my-[20px]">
        <HeadLine3 className="mr-[10px]">{pageSize}</HeadLine3>
        <Subtitle>results</Subtitle>
      </div>
      <Slider
        onChange={handleSliderChange}
        value={sliderValue}
        min={1}
        max={6}
        marks={marks}
      />
      <Divider className="xs:absolute xs:left-[20px] xs:m-0 xs:bottom-[144px] xs:w-[calc(100vw-40px)] my-[30px]" />
      <Button
        onClick={handleSearchClick}
        className="xs:w-[calc(100vw-40px)] xs:left-[20px] xs:bottom-[24px] w-[343px] absolute bottom-[87px]"
        variant="aha-contained"
      >
        SEARCH
      </Button>
    </>
  );
};
export default Search;
