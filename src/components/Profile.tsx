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
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{userWithPosts.name}</h2>
      <Link to={`/profile/${user.username}/edit`}>Edit Profile</Link>
      <p>Username: {userWithPosts.username}</p>
      <h3>Posts:</h3>
      <ul>
        {userWithPosts.posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
