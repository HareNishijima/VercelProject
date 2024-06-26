"use client";
import { getPosts, PostData } from "./lib/data/post";

import { Post } from "@/components/post";
import { Form } from "@/components/form";
import { useEffect, useState } from "react";

export default function Top() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostData[]>([]);

  const loadPosts = async () => {
    setIsLoading(true);
    const res = await fetch("api");
    const posts = await res.json();
    setPosts(posts);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      loadPosts();
    })();
  }, []);

  return (
    <main>
      <div className="flex justify-center">
        <div className="max-w-md w-full">
          <Form loadPosts={loadPosts} />

          <div className="w-full border my-1"></div>

          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
            </div>
          ) : (
            <ul>
              {posts?.map((post, idx) => (
                <Post post={post} loadPosts={loadPosts} key={idx}/>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
