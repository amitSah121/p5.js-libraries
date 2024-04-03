

let pg,pg_x=100,pg_y=100;
let r1;

function setup() {
  createCanvas(400, 400);
  pg = createGraphics(400,400);
  r1 = new Rect([0,0,20,20]);

}

function draw() {
  background(220);
  pg.clear()
  if(r1.collidePoint(mouseX-pg_x,mouseY-pg_y)){
    print("Collided")
  }
  r1.set_anchor(null,150);
//   r1.set_rounds(20,10,4);
  r1.del_angle(0.5);
  r1.set_pos(100,100);
  renderer(pg,r1,pg_x,pg_y);
  circle(pg_x+r1.anchor[0],+pg_y+r1.anchor[1],10);
  circle(r1.list[0]+pg_x,r1.list[1]+pg_y,10);
  circle(pg_x,pg_y,10);
}
