
class Rect extends Shape{
  
  constructor(lst){
    let [x,y,w,h] = lst;
    let original_list = lst;
    lst = [x,y,x+w,y,x+w,y+h,x,y+h];
    super("rect",lst);
    this.original_list = original_list;
    this.rounds = [0,0,0,0];
    this.anchor = [lst[0],lst[1]];
    this.angle = 0;
    this.fill_color = color(255);
    this.stroke_color = color(0);
    this.show_text = false;
    this.text = "";
    this.text_wrap = CHAR;
    this.text_size = 14;
    this.text_color = color(0);
    this.text_align = [CENTER,CENTER];
    this.text_style = NORMAL;
    this.text_leading = 17.5*(this.text_size/3); // default text leading
    this.image = null;
    this.show_image = false;
    this.update();
  }

/*
like 
set_pos(100,null) // sets only x
set_pos(null,100) // sets only y
set_pos(100,100) // sets both x and y
set_pos(null,null) // aborts
set_pos() // aborts
*/
  set_pos(x,y){
    this.original_list[0] = x != null ? x : this.original_list[0];
    this.original_list[1] = y != null ? y : this.original_list[1];
    this.update();
  }

  set_size(w,h){
    this.original_list[2] = w != null ? w : this.original_list[2];
    this.original_list[3] = h != null ? h : this.original_list[3];
    // assert(this.original_list[2],w) 
    this.update();
  }

  set_anchor(a1,a2){
    this.anchor[0] = a1 != null ? a1 : this.anchor[0];
    this.anchor[1] = a2 != null ? a2 : this.anchor[1];
    this.update();
  }

  set_angle(a){
    this.angle = a != null ? a : this.angle;
    this.update();
  }

  set_rounds(b1,b2,b3,b4){
    this.rounds[0] = b1 != null && b1 >= 0? b1 : this.rounds[0];
    this.rounds[1] = b2 != null && b2 >= 0? b2 : this.rounds[1];
    this.rounds[2] = b3 != null && b3 >= 0? b3 : this.rounds[2];
    this.rounds[3] = b4 != null && b4 >= 0? b4 : this.rounds[3];
  }

  set_fill_color(f){
    this.fill_color = f != null ? f : this.fill_color;
  }

  set_stroke_color(f){
    this.stroke_color = f != null ? f : this.stroke_color;
  }

  set_image(img){
    this.image = img != null ? img : this.image;
  }

  set_show_image(s){
    this.show_image = s != null ? s : this.show_image;
  }

  set_text(s){
    this.text = s != null ? s : this.text;
    // if(this.text_wrap == WORD){
    //   if(textWidth(this.text) > this.original_list[2]){
    //     this.show_text = false;
    //   }else{
    //     this.show_text = true;
    //   }
    // }
  }

  set_text_color(c){
    this.text_color = c != null ? c : this.text_color;
  }

  set_show_text(f){
    this.show_text = f != null ? f : this.show_text;
  }

  set_text_params(align,size,style,leading){
    this.text_align[0] = align[0] != null ? align[0] : this.text_align[0];
    this.text_align[1] = align[1] != null ? align[1] : this.text_align[1];
    this.text_size = size != null ? size : this.size;
    this.text_style = style != null ? style : this.style;
    this.text_leading = leading != null ? leading : this.text_leading;
  }

  del_pos(x,y){
    this.original_list[0] += x != null ? x : 0;
    this.original_list[1] += y != null ? y : 0;
    this.update();
  }

  del_size(dw,dh){
    this.original_list[2] += dw != null ? dw : 0;
    this.original_list[3] += dh != null ? dh : 0;
    this.update();
  }

  del_anchor(dela1,dela2){
    this.anchor[0] += dela1 != null ? dela1 : 0;
    this.anchor[1] += dela2 != null ? del2 : 0;
    this.update();
  }

  del_angle(dela){
    this.angle += dela != null ? dela : 0;
    this.update();
  }

  collidePoint(x,y){
    const poly = [];
    for(let i=0 ; i<this.list.length/2 ; i++){
      poly.push(createVector(this.list[2*i],this.list[2*i+1]));
    }
    return collidePointPoly(x,y,poly);
  }

  update(){
    let [x,y,w,h] = this.original_list;
    this.list = [x,y,x+w,y,x+w,y+h,x,y+h];
    this.rect_box();
  }

  update_list(){
    let [x1,y1,x2,y2,x3,y3,x4,y4] = this.list;
    let [px,py] = this.anchor;
    let p1 = [[x1-px,y1-py],[x2-px,y2-py],[x3-px,y3-py],[x4-px,y4-py]];
    let ang = radians(this.angle);
    let pv = [];
    for(let i=0 ; i<p1.length ; i++){
      pv.push([px+(p1[i][0]*cos(ang)-p1[i][1]*sin(ang)),py+(p1[i][0]*sin(ang)+p1[i][1]*cos(ang))]);
    }
    pv = pv.flat(2);
    this.list = pv;
  }
  
  rect_box(){
    this.update_list();
    // assert(this.list)
    let pv = this.list;
    let [x_min,x_max,y_min,y_max] = [9999999999,-9999999999,9999999999,-9999999999];
    for(let i=0 ; i<pv.length/2 ; i++){
      x_max = max(x_max,pv[2*i])
      y_max = max(y_max,pv[2*i+1])
      x_min = min(x_min,pv[2*i])
      y_min = min(y_min,pv[2*i+1])
    }
    this.bounds = [x_min,y_min,x_max-x_min,y_max-y_min];
  }
  
  rect_polygon(){
    return [...this.list];
  }
  
  rect_renderer(graphics){
    let [x,y,w,h] = this.original_list;
    let [x1,y1] = this.anchor;
    graphics.push();
    graphics.translate(x1,y1);
    graphics.rotate(radians(this.angle));
    graphics.translate(-x1,-y1);
    if(!this.show_image){
      graphics.fill(this.fill_color);
      graphics.stroke(this.stroke_color);
      graphics.rect(x,y,w,h,...this.rounds);
    }else{
      graphics.image(this.image,x,y,w,h);
    }
    if(this.show_text) {
      graphics.fill(this.text_color);
      graphics.textSize(this.text_size);
      graphics.textAlign(...this.text_align);
      graphics.textWrap(this.text_wrap);
      graphics.textStyle(this.text_style);
      graphics.text(this.text,x,y,w,h);
    }
    // graphics.ellipse(x1,y1,10,10);
    graphics.pop()
  }
  
  
}