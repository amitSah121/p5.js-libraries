
let c;
let n;

function setup() {
  createCanvas(400, 400);
  c = new Clock();
  n = {p:0};
  c.set_timeout("name",(args)=>{
    console.log(args);
    args[1].p++;
  },1000,["Hello",n]);
}

function draw() {
  background(220);
  if(is_mouse_clicked){
    console.log("How")
    n.p = 0;
    c.reset_timeout_event("name",1000);
  }
}

