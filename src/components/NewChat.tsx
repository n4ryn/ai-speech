import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Utils
import { getUser } from "../utils/helper.function";

// Icons
import { RxArrowRight, RxStop } from "react-icons/rx";
import { PiMicrophoneLight } from "react-icons/pi";

const NewChat = () => {
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const user = getUser();

  // Start Recording
  const handleRecord = () => {
    if (!user || !user.name) {
      navigate("/login");
    }

    setIsRecording(true);
    setFile(null);
  };

  // Stop Recording
  const handleStop = () => {
    setIsRecording(false);
    setDuration(0);
  };

  // Upload File
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !user.name) {
      navigate("/login");
    }

    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const convertToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds} min`;
  };

  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRecording]);

  console.log(file);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-7xl">
        Ai<span className="text-blue-400/90">Speech</span>
      </p>

      <p className="flex justify-center items-center gap-2 text-lg font-normal text-slate-600">
        Record <RxArrowRight className="text-blue-400" /> Transcribe
        <RxArrowRight className="text-blue-400" /> Translate
      </p>

      <button
        onClick={() => (isRecording ? handleStop() : handleRecord())}
        className={`w-xs bg-white shadow-2xl shadow-blue-400/40 rounded-xl flex justify-between items-center py-2 px-4 cursor-pointer my-4 ${
          isRecording && "animate-pulse"
        }`}
      >
        {isRecording ? "Recording..." : "Record"}

        {isRecording ? (
          <div className="flex gap-2">
            {convertToMinutes(duration)}
            <RxStop className="text-2xl text-red-600 bg-red-100 p-1 rounded-full" />
          </div>
        ) : (
          <PiMicrophoneLight className="text-xl text-blue-600" />
        )}
      </button>

      <p className="text-slate-600">
        Or{" "}
        <label
          className={`text-blue-400 cursor-pointer hover:text-blue-600 duration-200 ${
            isRecording && "cursor-wait text-slate-400 hover:text-slate-400"
          }`}
        >
          upload
          <input
            className="hidden"
            disabled={isRecording}
            type="file"
            accept=".mp3,.wav"
            onChange={handleFile}
          />
        </label>{" "}
        a mp3 file
      </p>

      {/* {file && (
        <MediaThemeTailwindAudio className="w-xs [--media-accent-color:var(--color-blue-400)]">
          <audio
            slot="media"
            src={URL.createObjectURL(file)}
            playsInline
            crossOrigin="anonymous"
            className=""
          ></audio>
        </MediaThemeTailwindAudio>
      )} */}
    </div>
  );
};

export default NewChat;
