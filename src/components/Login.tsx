import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import LoginForm from "./LoginForm";
import loginService from "@/services/loginService";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<{
    message: string | null;
    type: string | null;
  }>({
    message: null,
    type: null,
  });
  const navigate = useNavigate();

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
      navigate("/");
    } catch (exception) {
      setNotification({ message: "wrong username or password", type: "error" });
    }
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };

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
};

export default Login;
