import { useState } from "react";

// Constants
import { LANGUAGES } from "../constants";

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type SettingModalProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

const SettingModal = ({ ref }: SettingModalProps) => {
  const [quantized, setQuantized] = useState(false);
  const [multilingual, setMultilingual] = useState(false);

  const models: Record<string, number[]> = {
    "Xenova/whisper-tiny": [41, 152],
    "Xenova/whisper-base": [77, 291],
    "Xenova/whisper-small": [249],
    "Xenova/whisper-medium": [776],
    "distil-whisper/distil-medium.en": [402],
    "distil-whisper/distil-large-v2": [767],
  };

  const languageKeys = Object.keys(LANGUAGES);
  const languageNames = Object.values(LANGUAGES).map(titleCase);

  return (
    <dialog
      id="my_modal_5"
      ref={ref}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Settings</h3>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select the model to use.</legend>
          <select defaultValue="" className="select w-full">
            {Object.keys(models)
              .filter((key) => quantized || models[key].length === 2)
              .filter((key) => multilingual || key.startsWith("Xenova/whisper"))
              .map((key) => {
                const modelSize =
                  models[key][quantized ? 0 : models[key].length - 1];
                const suffix =
                  multilingual || key.startsWith("distil-whisper/")
                    ? ""
                    : ".en";
                return (
                  <option key={key} value={key}>
                    {`${key}${suffix} (${modelSize}MB)`}
                  </option>
                );
              })}
          </select>
        </fieldset>

        <div className="flex justify-between items-center p-2 text-sm">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={multilingual}
              className="checkbox checkbox-xs"
              onChange={(e) => setMultilingual(e.target.checked)}
            />
            Multilingual
          </label>

          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={quantized}
              className="checkbox checkbox-xs"
              onChange={(e) => setQuantized(e.target.checked)}
            />
            Quantized
          </label>
        </div>

        {multilingual && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Select the source language
              </legend>
              <select defaultValue="" className="select w-full">
                {languageKeys.map((key, index) => (
                  <option key={key} value={key}>
                    {languageNames[index]}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Select the output mode
              </legend>
              <select defaultValue="transcribe" className="select w-full">
                <option value="transcribe">Transcribe</option>
                <option value="translate">Translate</option>
              </select>
            </fieldset>
          </>
        )}

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SettingModal;
