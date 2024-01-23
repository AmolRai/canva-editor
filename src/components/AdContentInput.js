import React from "react";
import styles from "../styles/canvasEditor.module.css";

const AdContentInput = ({
  caption,
  callToAction,
  handleCaptionChange,
  handleCallToActionChange,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className={`${styles.fileContainer} max-[1200px]:w-full`}>
        <label htmlFor="file" className={styles.file}>
          <img
            width={20}
            src="https://cdn-icons-png.flaticon.com/512/5053/5053024.png"
          ></img>
          Change the ad creative image.
          <span className="text-[#525CEB] underline">select file</span>
        </label>
      </div>

      <div className="flex items-center w-full mt-4 mb-4">
        <div className="bg-gray-300 h-[1px] w-2/5"></div>
        <p className="ml-2 mr-2 text-[13px] text-gray-400">Edit contents</p>
        <div className="bg-gray-300 h-[1px] w-2/5"></div>
      </div>

      <div className={`${styles.fileContainer} max-[1200px]:w-full`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col justify-center w-[90%]">
            <span
              className={styles.file}
              style={{ fontSize: "12px", margin: "4px auto auto 4px" }}
            >
              Ad Content
            </span>
            <input
              className="mt-[5px] border-none bg-none ml-1"
              type="text"
              value={caption}
              onChange={handleCaptionChange}
            />
          </div>
          <div className="mr-[5px]">
            <img
              width={25}
              src="https://cdn-icons-png.flaticon.com/128/599/599503.png"
            />
          </div>
        </div>
      </div>
      <div className={`${styles.fileContainer} max-[1200px]:w-full`}>
        <div className="flex flex-col justify-center w-full">
          <span className={`${styles.file} text-xs mt-1 mb-auto mr-auto ml-1`}>
            CTA
          </span>
          <input
            className="mt-[5px] border-none bg-none ml-1"
            type="text"
            value={callToAction}
            onChange={handleCallToActionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdContentInput;
