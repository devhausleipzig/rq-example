// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export interface Post {
  title: string;
  created: string;
}

function getPosts() {
  const postsFile = fs.readFileSync("posts.json", { encoding: "utf-8" });
  return JSON.parse(postsFile);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const postsFile = getPosts();
    const posts: Post[] = postsFile.posts;
    console.log(posts);
    res.status(200).json({ posts });
  }

  if (req.method === "POST") {
    const postsFile = getPosts();
    const newPost = {
      title: req.body.title,
      created: new Date().toLocaleString(),
    };
    const newPosts = [...postsFile.posts, newPost];
    fs.writeFileSync("posts.json", JSON.stringify({ posts: newPosts }));
    res.status(201).json({ message: "Post created" });
  }
}
