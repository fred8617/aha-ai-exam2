import axios, { AxiosResponse } from "axios";
import { UseQueryOptions, useQuery } from "react-query";

type Tag = {
  id: string;
  name: string;
  count: number;
};

type TagResponse = Tag[];

export const tags = () =>
  axios.get<TagResponse>("https://avl-frontend-exam.herokuapp.com/api/tags");

export const useTagsQuery = (
  options?: UseQueryOptions<AxiosResponse<TagResponse>>
) =>
  useQuery<AxiosResponse<TagResponse>>(["tags"], async () => tags(), options);
