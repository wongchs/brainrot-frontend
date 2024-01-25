import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginService from "@/services/loginService";
import { UserInterface } from "types";

interface props {
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}

const Login = ({ setUser }: props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setPassword("");
      navigate("/");
    } catch (exception) {
      setErrorMessage("Incorrect credentials. Please try again.");
      console.error(exception);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  return (
    <Card className="w-[350px] bg-slate-50 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your credentials to login.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter your password"
              />
              {errorMessage && (
                <p className="text-red-500 font-bold">{errorMessage}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="reset" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
      <Link to={"/register"}>
        <div className="text-center p-6 pt-0">
          Don't have an account?<span className="text-blue-500 font-bold"> Register now!</span>
        </div>
      </Link>
    </Card>
  );
};

export default Login;
