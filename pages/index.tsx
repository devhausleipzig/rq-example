import { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const [title, setTitle] = useState("");

  const { isError, isLoading, data } = usePosts();
  const { mutateAsync, isLoading: isPostLoading } = useCreatePost();

  if (isLoading) return "Loading...";
  if (isError) return "Error...";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {/* <pre>{JSON.stringify(query, null, 2)}</pre> */}
        {data.posts.map((post) => (
          <div key={post.title} className="shadow-md p-4">
            <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
            <span className="block text-xs mb-4">{post.created}</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, in corporis? Dolore, pariatur? Itaque nihil sapiente
              maxime voluptates animi tempora?
            </p>
          </div>
        ))}
      </div>
      <form
        className="w-1/3 space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          await mutateAsync(title);
          setTitle("");
        }}
      >
        <label className="flex flex-col gap-2">
          Title
          <input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </label>
        <button
          disabled={isPostLoading}
          type="submit"
          className="bg-purple-500 py-2 px-4 text-white rounded-md"
        >
          {isPostLoading ? "Sending..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
