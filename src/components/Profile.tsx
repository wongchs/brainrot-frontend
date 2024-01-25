import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LikePostFormValue, PostInterface, UserInterface } from "types";
import { Skeleton } from "./ui/skeleton";
import { Heart } from "lucide-react";

interface props {
  currentUser: UserInterface;
  likePost: (
    id: PostInterface["id"],
    newObject: LikePostFormValue
  ) => Promise<void>;
}

const Profile = ({ currentUser, likePost }: props) => {
  const [userWithPosts, setUserWithPosts] = useState<UserInterface | null>(
    null
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      userService.getById(id).then((userData) => {
        setUserWithPosts(userData);
      });
    }
  }, [id]);

  if (!userWithPosts) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  const handleFollow = async () => {
    if (userWithPosts) {
      await userService.follow(userWithPosts.id);
    }
  };

  const handleUnfollow = async () => {
    if (userWithPosts) {
      await userService.unfollow(userWithPosts.id);
    }
  };

  const handleLike = async (id: string) => {
    const likedPost = {
      id: id,
      user: currentUser,
    };
    await likePost(id, likedPost);
  };

  console.log(userWithPosts.posts);

  return (
    <div className="p-4 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-2">{userWithPosts.name}</h2>
      <p className="mt-2">Username: {userWithPosts.username}</p>
      {currentUser.id === id && (
        <Link
          to={`/profile/${currentUser.username}/edit`}
          className="text-blue-500"
        >
          Edit Profile
        </Link>
      )}
      {currentUser.id !== id && (
        <div>
          <button onClick={handleFollow}>Follow</button>
          <button onClick={handleUnfollow}>Unfollow</button>
        </div>
      )}
      <h3 className="text-xl font-semibold mt-4">Posts:</h3>
      <div className="mt-4 space-y-4">
        {userWithPosts.posts &&
          userWithPosts.posts.map((post) => (
            <Link
              to={`/${userWithPosts.username}/post/${post.id}`}
              className="block p-4 rounded shadow bg-slate-50 dark:bg-gray-800 hover:bg-gray-100"
            >
              <div key={post.id} className="space-y-2">
                <p>{post.content}</p>
                <button onClick={() => handleLike(post.id)}>
                  {post.likes &&
                  post.likedBy &&
                  post.likedBy.includes(user.id) ? (
                    <Heart color="red" />
                  ) : (
                    <Heart />
                  )}
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Profile;
