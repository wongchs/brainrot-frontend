import { SetStateAction, useState } from "react";
import { PostFormValue, UserInterface } from "../../types";

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
    <div>
      <h3>What's on your mind?</h3>
      <form onSubmit={addPost}>
        <p>
          title:{" "}
          <input
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Let your mind free"
          />
        </p>
        <button id="submit" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default PostForm;
