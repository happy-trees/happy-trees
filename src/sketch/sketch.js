export default function sketch(p){
  let canvas;
  let props = {};

  p.setup = () => {
    if(props.canvasHeight && props.canvasWidth) {
      canvas = p.createCanvas(props.canvasWidth, props.canvasHeight);
    } else {
      canvas = p.createCanvas(300, 400);
    }
    p.strokeWeight(2);
  };

  p.mouseDragged = () => {
    p.stroke(0, 0, 0);
    p.strokeWeight(5);
    p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    props = newProps;
    if(canvas && newProps.canvasWidth && newProps.canvasHeight)
      p.resizeCanvas(newProps.canvasWidth, newProps.canvasHeight);
  };
}
