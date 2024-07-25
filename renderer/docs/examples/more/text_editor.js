// text editor interface
let a = {};
let path = "./docs/media/images/ui_2.png";

function setup(){
  createCanvas(400,400);
  frameRate(120);


  // let p = loadImage(path);

  a.a = new ContainerUi("hortz",null,"parent",[300,300]);
  // a.a.state.fill_color = color(255);
  a.a.set_window_pos(50,50);
  a.a.state.fill_color = color(225);

  a.a1 = new GridUi(a.a,"grid",4);
  a.a1.set_row_constant(0,false);
  a.a1.set_row_constant(1,false);
  a.a1.set_row_constant(3,false);
  a.a1.make_row_expanded(2);

  a.Home = new BoxUi(a.a1.get_row(0),"Home");
  a.Home.set_text("Home");
  a.Home.body.set_focus_clicked_event(()=>{
    console.log("Gekki")
  });
  a.Setup = new BoxUi(a.a1.get_row(0),"Setup");
  a.Setup.set_text("Setup");
  a.Analysis = new BoxUi(a.a1.get_row(0),"Analysis",60);
  a.Analysis.set_text("Analysis");
  a.s1 = new ExpandedUi(a.a1.get_row(0),"s1");

  a.File = new BoxUi(a.a1.get_row(1),"File");
  a.File.set_text("File");
  a.New = new BoxUi(a.a1.get_row(1),"New");
  a.New.set_text("New");
  a.s2 = new ExpandedUi(a.a1.get_row(1),"s2");

  //  testing to see if removing works as expected
  // a.File.remove(); 
  // a.a1.add_child(1,a.File.bg,1);

  a.TextArea = new ExpandedUi(a.a1.get_row(2),"TextArea");
  a.TextArea.element.state.fill_color = color(225);
  a.TextArea.element.set_text_params([LEFT,TOP],null,WORD);
  a.TextArea.element.set_text("|");
  let b1 = false;
  key_released_events.push(()=>{
    if(!b1) return;
    let p1 = current_key_released;
    a.TextArea.element.set_text(utility_text(p1,a.TextArea.element.text));
  })
  a.TextArea.element.set_focus_event(()=>{
    b1  = true;
  })
  a.TextArea.element.set_focus_out_event(()=>{
    b1 = false;
  })


  a.Footer = new BoxUi(a.a1.get_row(3),"Footer",60);
  a.Footer.set_text("Footer");
  a.slider = new SliderUi(a.a1.get_row(3),"Slider","hortz",100,20);
  a.s3 = new ExpandedUi(a.a1.get_row(3),"s3");
  a.a.compute_box();
  a.slider.slider.set_size(a.slider.slider.w,a.slider.parent.h);
  a.a.compute_box();


  // assert(a);
}

function draw(){
  background(0);
  a.a.draw();

  // console.log(current_key_pressed,keyp,is_key_released);

}

