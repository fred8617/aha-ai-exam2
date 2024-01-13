import axios from "axios";
import { useQuery } from "react-query";

export type SearchParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
};

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

export const search = (params: SearchParams) =>
  axios.get<SearchResponse>(
    "https://avl-frontend-exam.herokuapp.com/api/users/all",
    {
      params,
    }
  );

export const useSearchQuery = (params: SearchParams) =>
  useQuery(["search", ...Object.values(params)], async () => search(params));
