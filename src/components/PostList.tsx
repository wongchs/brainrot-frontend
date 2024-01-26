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
  const handleLike = async (post: PostInterface) => {
    const likedPost = {
      id: post.id,
      user: user,
    };
    if (
      post.likedBy?.some((userId) => userId.toString() === user.id.toString())
    ) {
      post.likedBy = post.likedBy.filter(
        (userId) => userId.toString() !== user.id.toString()
      );
    } else {
      post.likedBy = [...(post.likedBy || []), user];
    }
    await likePost(post.id, likedPost);
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
            <button
              onClick={() => handleLike(post)}
              style={{
                color: post.likedBy?.some(
                  (userId) => userId.toString() === user.id.toString()
                )
                  ? "red"
                  : "black",
              }}
            >
              <Heart />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
