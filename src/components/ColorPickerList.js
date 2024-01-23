import React, { useState } from "react";

const ColorPickerList = ({ usedColors, setBackgroundColor }) => {
  const [selectedBorderColor, setSelectedBorderColor] = useState(null);

  return (
    <div className="flex items-center justify-center">
      {usedColors?.map((color, index) => {
        return (
          <div
            key={index}
            style={{
              border: selectedBorderColor === index && "1.5px solid #525ceb",
            }}
            className="h-8 w-8 rounded-[50%] flex items-center justify-center"
            onClick={() => {
              setSelectedBorderColor(index);
            }}
          >
            <span
              key={index}
              style={{
                backgroundColor: color,
              }}
              className="h-6 w-6 rounded-[50%]"
              onClick={() => setBackgroundColor(color)}
            ></span>
          </div>
        );
      })}
    </div>
  );
};

export default ColorPickerList;
