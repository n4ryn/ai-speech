import { useEffect } from "react";
import { Outlet } from "react-router";

// Components
import Header from "./Header";
import Footer from "./Footer";

// Utils
import { getUser } from "../utils/helper.function";
import useRequireAuth from "../utils/requiredAuth.function";

const Body = () => {
  const user = getUser();
  const requireAuth = useRequireAuth(user);

  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="p-4 min-h-[calc(100vh-140px)] overflow-auto flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
