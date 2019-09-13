export default function sketch(p){
  let canvas;
  let props = {};

  p.setup = () => {
    const gameContainerElement = document.getElementById('game-container');
    const measurements = gameContainerElement.getBoundingClientRect();
    canvas = p.createCanvas(measurements.width - 5, measurements.height - 5);
    p.strokeWeight(2);
  };

  p.mouseDragged = () => {
    p.stroke(0, 0, 0);
    p.strokeWeight(5);
    p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

    if(props.emitStroke) {
      const data = {
        x: p.mouseX,
        y: p.mouseY,
        px: p.pmouseX,
        py: p.pmouseY,
        color: '#000000',
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
        p.line(stroke.x, stroke.y, stroke.px, stroke.py);
      });
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    props = newProps;

    if(canvas && newProps.canvasWidth && newProps.canvasHeight)
      p.resizeCanvas(newProps.canvasWidth, newProps.canvasHeight);
  };
}
