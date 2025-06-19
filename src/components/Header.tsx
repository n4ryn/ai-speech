import { Link } from "react-router";

// Icons
import { GoSidebarExpand } from "react-icons/go";

// Types
import type { SideBarType } from "../types/component.types";

const Header = ({ isSideBarOpen, setIsSideBarOpen }: SideBarType) => {
  const user = null;

  return (
    <div className="flex justify-between items-center p-4 bg-linear-to-b from-blue-200/40 to-blue-100/10">
      <div className="flex gap-2 items-center">
        {!isSideBarOpen && user && (
          <GoSidebarExpand
            className="cursor-pointer text-lg"
            onClick={() => setIsSideBarOpen(true)}
          />
        )}
        <Link to="/" className="font-semibold text-xl">
          Ai<span className="text-blue-400/90">Speech</span>
        </Link>
      </div>
      {user && (
        <p className="cursor-pointer bg-blue-400/80 border-2 border-blue-200 text-white rounded-full size-10 flex justify-center items-center">
          V
        </p>
      )}
      {!user && location.pathname === "/signup" && (
        <Link
          className="text-slate-600 font-normal hover:text-blue-400 cursor-pointer ml-4 bg-white px-4 py-2 rounded-md text-sm shadow-xl shadow-blue-400/20 hover:shadow-blue-400/30"
          to="/login"
        >
          Login
        </Link>
      )}
      {!user && location.pathname === "/login" && (
        <Link
          className="text-slate-600 font-normal hover:text-blue-400 cursor-pointer ml-4 bg-white px-4 py-2 rounded-md text-sm shadow-xl shadow-blue-400/20 hover:shadow-blue-400/30"
          to="/signup"
        >
          Signup
        </Link>
      )}
    </div>
  );
};

export default Header;
