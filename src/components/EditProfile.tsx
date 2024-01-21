import { useState } from "react";
import { UserInterface, UserFormValue } from "types";

interface props {
  user: UserInterface;
  updateUser: (id: string, userObject: UserFormValue) => Promise<void>;
}

const EditProfile = ({ user, updateUser }: props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    const userObject: UserFormValue = {
      username: username || user.username,
      name: name || user.name,
      password: password,
    };

    await updateUser(user.id, userObject);
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        Username:{" "}
        <input
          type="text"
          placeholder={user.username}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Name:{" "}
        <input
          type="text"
          placeholder={user.name}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProfile;
