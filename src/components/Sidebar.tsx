import { Home, Search } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";

function Sidebar() {
  return (
    <div
      className="flex fixed top-0 left-0 w-40 flex-col h-screen p-3 shadow duration-300"
    >
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
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <div className="flex items-center p-2 space-x-3 rounded-md">
                <Home />
                <span>Home</span>
              </div>
            </li>
            <li className="rounded-sm">
              <div className="flex items-center py-2 space-x-3 rounded-md">
                <ModeToggle />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
