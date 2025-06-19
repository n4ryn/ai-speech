import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";

// Components
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";

// Types
import type { RootState } from "../slices/store";

const Body = () => {
  const navigate = useNavigate();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.name) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex">
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <div className="p-4 w-full min-h-[calc(100vh-136px)] overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Body;
