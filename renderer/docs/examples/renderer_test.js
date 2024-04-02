let pg, r;

function setup(){
    createCanvas(400,400);

    pg = createGraphics(200,200);
    r = new Rect([0,0,100,100]);
}

function draw(){
    background(0);
    renderer(pg,r,100,100,100,100);
}