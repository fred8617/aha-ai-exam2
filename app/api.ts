import axios, { AxiosResponse } from "axios";
import { UseQueryOptions, useQuery } from "react-query";
import { FriendsType } from "./components/Friends";

export type SearchParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
};

export type FriendsParams = SearchParams & { type: FriendsType };

type User = {
  avater: string;
  id: string;
  isFollowing: boolean;
  name: string;
  username: string;
};

type SearchResponse = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: User[];
};

type FriendsResponse = SearchResponse;

export const search = (params: SearchParams) =>
  axios.get<SearchResponse>(
    "https://avl-frontend-exam.herokuapp.com/api/users/all",
    {
      params,
    }
  );

export const friends = ({ type, ...params }: FriendsParams) =>
  axios.get<FriendsResponse>(
    `https://avl-frontend-exam.herokuapp.com/api/users/${
      type === FriendsType.FOLLOWERS ? "all" : "friends"
    }`,
    {
      params,
    }
  );

export const useSearchQuery = (
  params: SearchParams,
  options?: UseQueryOptions<AxiosResponse<SearchResponse>>
) =>
  useQuery<AxiosResponse<SearchResponse>>(
    ["search", ...Object.values(params)],
    async () => search(params),
    options
  );

export const useFriendsQuery = (
  params: FriendsParams,
  options?: UseQueryOptions<AxiosResponse<FriendsResponse>>
) =>
  useQuery<AxiosResponse<FriendsResponse>>(
    ["friends", ...Object.values(params)],
    async () => friends(params),
    options
  );
