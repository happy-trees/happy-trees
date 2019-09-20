export default function sketch(p){
  let props = {};
  let canvas;

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    props = newProps;

    if(canvas && props.strokes)
      p.resizeCanvas(newProps.canvasWidth, newProps.canvasHeight);
  };

  p.setup = () => {
    if(props.canvasHeight && props.canvasWidth) {
      canvas = p.createCanvas(props.canvasWidth, props.canvasHeight);
    } else {
      setTimeout(() => {
        p.setup();
      }, 100);
    }
  };

  p.mouseDragged = () => {
    if(props.isDrawing && !props.isIntermission && props.emitStroke) {
      const data = {
        x: p.mouseX / props.canvasWidth,
        y: p.mouseY / props.canvasHeight,
        px: p.pmouseX / props.canvasWidth,
        py: p.pmouseY / props.canvasHeight,
        color: props.color,
        strokeWidth: 5
      };
      props.emitStroke(data);
    }
  };

  p.draw = () => {
    if(props.strokes) {
      props.strokes.forEach(stroke => {
        p.stroke(stroke.color);
        p.strokeWeight(stroke.strokeWidth);
        p.line(stroke.x * props.canvasWidth, stroke.y * props.canvasHeight,
          stroke.px * props.canvasWidth, stroke.py * props.canvasHeight);
      });
    }
  };
}
