import type { InputProps } from "../../types/component.types";

const Input: React.FC<InputProps> = (props) => {
  const { label, type, placeholder, value, errorMessage, ...rest } = props;

  return (
    <>
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        className={`input focus:outline-none ${
          errorMessage && "border-red-400 focus:border-red-600"
        }`}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      {errorMessage && <p className="text-red-600 mt-[-4px]">{errorMessage}</p>}
    </>
  );
};

export default Input;
