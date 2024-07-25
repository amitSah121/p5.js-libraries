// Presentation ui
let a = {};

let pages = [
  ["Presentation",30,"Introduction",30,".  This is the first presentation I am writing in this app. Its never been this easy before, wirting presentations and all.",80,"Footer",30],
  
  ["Presentation",30,"Preface",30,".  Let me tell You a secrete about this presentation.",40,"Footer",30],
  
  ["Presentation",30,"Chapter 1",30,".  This chapter presents the basic concept of how to get with the problem of doing comedy once and twice and thrice a week and the againg not doing it for quite a while.",120,"Footer",30]
];

let current_page = 0;

function set_presentation(h1,s1,h2,s2,h3,s3,h4,s4){
  // in row 0
  a.a1.set_row_constant(0,false);
  a.a1.get_row(0).set_size(null,s1);
  a.a1.get_row(0).set_text_params(null,20);
  a.a1.get_row(0).set_text(h1);
  
  // in row 1
  a.a1.set_row_constant(1,false);
  a.a1.get_row(1).set_size(null,s2);
  a.a1.get_row(1).set_text_params([LEFT,BOTTOM],16);
  a.a1.get_row(1).set_text(h2);
  
  
  // in row 2
  a.a1.set_row_constant(2,false);
  a.a1.get_row(2).set_size(null,s3);
  a.a1.get_row(2).set_text_params([LEFT,BOTTOM],14,WORD);
  a.a1.get_row(2).set_text(h3);
  
  // in row 3
  
  a.a1.set_row_constant(3,false);
  a.a1.get_row(3).set_size(null,s4);
  a.a1.get_row(3).set_text_params(null,14,WORD);
  a.a1.get_row(3).set_text(h4);
  
}

function setup(){
  createCanvas(400,400);

  a.a = new ContainerUi("hortz",null,"parent",[200,240])
  a.a.set_window_pos(100,100);
  a.a.set_fill_color(color(255));
  

  a.a1 = new GridUi(a.a,"grid",6);
  
  set_presentation(...pages[current_page]);
  
  // in row 4
  a.a1.make_row_expanded(4);
  
  // in row 5
  a.a1.set_row_constant(5,false);
  {
    let temp = new BoxUi(a.a1.get_row(5),"left",20,28);
    temp.set_margin(1,1,1,1);
    temp.set_text("<");
    temp.body.set_hover_event(()=>{
      temp.set_fg_color(utility_colors.light_gray);
    });
    temp.body.set_hover_out_event(()=>{
      temp.set_fg_color(color(255));
    });
    temp.body.set_focus_clicked_event(()=>{
      if(current_page > 0){
        current_page--;
        set_presentation(...pages[current_page]);
        a.a.compute_box();
      }
    });
  }
  
  {
    let temp = new ExpandedUi(a.a1.get_row(5),"");
  }
  
  {
    let temp = new BoxUi(a.a1.get_row(5),"right",20,28);
    temp.set_margin(1,1,1,1);
    temp.set_text(">");
    temp.body.set_hover_event(()=>{
      temp.set_fg_color(utility_colors.light_gray);
    });
    temp.body.set_hover_out_event(()=>{
      temp.set_fg_color(color(255));
    });
    temp.body.set_focus_clicked_event(()=>{
      if(current_page < pages.length - 1){
        current_page++;
        set_presentation(...pages[current_page]);
        a.a.compute_box();
      }
    });
  }

  a.a.compute_box();

  
  // console.log(a.a1.get_row(0))
}

function draw(){
 background(0);
 a.a.draw();

}