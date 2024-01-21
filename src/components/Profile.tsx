import { UserInterface } from "types";

interface props {
  user: UserInterface;
}

const Profile = ({ user }: props) => {
  console.log(user);
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Posts:</h3>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
