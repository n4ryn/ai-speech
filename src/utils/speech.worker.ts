import { pipeline, env } from "@huggingface/transformers";

// Disable local models
env.allowLocalModels = false;

export const speechRecognition = async (url: string, aiModel: string) => {
  const transcriber = await pipeline("automatic-speech-recognition", aiModel, {
    dtype: "q8",
    device: "webgpu",
  });

  const output = await transcriber(url, {
    return_timestamps: true,
    chunk_length_s: 10,
    stride_length_s: 2,
  });

  return output;
};
