import { RxArrowRight } from "react-icons/rx";
import { PiMicrophoneLight } from "react-icons/pi";

const Body = () => {
  return (
    <div className="p-4 w-full min-h-[calc(100vh-140px)] flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-7xl">
        Ai<span className="text-blue-400/90">Speech</span>
      </p>
      <p className="flex justify-center items-center gap-2 text-lg font-normal text-slate-600">
        Record <RxArrowRight className="text-blue-400" /> Transcribe
        <RxArrowRight className="text-blue-400" /> Translate
      </p>

      <button className="w-xs bg-white shadow-2xl shadow-blue-400/40 rounded-xl flex justify-between items-center py-2 px-4">
        Record
        <PiMicrophoneLight className="text-xl text-blue-600" />
      </button>

      <p className="text-slate-600">
        Or{" "}
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          upload
          <input className="hidden" type="file" accept=".mp3,.wave" />
        </label>{" "}
        a mp3 file
      </p>
    </div>
  );
};

export default Body;
