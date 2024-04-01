class BoxUi{
    constructor(parent,name,w,h){
  
      this.parent = parent;
      this.name = name;
  
      if(this.name == null){
        this.name = `${Math.random()}`;
      }
  
      this.bg_color = color(255);
      this.fg_color = color(255);
      let no_color = color(0,0);
  
      this.margin = {t:8,b:8,l:8,r:8};
      this.size = {w:w != null ? w : 40,h:h != null ? h : 20};
      this.bg_rounds = [0,0,0,0];
      this.fg_rounds = [0,0,0,0];
  
      this.bg = new ContainerUi("hortz",this.parent,this.name+"_bg");
      this.bg.state.fill_color = this.bg_color;
      this.bg.set_size_const(true,true);
      this.bg.state.stroke_color = no_color;
  
  
      this.margin_left = new ContainerUi("hortz",this.bg,this.name+"_margin_left");
      this.margin_left.set_size_const(true,true);
      this.margin_left.set_size(this.margin.l,this.size.h+this.margin.t+this.margin.b);
      this.margin_left.state.fill_color = no_color;
      this.margin_left.state.stroke_color = no_color;
  
      this.body_bg = new ContainerUi("vert",this.bg,this.name+"_body_bg");
      this.body_bg.set_size_const(true,true);
      this.body_bg.state.fill_color = no_color;
      this.body_bg.state.stroke_color = no_color;
  
      this.margin_top = new ContainerUi("hortz",this.body_bg,this.name+"_margin_top");
      this.margin_top.set_size_const(true,true);
      this.margin_top.set_size(this.size.w,this.margin.t);
      this.margin_top.state.fill_color = no_color;
      this.margin_top.state.stroke_color = no_color;
  
      this.body = new ContainerUi("hortz",this.body_bg,this.name+"_body");
      this.body.set_size_const(true,true);
      this.body.set_size(this.size.w,this.size.h);
      this.body.state.fill_color = this.fg_color;
      this.body.state.stroke_color = no_color;
  
      this.margin_bottom = new ContainerUi("hortz",this.body_bg,this.name+"_margin_bottom");
      this.margin_bottom.set_size_const(true,true);
      this.margin_bottom.set_size(this.size.w,this.margin.b);
      this.margin_bottom.state.fill_color = no_color;
      this.margin_bottom.state.stroke_color = no_color;
  
      this.margin_right = new ContainerUi("hortz",this.bg,this.name+"_margin_right");
      this.margin_right.set_size_const(true,true);
      this.margin_right.set_size(this.margin.r,this.size.h+this.margin.t+this.margin.b);
      this.margin_right.state.fill_color = color(0,0);
      this.margin_right.state.stroke_color = color(0,0);
  
    }
  
    update_size(){
      this.margin_left.set_size(this.margin.l,this.size.h+this.margin.t+this.margin.b);
      this.margin_top.set_size(this.size.w,this.margin.t);
      this.body.set_size(this.size.w,this.size.h);
      this.margin_bottom.set_size(this.size.w,this.margin.b);
      this.margin_right.set_size(this.margin.r,this.size.h+this.margin.t+this.margin.b);
    }
  
    set_margin(t,r,b,l){
      this.margin.t = t != null ? t : this.margin.t;
      this.margin.r = r != null ? r : this.margin.r;
      this.margin.b = b != null ? b : this.margin.b;
      this.margin.l = l != null ? l : this.margin.l;
      this.update_size();
    }
  
    set_size(w,h){
      this.size.w = w != null ? w : this.size.w;
      this.size.h = h != null ? h : this.size.h;
      this.update_size();
    }

    set_text(t){
        this.body.set_text(t);
        // this.body.show_text(true);
    }
  }



class GridUi{

    constructor(p,name,row,dir){
      this.parent = p;
      this.row = row;
      this.name = name;
      this.dir = dir != null ? dir : "vert";
      // this.count = 0;
  
      if(this.name == null){
        this.name = `${Math.random()}`;
      }
  
      this.element = new ContainerUi(this.dir,this.parent,this.name+"_parent");
  
      this.list = [];
      for(let i=0 ; i<this.row ; i++){
        let p1 = new ContainerUi(this.dir == "hortz" ? "vert" : "hortz", this.element,this.name+"_row");
        p1.set_size_const(true,true);
        this.list.push(p1);
      }
    }
  
    get_row(i){
      if( i >= this.row) return;
      return this.list[i];
    }
  
    set_row_constant(i,w_const,h_const){
      let p = this.get_row(i);
      if(p == null) return;
      p.set_size_const(w_const,h_const);
    }
  
    add_row(i){
      if(i > this.row) return;
      let p1 = new ContainerUi(this.dir == "hortz" ? "vert" : "hortz", this.element,this.name+"_row");
      p1.set_size_const(true,true);
      this.list.splice(i, 0, p1);
    }
  
    remove_row(i){
      if(i >= this.row) return;
      let p = this.get_row(i);
      p.remove();
      this.list.splice(i,1);
    }
  
    make_row_expanded(i){
      let p = this.get_row(i);
      if(p == null) return;
      p.set_size_const(false,false);
    }
  
  }


  class ExpandedUi{

    constructor(p,name,dir){
      this.name = name;
      this.dir = dir != null ? dir : "hortz";
    
      if(this.name == null){
        this.name = `${Math.random()}`;
      }
      this.parent = p;
      this.element = new ContainerUi(this.dir,this.parent,this.name);
      this.element.state.fill_color = color(255);
    }
  }
  

  class SliderUi{

    constructor(p,name,dir,size_w,size_h,amt){
      this.parent = p;
      this.name = name;
      this.amt = amt != null ? amt : 0;
      this.size_w = size_w != null ? size_w : 100;
      this.size_h = size_h != null ? size_h : 100;
  
      let temp = this;
      while(temp != null){
        if(temp.parent == null){
          this.window = temp;
        }
        temp = temp.parent;
      }
    
      if(this.name == null){
        this.name = `${Math.random()}`;
      }
  
      this.dir = dir != null ? (dir == "hortz" ? "vert" : "hortz") : "vert";
  
      this.slider = new ContainerUi(this.dir,this.parent,this.name);
      this.slider.set_size_const(true,true);
      this.slider.set_size(this.size_w,this.size_h);
      this.slider.state.fill_color = color(200);
      this.slider_per = new ContainerUi("hortz",this.slider,this.name+"_per");
      this.slider_per.set_size_per(this.amt,this.amt);
      this.slider_per.state.fill_color = color(120);
      // this.slider_per.state.stroke_color = color(0);
      this.slider.set_focus_pressed_event(()=>{
        let p1 = mouseX-this.window.px-this.slider.x;
        let p2 = mouseY-this.window.py-this.slider.y;
        this.amt = this.dir == "vert" ? (p1>0 ? p1 : 0)/this.slider.w : (p2>0 ? p2 : 0)/this.slider.h; 
        this.slider_per.set_size_per(this.amt,this.amt);
        this.window.compute_box();
      })
    }
  }
  