import { useEffect, useRef } from "react";

const AudioPlayer = ({
  audioUrl,
  mimeType,
}: {
  audioUrl: string;
  mimeType: string;
}) => {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const audioSource = useRef<HTMLSourceElement>(null);

  // Updates src when url changes
  useEffect(() => {
    if (audioPlayer.current && audioSource.current) {
      audioSource.current.src = audioUrl;
      audioPlayer.current.load();
    }
  }, [audioUrl]);

  return (
    <div className="w-sm">
      <audio
        ref={audioPlayer}
        controls
        className="w-full rounded-xl bg-white shadow-xl shadow-blue-400/20"
      >
        <source ref={audioSource} type={mimeType}></source>
      </audio>
    </div>
  );
};

export default AudioPlayer;
