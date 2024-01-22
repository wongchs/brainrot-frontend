import { useEffect, useState } from "react";
import postService from "./services/postService";
import {
  LikePostFormValue,
  PostFormValue,
  PostInterface,
  UserFormValue,
  UserInterface,
} from "../types";
import axios from "axios";
import PostForm from "./components/PostForm";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Post from "./components/Post";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { ModeToggle } from "./components/mode-toggle";
import Register from "./components/Register";
import userService from "./services/userService";
import EditProfile from "./components/EditProfile";

function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [user, setUser] = useState<UserInterface | null>(null);
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
      userService.setToken(user.token);
      console.log(user.token);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      postService.setToken(user.token);
      userService.setToken(user.token);
    }
  }, [user]);

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    navigate("/login");
  };

  const addPost = async (postObject: PostFormValue) => {
    try {
      const returnedPost = await postService.create(postObject);
      returnedPost.user = user;
      setPosts(posts.concat(returnedPost));
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

  const likePost = async (id: string, postObject: LikePostFormValue) => {
    try {
      const likedPost = await postService.like(id, postObject);
      likedPost.user = user;
      setPosts(
        posts.map((post) => (post.id !== likedPost.id ? post : likedPost))
      );
    } catch (e) {
      console.error("unknow error", e);
    }
  };

  const updateUser = async (id: string, userObject: UserFormValue) => {
    try {
      const returnedUser = await userService.update(id, userObject);
      setUser(returnedUser);
    } catch (e: unknown) {
      console.error("Unknown error", e);
    }
  };

  const postMatch = useMatch("/:userId/post/:id");
  const matchedPost = postMatch
    ? posts.find((post) => post.id === postMatch.params.id)
    : null;

  if (user === null) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex justify-center items-center min-h-screen">
          <header className="fixed top-0 left-0 right-0 dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">BRAINROT</h1>
            <div className="flex justify-center items-center gap-2">
              Switch Theme
              <ModeToggle />
            </div>
          </header>
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex">
        <Sidebar user={user} handleLogout={handleLogout} />
        <div className="flex-grow ml-72 p-8">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
              path="/"
              element={
                <div>
                  <PostForm createPost={addPost} user={user} />
                  <ul>
                    {posts.map((post) => (
                      <li key={post.id}>
                        <Link to={`/${post.user.username}/post/${post.id}`}>
                          {post.content}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
            <Route
              path="/:userId/post/:id"
              element={
                <Post
                  post={matchedPost}
                  updatePost={updatePost}
                  deletePost={deletePost}
                  likePost={likePost}
                />
              }
            />
            <Route path="/profile/:id" element={<Profile user={user} />} />
            <Route
              path="/profile/:id/edit"
              element={<EditProfile user={user} updateUser={updateUser} />}
            />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
