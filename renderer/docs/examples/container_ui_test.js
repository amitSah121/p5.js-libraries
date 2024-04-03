
let a = {};

function setup() {
  createCanvas(400, 400);

  a.a = new ContainerUi("hortz",null,null,[300,300]);
  a.a1 = new ContainerUi("hortz",a.a,"a1");
  // a.a1.set_weight(0);
  a.a1.set_size_const(true,true);
  a.a1.set_size(80,30);
  a.a1.state.fill_color = color(255,0,0);
  a.a2 = new ContainerUi("vert",a.a,"a2");
  a.a2.state.fill_color = color(255,255,0);
  a.a3 = new ContainerUi("hortz",a.a,"a3");
  a.a3.state.fill_color = color(255,0,255);

  a.a21 = new ContainerUi("hortz",a.a2,"a21");
  a.a21.set_size_weight(20,10);
  a.a21.set_size_const(true,false);
  // a.a21.set_size(90,80);
  a.a22 = new ContainerUi("hortz",a.a2,"a22");
  a.a23 = new ContainerUi("hortz",a.a2,"a23");

  a.a.compute_box();

  console.log(a)

}

function draw() {
  background(220);
  a.a.draw();

  if(is_mouse_pressed){
    a.a.set_window_pos(mouseX,mouseY);
    a.a.set_size(200,200);
    // // a.a1.set_weight(0);
    // a.a1.set_size_const(false,false);
    // // a.a1.set_size(10,100);
    // a.a1.set_weight(4);
    // a.a21.set_size(10,150);
    a.a.compute_box();
    // assert(a)
  }
}