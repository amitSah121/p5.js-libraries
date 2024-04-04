
let a = {};



function setup(){
  createCanvas(400,400);

  a.a = new ContainerUi("hortz",null,"parent",[200,200])
  a.a.set_window_pos(100,100);
  a.a.set_fill_color(color(125));

  a.a1 = new ContainerUi("hortz",a.a,"a1");

  a.a11 = new BoxUi(a.a1,"a11");
  a.a11.set_text("A1");

  a.a12 = new SliderUi(a.a1,"a12")
  a.a12.slider.set_text("A12")


  a.a13 = new BoxUi(a.a1,"a13",40,60);
  a.a13.set_text("A3");

//   a.a1 = new GridUi(a.a,"grid",4);
//   a.a1.set_row_constant(0,false);

//   // in row 0
//   a.a11 = new BoxUi(a.a1.get_row(0),"Box");
// //   a.a11.set_fg_color(color(125,125,0));
//   a.a11.set_text("a11");
//   a.a12 = new ExpandedUi(a.a1.get_row(0),"spacer");
// //   a.a12.set_text("a11");
//   a.a13 = new BoxUi(a.a1.get_row(0),"Box");
//   a.a13.set_text("a13");
// //   a.a13.set_fg_color(color(125,125,0));
//   a.a14 = new BoxUi(a.a1.get_row(0),"Box");
// //   a.a14.set_fg_color(color(125,125,0));
//   a.a14.set_text("a14");

//   // for row 1
//   a.a1.make_row_expanded(1);


//   // for row 2
//   a.a15 = new BoxUi(a.a1.get_row(2),"Box");
//   a.a15.set_text("a15");
//   a.a16 = new BoxUi(a.a1.get_row(2),"Box");
//   a.a16.set_text("a16");

  a.a.compute_box();

}

function draw(){
  background(0);
  a.a.draw();

}


