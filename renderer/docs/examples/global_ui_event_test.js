
let a = {};

function setup() {
  createCanvas(400, 400);

  a.a = new ContainerUi("hortz",null,"a",[300,300]);
  a.b = new ContainerUi("hortz",null,"b",[100,30]);
  a.b.set_fill_color(color(255));
  a.b.set_disable_event(true);
    a.a.set_window_pos(50,50);
  a.a1 = new ContainerUi("hortz",a.a,"a1");
  a.a1.set_fill_color(color(255,0,0));
  a.a1.set_hover_event(()=>{
    a.b.set_text("Its a.a1 here.");
    a.b.set_window_pos(clientX,clientY);
    a.b.draw();
    return true;
  })
  a.a2 = new ContainerUi("vert",a.a,"a2");
  a.a2.set_fill_color(color(255,0,255));
  a.a2.set_hover_event(()=>{
    a.b.set_text("Its a.a2 here.");
    a.b.set_window_pos(clientX,clientY);
    a.b.draw();
    return true;
  })
  a.a.compute_box();

}

function draw(){
    background(220);
    a.a.draw();
}
