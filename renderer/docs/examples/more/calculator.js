// Calculator interface
let a = {};

let output = "";

function setup(){
  createCanvas(400,400);

  a.a = new ContainerUi("hortz",null,"parent",[300,230])
  a.a.set_window_pos(50,50);
  a.a.set_fill_color(utility_colors.light_gray);

  a.a1 = new GridUi(a.a,"grid",6);

  // in row 0
  a.a1.set_row_constant(0,false);

  a.output = new ExpandedUi(a.a1.get_row(0),"output");
  a.output.element.set_size_const(false, true);
  a.output.element.set_size(30,50);
  a.output.element.set_text("Output");
  a.output.element.set_text_params([RIGHT,BOTTOM],20,WORD,);
  a.output.element.set_fill_color(utility_colors.dark_gray);
  a.output.element.set_text_color(color(255));

  // for row 1
  a.a1.set_row_constant(1,false);
  
  {
    let temp = new ExpandedUi(a.a1.get_row(1),"");
  }
  
  for(let i=1 ; i<=3 ; i++){
    let t = i + " ";
    let temp = new BoxUi(a.a1.get_row(1),t);
    temp.set_text(t);
    temp.body.set_focus_clicked_event(()=>{
      output += t;
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new BoxUi(a.a1.get_row(1),"+");
    temp.set_text("+");
    temp.body.set_focus_clicked_event(()=>{
      output += "+ ";
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new ExpandedUi(a.a1.get_row(1),"");
  }

  // for row 2
  a.a1.set_row_constant(2,false);
  
  {
    let temp = new ExpandedUi(a.a1.get_row(2),"");
  }
  
  for(let i=4 ; i<=6 ; i++){
    let t = i + " ";
    let temp = new BoxUi(a.a1.get_row(2),t);
    temp.set_text(t);
    temp.body.set_focus_clicked_event(()=>{
      output += t;
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new BoxUi(a.a1.get_row(2),"-");
    temp.set_text("-");
    temp.body.set_focus_clicked_event(()=>{
      output += "- ";
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new ExpandedUi(a.a1.get_row(2),"");
  }
  
  
// for row 3
  a.a1.set_row_constant(3,false);
  
  {
    let temp = new ExpandedUi(a.a1.get_row(3),"");
  }
  
  for(let i=7 ; i<=9 ; i++){
    let t = i + " ";
    let temp = new BoxUi(a.a1.get_row(3),t);
    temp.set_text(t);
    temp.body.set_focus_clicked_event(()=>{
      output += t;
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new BoxUi(a.a1.get_row(3),"X");
    temp.set_text("*");
    temp.body.set_focus_clicked_event(()=>{
      output += "* ";
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new ExpandedUi(a.a1.get_row(3),"");
  }  
  
// for row 4
  a.a1.set_row_constant(4,false);
  
  {
    let temp = new ExpandedUi(a.a1.get_row(4),"");
  }
  
  for(let i=0 ; i<3 ; i++){
    let t = ["0 ",". ","AC"][i];
    let temp = new BoxUi(a.a1.get_row(4),t);
    temp.set_text(t);
    if(t != "AC")
      temp.body.set_focus_clicked_event(()=>{
        output += t;
        a.output.element.set_text(output);
      });
    else 
      temp.body.set_focus_clicked_event(()=>{
        output = "";
        a.output.element.set_text(output);
      });
  }
  
  {
    let temp = new BoxUi(a.a1.get_row(4),"/");
    temp.set_text("/");
    temp.body.set_focus_clicked_event(()=>{
      output += "/ ";
      a.output.element.set_text(output);
    });
  }
  
  {
    let temp = new ExpandedUi(a.a1.get_row(4),"");
  }  

// for row 5
  a.a1.set_row_constant(5,false);
  a.enter = new ExpandedUi(a.a1.get_row(5),"enter");
  a.enter.element.set_size_const(false, true);
  a.enter.element.set_size(30,30);
  a.enter.element.set_text("Enter");
  a.enter.element.set_focus_clicked_event(()=>{
    try{
      output = eval(output.replace(/\s+/g, ''));
    }catch{}
    a.output.element.set_text(output);
  })
  
  
  a.a.compute_box();

}

function draw(){
 background(0);
 a.a.draw();

}