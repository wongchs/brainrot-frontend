import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { LikePostFormValue, PostInterface, UserInterface } from "types";

interface PostListProps {
  posts: PostInterface[];
  likePost: (
    id: PostInterface["id"],
    newObject: LikePostFormValue
  ) => Promise<void>;
  user: UserInterface;
}

const PostList: React.FC<PostListProps> = ({ posts, likePost, user }) => {
  const handleLike = async (id: string) => {
    const likedPost = {
      id: id,
      user: user,
    };
    await likePost(id, likedPost);
  };

  return (
    <div className="mt-4 space-y-4">
      {posts.map((post) => (
        <Link
          to={`/${post.user.username}/post/${post.id}`}
          className="block p-4 rounded shadow bg-slate-50 dark:bg-gray-800 hover:bg-gray-100"
        >
          <div key={post.id} className="space-y-2">
            <h2 className="font-bold">{post.user.name}</h2>
            <p className="text-sm">@{post.user.username}</p>
            <p>{post.content}</p>
            <button onClick={() => handleLike(post.id)}>
              {post.likes && post.likedBy && post.likedBy.includes(user.id) ? (
                <Heart color="red" />
              ) : (
                <Heart />
              )}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
