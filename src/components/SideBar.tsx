// Icons
import { GoSidebarCollapse } from "react-icons/go";
import { RiDeleteBin2Line } from "react-icons/ri";
import { RxPlus } from "react-icons/rx";

// Constants
import { chats } from "../constants/chats";

// Types
import type { SideBarType } from "../types/component.types";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }: SideBarType) => {
  return (
    <div
      className={`h-full w-[320px] bg-blue-100/50 rounded-br-2xl rounded-tr-2xl pt-6 p-4 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-blue-100/50 [&::-webkit-scrollbar-thumb]:bg-blue-200 ${
        isSideBarOpen ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center text-lg">
        <a href="/">
          <img src="/vite.svg" alt="logo" className="size-6" />
        </a>
        <GoSidebarCollapse
          className="cursor-pointer"
          onClick={() => setIsSideBarOpen(false)}
        />
      </div>

      <div className="flex flex-col gap-4 py-1 mt-12">
        <a
          href="/"
          className="bg-white mb-4 text-blue-400 p-2 rounded-lg shadow-2xl shadow-blue-400/60 flex justify-center items-center gap-2 cursor-pointer"
        >
          New <RxPlus />
        </a>
        <p className="text-lg font-semibold text-slate-500">Chats</p>

        {chats &&
          chats.map((item) => (
            <div
              className=" bg-blue-200/40 hover:bg-blue-200/80 cursor-pointer transition-all delay-75 ease-in-out px-4 py-2 rounded-lg flex gap-4 justify-between items-center"
              key={item.id}
            >
              <p className="text-sm line-clamp-1">{item.title}</p>
              <RiDeleteBin2Line className="text-md text-red-400 hover:text-red-600" />
            </div>
          ))}
        {!chats?.length && (
          <p className="text-slate-500 text-center">No chats found!</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;
