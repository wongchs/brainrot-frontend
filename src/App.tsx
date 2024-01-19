import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import postService from "./services/postService";
import loginService from "./services/loginService";
import { PostInterface, UserInterface } from "../types";

function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<UserInterface | null>(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    postService.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      postService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setNotification({ message: `welcome ${user.name}`, type: "success" });
    } catch (exception) {
      setNotification({ message: "wrong username or password", type: "error" });
    }
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };

  const handleLogout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <Notification
          notification={notification.message}
          type={notification.type}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
