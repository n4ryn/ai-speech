import { RxPlus } from "react-icons/rx";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <p className="font-semibold">
        Ai<span className="text-blue-400">Speech</span>
      </p>
      <button className="bg-white text-blue-400 p-2 rounded-lg shadow-2xl shadow-blue-400/60 flex justify-center items-center gap-2 cursor-pointer">
        New <RxPlus />
      </button>
    </div>
  );
};

export default Header;
