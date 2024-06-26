"use client";
import { PostData } from "../app/lib/data/post";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon as PencilIconOutline } from "@heroicons/react/24/outline";
import { PencilIcon as PencilIconSolid } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Picker from "@emoji-mart/react";

type PropsData = {
  post: PostData;
  loadPosts: () => void;
};

export const Post = (props: PropsData) => {
  const post = props.post;
  const loadPosts: () => void = props.loadPosts;

  const [editPost, setEditPost] = useState(false);
  const [editTop, setEditTop] = useState(post.top);
  const [editContent, setEditContent] = useState(post.content);
  const [emojiPickerEnabled, setEmojiPickerEnabled] = useState<boolean>(false);

  const handleEmojiSelect = (emoji: any) => {
    setEditTop(emoji.native);
    setEmojiPickerEnabled(false);
  };

  const handleEmojiPicker = () => {
    const nextEmojiPickerEnabled = !emojiPickerEnabled;
    setEmojiPickerEnabled(nextEmojiPickerEnabled);
  };

  const handleDeleteButton = async (id: string) => {
    const res = await fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    console.log(res);
    await loadPosts();
  };

  const handleUpdateButton = async () => {
    const data = {
      id: post.id,
      top: editTop,
      content: editContent,
    };
    const res = await fetch("/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    await loadPosts();
  };

  return (
    <>
      {editPost ? (
        <div className="py-2">
          <li className="flex justify-between bg-blue-100 border rounded p-2">
            <div className="flex justify-center items-center h-16 w-16">
              <button type="button" onClick={handleEmojiPicker} className="text-4xl">
                {editTop}
              </button>
              <div className="absolute top-14 left-0">
                {emojiPickerEnabled ? <Picker onEmojiSelect={handleEmojiSelect} /> : <></>}
              </div>
            </div>
            <div className="flex grow">
              <textarea
                name="content"
                className="text-xl h-full whitespace-pre-wrap outline-none bg-blue-100"
                placeholder="input text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </div>
            <div className="flex gap-x-2 items-end h-16 w-16">
              <button
                onClick={() => {
                  setEditTop(post.top);
                  setEditContent(post.content);
                  setEditPost(false);
                }}
              >
                <PencilIconSolid className="h-6 w-6 text-blue-400" />
              </button>
              <button
                type="submit"
                onClick={() => handleUpdateButton()}
                className="bg-sky-400 rounded-full h-6 w-6 flex justify-center"
              >
                <PaperAirplaneIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          </li>
        </div>
      ) : (
        <div className="py-2">
          <li className="flex justify-between bg-white border rounded p-2">
            <div className="flex justify-center items-center h-16 w-16">
              <div className="text-4xl">{post.top}</div>
            </div>
            <div className="flex grow">
              <div className="text-xl h-full whitespace-pre-wrap">{post.content}</div>
            </div>
            <div className="flex gap-x-2 items-end h-16 w-16">
              <button onClick={() => setEditPost(true)}>
                <PencilIconOutline className="h-6 w-6 text-gray-400" />
              </button>
              <button onClick={() => handleDeleteButton(post.id)}>
                <TrashIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </li>
        </div>
      )}
    </>
  );
};
