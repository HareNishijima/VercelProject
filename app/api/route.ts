import { NextRequest } from "next/server"
import { deletePost, getPosts, postPosts, updatePost } from '../lib/data/post';

export async function GET() {
  const result = await getPosts();
  return Response.json(result)
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await postPosts(body.top, body.content);
  return Response.json(result)
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const result = await updatePost(body.id, body.top, body.content);
  return Response.json(result)
}

export async function DELETE(req:NextRequest) {
  const body = await req.json();
  const result = await deletePost(body.id);
  return Response.json(result)
}