import { Link } from "react-router-dom";
import { PostInterface } from "types";

interface PostListProps {
  posts: PostInterface[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="mt-4 space-y-4">
      {posts.map((post) => (
        <Link
          to={`/${post.user.username}/post/${post.id}`}
          className="block p-4 rounded shadow dark:bg-gray-800"
        >
          <div key={post.id} className="space-y-2">
            <h2 className="font-bold">{post.user.name}</h2>
            <p className="text-sm">@{post.user.username}</p>
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
