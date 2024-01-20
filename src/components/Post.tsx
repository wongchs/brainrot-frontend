import { UserInterface } from "../../types";

interface Props {
  post:
    | {
        content: string;
        user: UserInterface;
      }
    | null
    | undefined;
}

const Post = ({ post }: Props) => {
  if (!post) {
    return <div>loading</div>;
  }
  return (
    <div>
      <h2>{post.content}</h2>
      <p>{post.user.name}</p>
      <p>by {post.user.username}</p>
    </div>
  );
};

export default Post;
