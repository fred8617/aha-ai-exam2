"use client";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { HeadLine3, HeadLine5, Subtitle } from "@/components/styled";
import Slider from "@mui/material/Slider";
import { FC, useState } from "react";
import { Button } from "@mui/material";

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
  const pageSize = marksValueMap[sliderValue];
  const handleSliderChange = (_e: Event, value: number | number[]): void => {
    setSliderValue(value as number);
  };
  return (
    <>
      <HeadLine5 className="mt-[54px]">Search</HeadLine5>
      <TextField className="mt-5 w-full" label="Keyword" variant="outlined" />
      <Divider className="my-[30px]" />
      <HeadLine5># Of Results Per Page</HeadLine5>
      <div className="flex items-baseline my-[20px]">
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
      <Divider className="my-[30px]" />
      <Button className="w-[343px] absolute bottom-[87px]" variant="contained">
        SEARCH
      </Button>
    </>
  );
};
export default Search;
