import designPattern from "../assets/Design_Pattern.png";
import maskStroke from "../assets/Mask_Stroke.png";
import mask from "../assets/mask.png";
import { canvaData } from "./canvaData";

// Function to draw the canvas
const drawCanvas = (
  canvas,
  selectedImage,
  caption,
  callToAction,
  backgroundColor
) => {
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = backgroundColor || "#0369A1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw design elements on the canvas
  drawDesignElements(ctx, canvas.width, canvas.height);

  // If there is a selected image, draw it on the canvas
  if (selectedImage) {
    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      const designPatternWidth = canvas.width;
      const designPatternHeight = canvas.height;
      const designPatternX = 0;
      const designPatternY = 0;

      const maskStrokeWidth = 150;
      const imageX = designPatternX + 57;
      const imageY = designPatternY + 443;
      const imageWidth = designPatternWidth - 2 * maskStrokeWidth + 190;
      const imageHeight = designPatternHeight - 2 * maskStrokeWidth;

      // Draw the selected image on the canvas
      ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

      // Draw call to action text on the canvas
      drawCallToAction(
        ctx,
        callToAction,
        canvas.width,
        canvas.height,
        designPatternY +
          designPatternHeight +
          20 +
          canvaData?.caption?.line_height
      );

      // Draw caption text on the canvas
      drawText(ctx, canvaData?.caption, caption);
    };
  }
};

// Function to draw design elements on the canvas
const drawDesignElements = (ctx, canvasWidth, canvasHeight) => {
  const designPatternWidth = canvasWidth;
  const designPatternHeight = canvasHeight;
  const designPatternX = 0;
  const designPatternY = 0;

  // Draw design pattern on the canvas
  drawLayer(
    ctx,
    designPattern,
    designPatternX,
    designPatternY,
    designPatternWidth,
    designPatternHeight
  );

  // Draw mask image on the canvas
  drawLayer(
    ctx,
    mask,
    designPatternX,
    designPatternY,
    designPatternWidth * 5,
    designPatternHeight * 5
  );

  // Draw mask stroke on the canvas
  const maskStrokeWidth = 0;
  const maskStrokeX = designPatternX - maskStrokeWidth;
  const maskStrokeY = designPatternY - maskStrokeWidth;
  const maskStrokeWidthTotal = designPatternWidth + 2 * maskStrokeWidth;
  const maskStrokeHeightTotal = designPatternHeight + 2 * maskStrokeWidth;

  drawLayer(
    ctx,
    maskStroke,
    maskStrokeX,
    maskStrokeY,
    maskStrokeWidthTotal + 4,
    maskStrokeHeightTotal
  );
};

// Function to draw a layer on the canvas
const drawLayer = (ctx, imageSrc, x, y, width, height) => {
  if (imageSrc && imageSrc[0] === "#") {
    // If the image source is a color, fill the rectangle with that color
    ctx.fillStyle = imageSrc || "#0369A1";
    ctx.fillRect(x, y, width, height);
  } else {
    // If the image source is an image, draw the image on the canvas
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      ctx.drawImage(image, x, y, width, height);
    };
  }
};

// Function to draw text on the canvas
const drawText = (ctx, textConfig, caption) => {
  const arr = [];
  const apiLen = canvaData?.caption?.max_characters_per_line;
  let currentText = "";

  if (!caption && canvaData?.caption.text) {
    currentText = canvaData?.caption.text;
  } else {
    currentText = caption;
  }

  let answerText = "";
  for (const word of currentText.split(" ")) {
    if (answerText.length + word.length <= apiLen) {
      answerText += word + " ";
    } else {
      const trimText = answerText.trimEnd();
      arr.push(trimText);
      answerText = "";
      if (answerText.length + word.length <= apiLen) {
        answerText += word + " ";
      }
    }
  }
  const trimText = answerText.trimEnd();
  arr.push(trimText);

  ctx.font = `${textConfig.font_size}px Arial`;
  ctx.textAlign = textConfig.alignment;
  ctx.fillStyle = textConfig.text_color || "red";

  let count = 30;
  const lineHeight = 20;

  arr.forEach((word, index) => {
    const yPos =
      canvaData?.caption?.position?.y + 60 + index * (lineHeight + count);
    ctx.fillText(word, canvaData?.caption?.position?.x + 50, yPos);
  });
};

// Function to draw call to action text on the canvas
const drawCallToAction = (ctx, callToAction) => {
  const fontSize = 30;
  const padding = 24;

  const text = callToAction || canvaData?.cta?.text;
  const wrapText = text.slice(0, 20);

  ctx.font = `${fontSize}px Arial`;
  const textWidth = ctx.measureText(wrapText).width;

  const rectX = canvaData?.cta?.position?.x - 90;
  const rectY = canvaData?.cta?.position?.y - 110;
  const rectWidth = textWidth + padding;
  const rectHeight = fontSize + padding;

  ctx.fillStyle = canvaData?.cta?.background_color;

  // Function to draw a rounded rectangle
  const roundRect = (ctx, x, y, width, height, borderRadius) => {
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + height, borderRadius);
    ctx.arcTo(x + width, y + height, x, y + height, borderRadius);
    ctx.arcTo(x, y + height, x, y, borderRadius);
    ctx.arcTo(x, y, x + width, y, borderRadius);
    ctx.closePath();
    ctx.fill();
  };

  // Draw the rounded rectangle for call to action
  roundRect(ctx, rectX, rectY, rectWidth, rectHeight, 10);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = canvaData?.cta?.text_color;
  ctx.fillText(wrapText, rectX + rectWidth / 2, rectY + rectHeight / 2);
};

export { drawCanvas };
