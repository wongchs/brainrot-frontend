import { useState } from "react";
import { PostFormValue, PostInterface, UserInterface } from "../../types";

interface Props {
  post:
    | {
        content: string;
        user: UserInterface;
        id: string;
      }
    | null
    | undefined;
  updatePost: (
    id: PostInterface["id"],
    newObject: PostFormValue
  ) => Promise<void>;
  deletePost: (id: PostInterface["id"]) => Promise<void>;
}

const Post = ({ post, updatePost, deletePost }: Props) => {
  const [newContent, setNewContent] = useState("");

  if (!post) {
    return <div>loading</div>;
  }

  const handleUpdate = async () => {
    const updatedPost = {
      content: newContent,
      user: post.user,
    };
    await updatePost(post.id, updatedPost);
  };

  const handleDelete = async () => {
    await deletePost(post.id);
  };

  return (
    <div>
      <h2>{post.content}</h2>
      <p>{post.user.name}</p>
      <p>by {post.user.username}</p>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Post</button>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default Post;