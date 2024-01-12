"use client";
import Left from "@/components/icons/Left";
import { HeadLine4 } from "@/components/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SearchParams, useSearchQuery } from "../api";
import queryString from "query-string";
import Image from "next/image";
export type ResultProps = {};
const Result: FC<ResultProps> = () => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const params: SearchParams = {
    ...queryString.parse(urlParams.toString()),
    page,
  };
  const { data } = useSearchQuery(params);
  console.log(data?.data);

  const handGoback = () => {
    router.back();
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
      <div>
        {data?.data.data.map((user) => (
          <div key={user.id}>
            <Image width={219} height={146} src={user.avater} alt={user.name} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Result;
