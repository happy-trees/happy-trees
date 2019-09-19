export default function sketch(p){
  let canvas;
  let props = {};

  p.setup = () => {
    if(props.canvasHeight && props.canvasWidth) {
      canvas = p.createCanvas(props.canvasWidth, props.canvasHeight);
    } else {
      console.log('SOME STRANGE STUFF IS HAPPENING');
      setTimeout(() => {
        p.setup();
      }, 100);
    }
    
    p.strokeWeight(2);
  };

  p.mouseDragged = () => {
    if(props.isDrawing && !props.isIntermission) {
      p.stroke(0, 0, 0);
      p.strokeWeight(5);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
  
      if(props.emitStroke) {
        const data = {
          x: p.mouseX / props.canvasWidth,
          y: p.mouseY / props.canvasHeight,
          px: p.pmouseX / props.canvasWidth,
          py: p.pmouseY / props.canvasHeight,
          color: '#000000',
          strokeWidth: 5
        };
        props.emitStroke(data);
      }
    }
  };

  p.draw = () => {
    if(props.strokes && !props.isIntermission) {
      props.strokes.forEach(stroke => {
        p.stroke(stroke.color);
        p.strokeWeight(stroke.strokeWidth);
        p.line(stroke.x * props.canvasWidth, stroke.y * props.canvasHeight,
          stroke.px * props.canvasWidth, stroke.py * props.canvasHeight);
      });
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    props = newProps;

    if(canvas && newProps.canvasWidth && newProps.canvasHeight)
      p.resizeCanvas(newProps.canvasWidth, newProps.canvasHeight);
  };
}
