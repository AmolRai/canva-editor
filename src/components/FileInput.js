import React from "react";

const FileInput = ({ handleFileChange }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[5p] mb-12">
      <p className="font-semibold text-[1.2rem]">Ad customization</p>
      <span className="text-sm text-gray-400">
        Customise your ad and get the templates accordingly
      </span>
      <input
        className="hidden"
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
      ></input>
    </div>
  );
};

export default FileInput;
