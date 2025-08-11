import { Post } from "@prisma/client";
import prisma from "../database/database";

const TABLE_NAME = "posts";

type CreatePost = Omit<Post, "id" | "createAt">;

async function getPosts() {
  const posts = await prisma.post.findFirst();
  return posts;
}

async function getPost(id: number) {
  const post = await prisma.post.findFirst({
    where:{id}
  });
  return post;
}

async function createPost(post: CreatePost) {
  return await prisma.post.create({
    data: post
  });
}

async function deletePost(id: number) {
  return await prisma.post.delete({
    where:{id}
  });
}

const postRepository = {
  getPost,
  getPosts,
  createPost,
  deletePost
}

export default postRepository;