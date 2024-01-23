import React from "react";

const ColorPicker = ({
  colorPickerRef,
  backgroundColor,
  handleBackgroundColorChange,
  handleUsedColor,
  eyeDropperPicker,
}) => {
  return (
    <div className="flex items-center justify-center ml-[5px] mt-[3.5px]">
      <input
        ref={colorPickerRef}
        type="color"
        id="color"
        value={backgroundColor}
        onChange={(event) => {
          handleBackgroundColorChange(event);
          handleUsedColor(event);
        }}
        className="hidden"
      />
      <label htmlFor="color">
        <img
          className="mb-1"
          onClick={() => {
            eyeDropperPicker();
          }}
          width={24}
          src="https://cdn-icons-png.flaticon.com/128/10337/10337579.png"
        ></img>
      </label>
    </div>
  );
};

export default ColorPicker;
