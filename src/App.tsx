import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import postService from "./services/postService";
import loginService from "./services/loginService";
import { PostFormValue, PostInterface, UserInterface } from "../types";
import axios from "axios";
import PostForm from "./components/PostForm";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Post from "./components/Post";
import "./index.css";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";

function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<UserInterface | null>(null);
  const [notification, setNotification] = useState<{
    message: string | null;
    type: string | null;
  }>({
    message: null,
    type: null,
  });
  const navigate = useNavigate();

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

  const addPost = async (postObject: PostFormValue) => {
    try {
      const returnedPost = await postService.create(postObject);
      returnedPost.user = user;
      setPosts(posts.concat(returnedPost));
      setNotification({
        message: `a new post ${postObject.content} by ${postObject.user.name} added`,
        type: "success",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
        } else {
          console.error("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  const updatePost = async (id: string, postObject: PostFormValue) => {
    try {
      const returnedPost = await postService.update(id, postObject);
      returnedPost.user = user;
      setPosts(
        posts.map((post) => (post.id !== returnedPost.id ? post : returnedPost))
      );
      setNotification({
        message: `post successfully updated`,
        type: "success",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
        } else {
          console.error("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  const deletePost = async (id: string) => {
    await postService.deleteObject(id);
    setPosts(posts.filter((post) => post.id !== id));
    navigate("/");
  };

  const postMatch = useMatch("/:userId/post/:id");
  const matchedPost = postMatch
    ? posts.find((post) => post.id === postMatch.params.id)
    : null;

  if (user === null) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex">
        <Sidebar user={user} />
        <div className="flex-grow ml-72 p-8">
          <p>
            {user.name} logged in <Button onClick={handleLogout}>logout</Button>
          </p>
          <PostForm createPost={addPost} user={user} />
          <Routes>
            <Route
              path="/"
              element={
                <ul>
                  {posts.map((post) => (
                    <li key={post.id}>
                      <Link to={`/${post.user.username}/post/${post.id}`}>
                        {post.content}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            />
            <Route
              path="/:userId/post/:id"
              element={
                <Post
                  post={matchedPost}
                  updatePost={updatePost}
                  deletePost={deletePost}
                />
              }
            />
            <Route path="/profile/:id" element={<Profile user={user} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
