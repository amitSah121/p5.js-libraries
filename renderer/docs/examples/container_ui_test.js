
let a = {};

function setup() {
  createCanvas(400, 400);

  a.a = new ContainerUi("vert",null,null,[300,300]);
  a.a.set_fill_color(color(255));
  a.a.set_window_pos(50,50);

  let texts = ["Paragraph","This is a short example", "Here I would like to demo a short\n Presentation using this tool.\n It would be clear that this tool is \npreety powerful on its own."];
  let text_sizes = [20,16,12];
  let text_heights = [40,40,110]

  for(let i=0 ; i<texts.length ; i++){
    a[`a${i}`] = new ContainerUi("hortz",a.a,`a${i}`);
    a[`a${i}`].set_text(texts[i]);
    a[`a${i}`].set_text_params([null,BOTTOM],text_sizes[i],WORD,null,null);
    a[`a${i}`].set_size_const(false,true);
    a[`a${i}`].set_size(null,text_heights[i]);
  }

  a.a.compute_box();

//   assert(a)

}

function draw() {
  background(220);
  a.a.draw();

}
