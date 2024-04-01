class Shape{
  
  constructor(name,lst){
    this.name =  name;
    this.bounding_box = name + "_box";
    this.collsion_polygon = name + "_polygon";
    this.list = lst;
    this.renderer = name + "_renderer";
    this.bounds = null;
  }
  
}


/*
-----------------------------
Example Start
-----------------------------

class Rect extends Shape{
  
  constructor(lst){
    super("rect",lst);
    this.rect_box();
  }
  
  rect_box(){
    this.bounds = [...this.list];
  }
  
  rect_polygon(){
    return [...this.bounds];
  }
  
  rect_renderer(graphics){
    graphics.rect(...this.list);
  }
  
  
}

-----------------------------
End
-----------------------------
*/

const renderer = function(graphics ,shape,x,y,w,h){
  // graphics.background(0,0,0,0);
  let [x1,y1,w1,h1] = [...shape.bounds];
  let [w2,h2] = [width,height];
  let is_visible = false;
  if(collidePointRect(x1,y1,0,0,w2,h2)) is_visible = true;
  if(collidePointRect(x1,y1+h1,0,0,w2,h2)) is_visible = true;
  if(collidePointRect(x1+w1,y1,0,0,w2,h2)) is_visible = true;
  if(collidePointRect(x1+w1,y1+h1,0,0,w2,h2)) is_visible = true;
  if(!is_visible) return;
  shape[shape.renderer](graphics,shape);
  if(w == null || h == null){
    if(x == null || y == null){
      image(graphics,0,0);
    }else{
      image(graphics,x,y);
    }
  }else{
    image(graphics,x,y,w,h);
  }
}
