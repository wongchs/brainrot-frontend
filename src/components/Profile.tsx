import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LikePostFormValue, PostInterface, UserInterface } from "types";
import { Skeleton } from "./ui/skeleton";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

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
      setUserWithPosts({
        ...userWithPosts,
        followers: [...userWithPosts.followers, currentUser.id],
      });
      await userService.follow(userWithPosts.id);
    }
  };

  const handleUnfollow = async () => {
    if (userWithPosts) {
      setUserWithPosts({
        ...userWithPosts,
        followers: userWithPosts.followers.filter(
          (userId) => userId !== currentUser.id
        ),
      });
      await userService.unfollow(userWithPosts.id);
    }
  };

  const handleLike = async (post: PostInterface) => {
    const likedPost = {
      id: post.id,
      user: currentUser,
    };
    if (
      post.likedBy?.some(
        (userId) => userId.toString() === currentUser.id.toString()
      )
    ) {
      post.likedBy = post.likedBy.filter(
        (userId) => userId.toString() !== currentUser.id.toString()
      );
    } else {
      post.likedBy = [...(post.likedBy || []), currentUser];
    }
    await likePost(post.id, likedPost);
  };

  const isFollowing = userWithPosts.followers.includes(currentUser.id);

  console.log(userWithPosts.posts);

  return (
    <div className="p-4 shadow-md rounded-md bg-slate-200 dark:bg-slate-700">
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
          {!isFollowing && (
            <Button variant={"outline"} onClick={handleFollow}>
              Follow
            </Button>
          )}
          {isFollowing && (
            <Button variant={"outline"} onClick={handleUnfollow}>
              Unfollow
            </Button>
          )}
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
                <h2 className="font-bold">{userWithPosts.name}</h2>
                <p className="text-sm">@{userWithPosts.username}</p>
                <p>{post.content}</p>
                <button
                  onClick={() => handleLike(post)}
                  style={{
                    color: post.likedBy?.some(
                      (userId) =>
                        userId.toString() === currentUser.id.toString()
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
    </div>
  );
};

export default Profile;
