import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      axios.post("http://localhost:3000/api/posts", { title }),
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });
}
