import { useEffect, useState } from "react";
import { Post } from "./api/posts";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");

  async function getPosts() {
    const response = await fetch("http://localhost:3000/api/posts").then(
      (res) => res.json()
    );
    console.log(posts);
    setPosts(response.posts);
  }

  async function createPost() {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {posts.length &&
          posts.map((post) => (
            <div key={post.title} className="shadow-md p-4">
              <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
              <span className="block text-xs mb-4">{post.created}</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, in corporis? Dolore, pariatur? Itaque nihil
                sapiente maxime voluptates animi tempora?
              </p>
            </div>
          ))}
      </div>
      <form
        className="w-1/3 space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          await createPost();
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
          type="submit"
          className="bg-purple-500 py-2 px-4 text-white rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
