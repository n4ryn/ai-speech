// Icons
import { GoSidebarExpand } from "react-icons/go";

// Types
import type { SideBarType } from "../types/component.types";

const Header = ({ isSideBarOpen, setIsSideBarOpen }: SideBarType) => {
  return (
    <div className="flex justify-between items-center p-4 text-2xl">
      <div className="flex gap-2 items-center">
        {!isSideBarOpen && (
          <GoSidebarExpand
            className="cursor-pointer text-lg"
            onClick={() => setIsSideBarOpen(true)}
          />
        )}
        <a href="/" className="font-semibold">
          Ai<span className="text-blue-400/90">Speech</span>
        </a>
      </div>
      <p className="cursor-pointer bg-blue-400/80 border-2 border-blue-200 text-white rounded-full size-10 flex justify-center items-center">
        V
      </p>
    </div>
  );
};

export default Header;
