import { Home, User, LogOut, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Notification, UserInterface } from "types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface props {
  user: UserInterface;
  handleLogout: () => void;
  notifications: Notification[];
  showNotification: boolean;
  handleNotificationClick: () => void;
}

const FooterNav = ({
  user,
  handleLogout,
  notifications,
  showNotification,
  handleNotificationClick,
}: props) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 flex items-center justify-around shadow-lg z-50 bg-slate-100 dark:bg-gray-800">
      <Link to="/" className="p-2">
        <Home />
      </Link>
      <Link to={`/profile/${user.id}/${user.username}`} className="p-2">
        <User />
      </Link>
      <Popover>
        <PopoverTrigger
          onClick={handleNotificationClick}
          className="flex items-center p-2 space-x-3 rounded-md"
        >
          <div className="relative">
            <Bell />
            {showNotification && notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <p key={index}>{notification.message}</p>
            ))
          ) : (
            <p>No notifications</p>
          )}
        </PopoverContent>
      </Popover>
      <button onClick={handleLogout} className="p-2">
        <LogOut />
      </button>
    </div>
  );
};

export default FooterNav;
