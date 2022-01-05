import React from "react";

const Input = ({
  value,
  setError,
  setState,
  inputType,
  placeholder,
  keyPress,
}) => {
  return (
    <input
      value={value}
      autoCapitalize="none"
      onClick={() => setError(false)}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      onKeyPress={keyPress}
      type={inputType}
      className="md:w-1/2 px-2 font-semibold py-2 outline-none border-transparent text-sm border-2 transition-colors duration-200 focus:border-borderAndOtherRed rounded-lg"
    />
  );
};

export default Input;