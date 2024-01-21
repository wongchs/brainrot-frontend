import { useState } from "react";
import { UserInterface, UserFormValue } from "types";

interface props {
  user: UserInterface;
  updateUser: (id: string, userObject: UserFormValue) => Promise<void>;
}

const EditProfile = ({ user, updateUser }: props) => {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateUser(user.id, {
      username,
      name,
      password,
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
          required
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProfile;
