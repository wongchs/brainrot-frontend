import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserInterface } from "types";

interface props {
  user: UserInterface;
}

const Profile = ({ user }: props) => {
  const [userWithPosts, setUserWithPosts] = useState<UserInterface | null>(
    null
  );

  useEffect(() => {
    userService.getById(user.id).then((userData) => {
      setUserWithPosts(userData);
    });
  }, [user.id]);

  console.log(userWithPosts);
  if (!userWithPosts) {
    return <div className="text-red-500">User not found</div>;
  }

  return (
    <div className="p-4 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-2">{userWithPosts.name}</h2>
      <p className="mt-2">Username: {userWithPosts.username}</p>
      <Link to={`/profile/${user.username}/edit`} className="text-blue-500">
        Edit Profile
      </Link>
      <h3 className="text-xl font-semibold mt-4">Posts:</h3>
      <ul className="list-disc ml-5">
        {userWithPosts.posts &&
          userWithPosts.posts.map((post) => (
            <li key={post.id} className="mt-2">
              {post.content}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Profile;
