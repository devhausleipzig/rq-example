// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type Data = {
  posts: Post[];
};

export interface Post {
  title: string;
  created: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const postsFile = fs.readFileSync("posts.json", { encoding: "utf-8" });
    const postsFileParsed = JSON.parse(postsFile);
    console.log(postsFileParsed);
    const posts: Post[] = postsFileParsed.posts;
    res.status(200).json({ posts });
  }

  if (req.method === "POST") {
    console.log("POST");
    const postsFile = fs.readFileSync("posts.json", { encoding: "utf-8" });
    const postsFileParsed = JSON.parse(postsFile);
    const newPost = { ...req.body, created: new Date().toLocaleString() };
    const newPosts = [...postsFileParsed.posts, newPost];
    fs.writeFileSync("posts.json", JSON.stringify({ posts: newPosts }));
    res.status(201).json({ message: "Post created" });
  }
}
