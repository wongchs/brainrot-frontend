import { SetStateAction, useState } from "react";
import { PostFormValue, UserInterface } from "../../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  createPost: (post: PostFormValue) => void;
  user: UserInterface | null;
}

const PostForm = ({ createPost, user }: Props) => {
  const [content, setContent] = useState("");

  const handleContentChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setContent(event.target.value);
  };

  const addPost = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (user) {
      createPost({
        content: content,
        user: user,
      });
    }
  };

  return (
    <div className="rounded-md dark:bg-gray-800 px-4">
      <form
        className="flex items-center gap-4 justify-between py-6"
        onSubmit={addPost}
      >
        <Input
          className="border-none dark:bg-slate-900 text-xl"
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Start poasting"
        />
        <Button
          variant="outline"
          className="rounded-full dark:bg-slate-900 text-md"
          id="submit"
          type="submit"
        >
          Poast
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
