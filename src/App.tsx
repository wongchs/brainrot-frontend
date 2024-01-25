import { useEffect, useState } from "react";
import postService from "./services/postService";
import {
  CommentInterface,
  LikePostFormValue,
  Notification,
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
import { io } from "socket.io-client";
import { useMediaQuery } from "react-responsive";
import FooterNav from "./components/FooterNav";
import { Separator } from "./components/ui/separator";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
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

  useEffect(() => {
    const socket = io("http://localhost:3001/");
    console.log(socket);
    if (user) {
      socket.emit("join", user.id);
    }
    socket.on("notification", (notification) => {
      handleNewNotification(notification);
      console.log(notification);
    });
    return () => {
      if (user) {
        socket.emit("leave", user.id);
      }
      socket.off("notification");
    };
  }, [user]);

  const handleNewNotification = (notification: Notification) => {
    setNotifications([...notifications, notification]);
    setShowNotification(true);
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
  };

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
      setPosts(
        posts.map((post) =>
          post.id !== likedPost.id ? post : { ...post, likes: likedPost.likes }
        )
      );
      console.log(likedPost.user);
    } catch (e) {
      console.error("unknow error", e);
    }
  };

  const commentPost = async (id: string, commentObject: CommentInterface) => {
    try {
      setPosts(
        posts.map((post) =>
          post.id !== id
            ? post
            : { ...post, comments: [...(post.comments || []), commentObject] }
        )
      );
      const returnedComment = await postService.comment(id, commentObject);
      console.log(returnedComment);
    } catch (e) {
      console.error("Unknown error", e);
      setPosts(posts);
    }
  };

  const updateUser = async (id: string, userObject: UserFormValue) => {
    try {
      const returnedUser = await userService.update(id, userObject);
      const updatedUser = { ...user, ...returnedUser };
      setUser(updatedUser);
      console.log(returnedUser);
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
        {isDesktopOrLaptop ? (
          <Sidebar
            user={user}
            handleLogout={handleLogout}
            notifications={notifications}
            showNotification={showNotification}
            handleNotificationClick={handleNotificationClick}
          />
        ) : (
          <FooterNav
            user={user}
            handleLogout={handleLogout}
            notifications={notifications}
            showNotification={showNotification}
            handleNotificationClick={handleNotificationClick}
          />
        )}
        <div className={`flex-grow p-8 ${isDesktopOrLaptop ? "mx-72" : ""}`}>
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
              path="/"
              element={
                <div>
                  <PostForm createPost={addPost} user={user} />
                  <Separator />
                  <PostList posts={posts} />
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
                  commentPost={commentPost}
                  user={user}
                />
              }
            />
            <Route
              path="/profile/:id/:username"
              element={<Profile currentUser={user} />}
            />

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
