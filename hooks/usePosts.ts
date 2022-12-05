import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../pages/api/posts";

interface Result {
  posts: Post[];
}

export function usePosts() {
  return useQuery<Result>({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/posts").then((res) => res.data),
    refetchInterval: 10000,
  });
}

export function usePost(id: string) {
  return useQuery<Result>({
    queryKey: ["posts", id],
    queryFn: () =>
      axios
        .get(`http://localhost:3000/api/posts/${id}`)
        .then((res) => res.data),
  });
}
