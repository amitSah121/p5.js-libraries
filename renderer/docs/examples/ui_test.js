
let a = {};



function setup(){
  createCanvas(400,400);

  a.a = new ContainerUi("hortz",null,"parent",[200,200])
  a.a.set_window_pos(100,100);
  a.a.set_fill_color(color(125));

  a.a1 = new GridUi(a.a,"Grid",4);

  // row 0
  a.a1.set_row_constant(0,false);
  a.a111 = new ExpandedUi(a.a1.get_row(0),"S1");
  a.a112 = new BoxUi(a.a1.get_row(0),"a11",120,30);
  a.a112.set_text("Paragraph");
  a.a112.body.set_text_params([null,BOTTOM],24,null,-1);
  a.a113 = new ExpandedUi(a.a1.get_row(0),"S2");

  // row 1

  a.a1.set_row_constant(1,false);
  a.a111 = new ExpandedUi(a.a1.get_row(1),"S1");
  a.a112 = new BoxUi(a.a1.get_row(1),"a11",150,20);
  a.a112.set_text("One Way Paragraph.");
  a.a113 = new ExpandedUi(a.a1.get_row(1),"S2");


  // row 2

  a.a1.set_row_constant(2,false);
  a.a111 = new ExpandedUi(a.a1.get_row(2),"S1");
  a.a112 = new BoxUi(a.a1.get_row(2),"a11",150,70);
  a.a112.set_text("Even can use for loops to fill in the paragraphs as in previous Presentation example.");
  a.a113 = new ExpandedUi(a.a1.get_row(2),"S2");

  // row 3
  a.a1.make_row_expanded(3);
  a.a1.get_row(3).set_fill_color(color(255))

  a.a.compute_box()

  console.log(a);

}

function draw(){
  background(0);
  a.a.draw();

}


