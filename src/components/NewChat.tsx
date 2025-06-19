import { useCallback, useEffect, useRef, useState } from "react";
import MediaThemeTailwindAudio from "player.style/tailwind-audio/react";

// Utils
import { convertToMinutes, getUser } from "../utils/helper.function";

// Icons
import { RxArrowRight, RxStop } from "react-icons/rx";
import { PiMicrophoneLight } from "react-icons/pi";
import useRequireAuth from "../utils/requiredAuth.function";

const NewChat = () => {
  const user = getUser();
  const requireAuth = useRequireAuth(user);

  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  // Start Recording
  const handleRecord = useCallback(async () => {
    if (!requireAuth()) return;
    setFileUrl(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!stream) return;

      mediaStream.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        setFileUrl(URL.createObjectURL(blob));
        chunks.current = [];
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      alert("Please allow microphone access from settings.");
      console.error(error);
      setIsRecording(false);
    }
  }, [requireAuth]);

  // Stop Recording
  const handleStop = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
    }
    mediaStream.current?.getTracks().forEach((track) => track.stop());

    setDuration(0);
    setIsRecording(false);
  };

  // Upload File
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!requireAuth()) return;

    const file = event.target.files?.[0];
    if (file) setFileUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!isRecording) return;

    const timer = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-7xl">
        Ai<span className="text-blue-400/90">Speech</span>
      </p>

      <p className="flex justify-center items-center gap-2 text-lg font-normal text-slate-600">
        Record <RxArrowRight className="text-blue-400" /> Transcribe{" "}
        <RxArrowRight className="text-blue-400" /> Translate
      </p>

      <button
        onClick={isRecording ? handleStop : handleRecord}
        className={`w-xs bg-white shadow-2xl shadow-blue-400/40 rounded-xl flex justify-between items-center py-2 px-4 cursor-pointer my-4 ${
          isRecording && "animate-pulse"
        }`}
      >
        {isRecording ? "Recording..." : fileUrl ? "Re-record" : "Record"}

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
            type="file"
            accept=".mp3,.wav,webm"
            disabled={isRecording}
            onChange={handleFile}
          />
        </label>{" "}
        a mp3 file
      </p>

      {fileUrl && (
        <MediaThemeTailwindAudio className="w-xs [--media-accent-color:var(--color-blue-400)]">
          <audio
            slot="media"
            src={fileUrl}
            playsInline
            crossOrigin="anonymous"
          />
        </MediaThemeTailwindAudio>
      )}
    </div>
  );
};

export default NewChat;
