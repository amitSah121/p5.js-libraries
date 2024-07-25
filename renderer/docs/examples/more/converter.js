// Converter interface

let a = {};
let units = ["sec","min","hrs"];

function convert(num_str,t1,t2){
  let temp = parseFloat(num_str);
  if(t1 == "sec" && t2 == "min"){
    temp = temp / 60;
    return temp + "";
  }else if(t1 == "sec" && t2 == "hrs"){
    temp = temp / 3600;
    return temp + "";
  }else if(t1 == "min" && t2 == "sec"){
    temp = temp * 60;
    return temp + "";
  }else if(t1 == "min" && t2 == "hrs"){
    temp = temp / 60;
    return temp + "";
  }else if(t1 == "hrs" && t2 == "sec"){
    temp = temp * 3600;
    return temp + "";
  }else if(t1 == "hrs" && t2 == "min"){
    temp = temp * 60;
    return temp + "";
  }else return num_str;
}

function setup(){
  createCanvas(400,400);

  a.a = new ContainerUi("hortz",null,"parent",[200,60])
  a.a.set_window_pos(150,50);
  a.a.set_fill_color(utility_colors.orange);

  a.a1 = new GridUi(a.a,"grid",3);

  // in row 0
  a.a1.set_row_constant(0,false);
  
  a.box_1 = new ExpandedUi(a.a1.get_row(0),"box_1");
  a.box_1.element.set_size_const(false, true);
  a.box_1.element.set_size(30,30);
  a.box_1.element.set_text_color(color(0));
  a.box_1.element.set_text_params([LEFT,TOP],20,WORD);
  a.box_1.element.set_text("");
  let b1 = false;
  key_released_events.push(()=>{
    if(!b1) return;
    let p1 = current_key_released;
    if(p1 >= '0' && p1 <= '9' || p1 == '.'){
      a.box_1.element.set_text(a.box_1.element.text+p1);
    }else if(p1 == "BACKSPACE"){
      a.box_1.element.set_text(a.box_1.element.text.slice(0,-1));
    }else if(p1 == "ENTER"){
      a.box_2.element.set_text(convert(a.box_1.element.text,a.t1.body.text,a.t2.body.text));
    }
  })
  a.box_1.element.set_focus_event(()=>{
    b1  = true;
    a.box_1.element.set_fill_color(utility_colors.light_gray);
  })
  a.box_1.element.set_focus_out_event(()=>{
    b1 = false;
    a.box_1.element.set_fill_color(color(255));
  })


  a.t1 = new BoxUi(a.a1.get_row(0),"first",50,28);
  a.t1.set_text("sec");
  a.t1.set_margin(1,1,1,1);
  a.t1.set_bg_color(utility_colors.blue);
  
  {
    let temp = new BoxUi(a.a1.get_row(0),"",20,28);
    temp.set_margin(1,1,1,1);
    temp.set_text(">");
    temp.body.set_focus_clicked_event(()=>{
      for(let i=0 ; i<units.length ; i++){
        if(a.t1.body.text == units[i]){
          a.t1.set_text(units[(i+1)%3]);
          break;
        }
      }
    });
  }

  
  
// for row 2
  
  a.a1.set_row_constant(2,false);
  
  a.box_2 = new ExpandedUi(a.a1.get_row(2),"box_1");
  a.box_2.element.set_size_const(false, true);
  a.box_2.element.set_size(30,30);
  a.box_2.element.set_text_color(color(0));
  a.box_2.element.set_text_params([LEFT,TOP],20,WORD);
  a.box_2.element.set_text("");
  let b2 = false;
  key_released_events.push(()=>{
    if(!b2) return;
    let p1 = current_key_released;
    if(p1 >= '0' && p1 <= '9' || p1 == '.'){
      a.box_2.element.set_text(a.box_2.element.text+p1);
    }else if(p1 == "BACKSPACE"){
      a.box_2.element.set_text(a.box_2.element.text.slice(0,-1));
    }else if(p1 == "ENTER"){
      a.box_1.element.set_text(convert(a.box_2.element.text,a.t2.body.text,a.t1.body.text));
    }
  })
  a.box_2.element.set_focus_event(()=>{
    b2  = true;
    a.box_2.element.set_fill_color(utility_colors.light_gray);
  })
  a.box_2.element.set_focus_out_event(()=>{
    b2 = false;
    a.box_2.element.set_fill_color(color(255));
  })


  a.t2 = new BoxUi(a.a1.get_row(2),"first",50,28);
  a.t2.set_text("min");
  a.t2.set_margin(1,1,1,1);
  a.t2.set_bg_color(utility_colors.blue);
  
  {
    let temp = new BoxUi(a.a1.get_row(2),"",20,28);
    temp.set_margin(1,1,1,1);
    temp.set_text(">");
    temp.body.set_focus_clicked_event(()=>{
      for(let i=0 ; i<units.length ; i++){
        if(a.t2.body.text == units[i]){
          a.t2.set_text(units[(i+1)%3]);
          break;
        }
      }
    });
  }

  
  a.a.compute_box();

}

function draw(){
 background(0);
 a.a.draw();

}