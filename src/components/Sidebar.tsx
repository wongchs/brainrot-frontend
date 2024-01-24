import { Home, Search, User, LogOut, Bell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { UserInterface } from "types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface props {
  user: UserInterface;
  handleLogout: () => void;
}

const Sidebar = ({ user, handleLogout, notifications }: props) => {
  return (
    <div className="flex fixed top-0 left-0 w-60 flex-col h-screen p-8 dark:bg-gray-800 shadow duration-100 border-r dark:border-gray-700">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">BRAINROT</h2>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <Search />
            </button>
          </span>
          <Input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
          />
        </div>
        <div className="flex flex-col w- h-full gap-56">
          <ul className="pt-2 pb-4 space-y-1 text-sm flex-grow">
            <li className="rounded-sm">
              <Link
                to="/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <Home />
                <span>Home</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link
                to={`/profile/${user.id}/${user.username}`}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <User />
                <span>Profile</span>
              </Link>
            </li>

            <li className="rounded-sm">
              <div className="flex items-center py-2 space-x-3 rounded-md">
                <ModeToggle />
              </div>
            </li>
            <li className="rounded-sm">
              <Popover>
                <PopoverTrigger className="flex items-center p-2 space-x-3 rounded-md">
                  <div className="relative">
                    <Bell />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                  <span>Notifications</span>
                </PopoverTrigger>
                <PopoverContent>
                  {notifications.map((notification, index) => (
                    <p key={index}>{notification.message}</p>
                  ))}
                </PopoverContent>
              </Popover>
            </li>
          </ul>
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {user && (
              <li className="rounded-sm">
                <div className="flex items-center py-2 space-x-3 rounded-md">
                  <p className="text-sm">Logged in as: {user.username}</p>
                </div>
              </li>
            )}
            {user && (
              <li className="rounded-sm">
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <LogOut />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
