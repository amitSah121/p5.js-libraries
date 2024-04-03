[Previous](./event.md)
--------------------------------

## Rect class extends Shape class
These classes works as a state function , that means it preserves the original_list and then apply the rules(like angle, transformations ) to create or update new list.

### Functions and Variables

#### Variables

Note : Don't change these parameters directly , rather use proviided functions 

1) original_list
    - contains the originally provided co-ordinates
2) rounds
    - contains the top,right,bottom and left corner radius
3) anchor
    - contains from which point the rectangle to rotate, note top-left point of the rectangle/updated list is used
4) angle
    - the angle to be rotated about the anchor in degrees
5) fill_color
    - e.g. color(100)
6) stroke_color
    - e.g. color(200)
7) show_text
    - if true shows the text
8) text
    - contains the text to be shown
9) text_wrap
    - can be either CHAR or WORD
10) text_size
    - contains the size of text, by default 14
11) text_color
    - e.g. color(0)
12) text_align
    - horizontal align can be LEFT,CENTER,RIGHT
    - vertical align can be TOP,CENTER,BOTTOM
    - is in the form [horizontal,vertical], e.g. [CENTER,CENTER] by default
13) text_style
    - can use the styles NORMAL,ITALIC, BOLD, or BOLDITALIC
    - NORMAL by default
14) text_leading
    - line height, by default 17.5*(this.text_size/3)
15) image
    - contains p5.Image, loaded using loadImage()
16) show_image
    - if true shows image instead of rectangle

#### Functions

Note: # marked functions are for internal use only

Note: In almost all functions you can pass null parameter if you want to only favour one of many parameters

1) set_pos(x,y)
2) set_size(w,h)
3) set_anchor(ax,ay)
4) set_fill_color(f)
    - f is color(num,num,num,num), e.g. r1.set_fill_color(color(100))
5) set_stroke_color(f)
    - f is color(num,num,num,num), e.g. r1.set_stroke_color(color(100))
6) set_image(img)
    - note img is not image path
7) set_show_image(b)
    - b is boolean
8) set_text(text)
9) set_text_color(f)
    - f is color(num,num,num,num), e.g. r1.set_text_color(color(100))
10)set_show_text(b)
    - b is boolean
11)set_text_params(align,size,style,leading)
    - align is of form [horizontal,vertical], e.g. [CENTER,CENTER]
    - size is a number
    - style can be NORMAL,BOLD,ITALIC or BOLDITALIC
    - leading is line height
12) del_pos(dx,dy)
    - sets the small increment in position
13) del_size(dw,dh)
    - sets the small increment in size
14) del_anchor(dax,day)
    - sets the small increment in anchor
15) del_angle(da)
    - sets the small increment in angle in degrees
16) collidePoint(x,y)
    - returns true if point is inside rectangle
17) update()  -- #
    - used internally
18) update_list() -- #
    - used internally
19) rect_box() -- # 
    - used internally as shown in Shape js
20) rect_polygon() -- #
    - used internally as shown in Shape js
21) rect_renderer() -- #
    - used internally as shown in Shape js


```js


let pg,pg_x=100,pg_y=100;
let r1;

function setup() {
  createCanvas(400, 400);
  pg = createGraphics(400,400);
  r1 = new Rect([0,0,20,20]);

}

function draw() {
  background(220);
  pg.clear(); // clears p5.Graphics
  if(r1.collidePoint(mouseX-pg_x,mouseY-pg_y)){
    print("Collided")
  }
  r1.set_anchor(null,150);
//   r1.set_rounds(20,10,4);
  r1.del_angle(0.5); // increments angle by 0.5 degrees every frame
  r1.set_pos(100,100);
  renderer(pg,r1,pg_x,pg_y);
  circle(pg_x+r1.anchor[0],+pg_y+r1.anchor[1],10); // draws anchor point
  circle(r1.list[0]+pg_x,r1.list[1]+pg_y,10); // draws top-left of rectangle
  circle(pg_x,pg_y,10); // draws top-left of p5.Graphics
}


```


---------------------------------------
[Next](./container_ui.md)
-----------------------------