import { useLocation, useNavigate } from "react-router";
import type { UserType } from "../types/component.types";

const useRequireAuth = (user: UserType | null) => {
  const navigate = useNavigate();
  const location = useLocation();

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(location.pathname);

  return () => {
    if (user?.name && isPublicPath) {
      navigate("/");
      return false;
    }

    if (!user?.name && !isPublicPath) {
      navigate("/login");
      return false;
    }

    return true;
  };
};

export default useRequireAuth;
