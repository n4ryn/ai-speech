import { pipeline } from "@huggingface/transformers";

export const speechRecognition = async (url: string) => {
  const transcriber = await pipeline(
    "automatic-speech-recognition",
    "Xenova/whisper-tiny.en"
  );

  const output = await transcriber(url);

  return output;
};
