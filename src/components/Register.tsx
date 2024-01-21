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
import { UserInterface } from "types";
import userService from "@/services/userService";
import loginService from "@/services/loginService";

interface props {
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}

const Register = ({ setUser }: props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const user = await userService.register({
        username,
        name,
        password,
      });

      const userForLogin = {
        username: user.username,
        password: password,
      };

      const loggedUser = await loginService.login(userForLogin);

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      setUsername("");
      setName("");
      setPassword("");
      navigate("/");
    } catch (exception) {
      setErrorMessage("Registration failed. Please try again.");
      console.error(exception);
    }
  };

  return (
    <Card className="w-[350px] dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please enter your details to create an account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                placeholder="Enter your name"
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
          <Button variant="outline" type="reset">
            Reset
          </Button>
          <Button type="submit">Register</Button>
        </CardFooter>
      </form>
      <Link to={"/login"}>
        <div className="text-center p-6 pt-0">
          Already have an account?
          <span className="text-blue-500 font-bold"> Login!</span>
        </div>
      </Link>
    </Card>
  );
};

export default Register;
