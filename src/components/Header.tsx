import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Icons
import { GoSidebarExpand } from "react-icons/go";

// Types
import type { RootState } from "../slices/store";
import type { SideBarType } from "../types/component.types";
import { removeUser } from "../slices/user.slice";

const Header = ({ isSideBarOpen, setIsSideBarOpen }: SideBarType) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/logout",
        withCredentials: true,
      });

      dispatch(removeUser());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-linear-to-b from-blue-200/40 to-blue-100/10">
      <div className="flex gap-2 items-center">
        {!isSideBarOpen && user.name && (
          <GoSidebarExpand
            className="cursor-pointer text-lg"
            onClick={() => setIsSideBarOpen(true)}
          />
        )}
        <Link to="/" className="font-semibold text-xl">
          Ai<span className="text-blue-400/90">Speech</span>
        </Link>
      </div>
      {user.name && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <p className="cursor-pointer bg-blue-400/80 border-2 border-blue-200 text-white rounded-full size-10 flex justify-center items-center">
                {user.name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              <Link
                to="/login"
                onClick={handleLogout}
                className="hover:bg-blue-100"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!user.name && location.pathname === "/signup" && (
        <Link
          className="text-slate-600 font-normal hover:text-blue-400 cursor-pointer ml-4 bg-white px-4 py-2 rounded-md text-sm shadow-xl shadow-blue-400/20 hover:shadow-blue-400/30"
          to="/login"
        >
          Login
        </Link>
      )}
      {!user.name && location.pathname === "/login" && (
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
