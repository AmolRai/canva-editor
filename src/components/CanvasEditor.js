import React, { useState, useRef } from "react";
import Canvas from "./Canvas";
import AdContentInput from "./AdContentInput";
import FileInput from "./FileInput";
import ColorPicker from "./ColorPicker";
import ColorPickerList from "./ColorPickerList";
import { canvaData } from "../utils/canvaData";

const CanvasEditor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState(canvaData.caption.text);
  const [callToAction, setCallToAction] = useState(canvaData.cta.text);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [usedColors, setUsedColors] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const colorPickerRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const handleCaptionChange = (event) => {
    if (!selectedImage) {
      alert("Upload the Image");
      return;
    }
    setCaption(event.target.value);
  };

  const handleCallToActionChange = (event) => {
    if (!selectedImage) {
      alert("Upload the Image");
      return;
    }
    setCallToAction(event.target.value);
  };

  const handleBackgroundColorChange = (event) => {
    const value = event.target.value;
    setBackgroundColor(value);
    setColorIndex((prev) => (prev + 1) % 5);
  };

  const eyeDropperPicker = async () => {
    if (!window.EyeDropper) {
      console.log("Your browser does not support the EyeDropper API");
      return;
    }

    let eyeDropper = new window.EyeDropper();
    try {
      const color = await eyeDropper.open();
      setBackgroundColor(color?.sRGBHex);
      setColorIndex((prev) => (prev + 1) % 5);
      handleUsedColor(color?.sRGBHex);
    } catch (error) {
      console.error("EyeDropper API Error:", error);
    }
  };

  const handleUsedColor = (event) => {
    const value = event?.target?.value || event;
    setUsedColors((prev) => {
      const colorsArray = [...prev];
      if (colorsArray.length < 5) {
        colorsArray.push(value);
      } else {
        colorsArray[colorIndex] = value;
      }
      return colorsArray;
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 h-screen max-[1200px]:flex-wrap">
      <Canvas
        caption={caption}
        callToAction={callToAction}
        selectedImage={selectedImage}
        backgroundColor={backgroundColor}
      />
      <div className="flex flex-col items-center justify-center ml-6 max-[1200px]:mt-20 pb-20">
        <FileInput handleFileChange={handleFileChange} />
        <AdContentInput
          caption={caption}
          callToAction={callToAction}
          handleCaptionChange={handleCaptionChange}
          handleCallToActionChange={handleCallToActionChange}
        />
        <div className="cursor-pointer text-[20px] w-full">
          <span className="text-sm text-gray-400">Choose your color</span>
          <div className="flex mt-1">
            <ColorPickerList
              usedColors={usedColors}
              setBackgroundColor={(color) => setBackgroundColor(color)}
            />
            <ColorPicker
              colorPickerRef={colorPickerRef}
              handleBackgroundColorChange={handleBackgroundColorChange}
              handleUsedColor={handleUsedColor}
              eyeDropperPicker={eyeDropperPicker}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
