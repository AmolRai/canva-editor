import React, { Component } from "react";
import { drawCanvas } from "../utils/canvasMethod";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.debounceTimeout = null;
    this.prevProps = { ...this.props };
  }

  componentDidMount() {
    const { selectedImage, caption, callToAction, backgroundColor } =
      this.props;
    drawCanvas(
      this.canvasRef.current,
      selectedImage,
      caption,
      callToAction,
      backgroundColor
    );
  }

  componentDidUpdate() {
    this.debounceDrawCanvas();
  }

  debounceDrawCanvas() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      const { selectedImage, caption, callToAction, backgroundColor } =
        this.props;
      drawCanvas(
        this.canvasRef.current,
        selectedImage,
        caption,
        callToAction,
        backgroundColor
      );
    }, 500);
  }

  render() {
    return (
      <div className="w-[500px] h-[500px] flex">
        <canvas ref={this.canvasRef} width="1080px" height="1080px"></canvas>
      </div>
    );
  }
}

export default Canvas;
