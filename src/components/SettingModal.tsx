import { useState } from "react";
import { useDispatch } from "react-redux";

// Slices
import { updateAiModel } from "../slices/aiModel.slice";

// Constants
import { LANGUAGES, AI_MODELS } from "../constants";

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface SettingModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

interface ModelState {
  mod: string;
  lang: string;
}

const SettingModal = ({ ref }: SettingModalProps) => {
  const dispatch = useDispatch();

  const [quantized, setQuantized] = useState(false);
  const [multilingual, setMultilingual] = useState(false);
  const [model, setModel] = useState<ModelState>({ mod: "", lang: "" });

  const languageKeys = Object.keys(LANGUAGES);
  const languageNames = Object.values(LANGUAGES).map(titleCase);

  const handleModelChange = () => {
    if (!model.mod) return;

    const suffix =
      multilingual || model.mod.startsWith("distil-whisper/") ? "" : ".en";

    const fullModel = model.mod + suffix;

    dispatch(updateAiModel(fullModel));
  };

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
          <select
            defaultValue=""
            className="select w-full"
            onChange={(e) =>
              setModel((prev) => ({ ...prev, mod: e.target.value }))
            }
          >
            <option disabled value="">
              -- Select a model --
            </option>
            {Object.keys(AI_MODELS)
              .filter((key) => quantized || AI_MODELS[key].length === 2)
              .filter((key) => multilingual || key.startsWith("Xenova/whisper"))
              .map((key) => {
                const modelSize =
                  AI_MODELS[key][quantized ? 0 : AI_MODELS[key].length - 1];
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
              <select
                defaultValue=""
                className="select w-full"
                onChange={(e) =>
                  setModel((prev) => ({ ...prev, lang: e.target.value }))
                }
              >
                <option disabled value="">
                  -- Select a language --
                </option>
                {languageKeys.map((key, index) => (
                  <option key={key} value={key}>
                    {languageNames[index]}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Select a task to perform
              </legend>
              <select
                defaultValue="transcribe"
                className="select w-full"
                disabled
              >
                <option value="transcribe">Transcribe</option>
                <option value="translate">Translate</option>
              </select>
            </fieldset>
          </>
        )}

        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn bg-blue-400/90 hover:shadow-lg hover:shadow-blue-200 text-white"
              onClick={handleModelChange}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SettingModal;
