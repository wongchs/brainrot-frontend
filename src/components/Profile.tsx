import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserInterface } from "types";
import { Skeleton } from "./ui/skeleton";

interface props {
  currentUser: UserInterface;
}

const Profile = ({ currentUser }: props) => {
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
      <h3 className="text-xl font-semibold mt-4">Posts:</h3>
      <ul className="list-disc ml-5">
        {userWithPosts.posts &&
          userWithPosts.posts.map((post) => (
            <li key={post.id} className="mt-2">
              <Link to={`/${userWithPosts.username}/post/${post.id}`}>
                {post.content}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Profile;
