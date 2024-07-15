/*
Repo: https://github.com/bmoren/p5.collide2D/
Created by http://benmoren.com
Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
Version v0.7.3 | June 22, 2020
CC BY-NC-SA 4.0
*/


// console.log("### p5.collide v0.7.3 ###")

p5.prototype._collideDebug = false;

p5.prototype.collideDebug = function(debugMode){
    _collideDebug = debugMode;
}

/*~++~+~+~++~+~++~++~+~+~ 2D ~+~+~++~+~++~+~+~+~+~+~+~+~+~+~+*/

p5.prototype.collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
  //2d
  //add in a thing to detect rectMode CENTER
  if (x + w >= x2 &&    // r1 right edge past r2 left
      x <= x2 + w2 &&    // r1 left edge past r2 right
      y + h >= y2 &&    // r1 top edge past r2 bottom
      y <= y2 + h2) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
};

// p5.vector version of collideRectRect
p5.prototype.collideRectRectVector = function(p1, sz, p2, sz2){
  return p5.prototype.collideRectRect(p1.x, p1.y, sz.x, sz.y, p2.x, p2.y, sz2.x,sz2.y)
}


p5.prototype.collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx){         testX = rx       // left edge
  }else if (cx > rx+rw){ testX = rx+rw  }   // right edge

  if (cy < ry){         testY = ry       // top edge
  }else if (cy > ry+rh){ testY = ry+rh }   // bottom edge

  // // get distance from closest edges
  var distance = this.dist(cx,cy,testX,testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter/2) {
    return true;
  }
  return false;
};

// p5.vector version of collideRectCircle
p5.prototype.collideRectCircleVector = function(r, sz, c, diameter){
  return p5.prototype.collideRectCircle(r.x,r.y, sz.x,sz.y, c.x,c.y, diameter)
}

p5.prototype.collideCircleCircle = function (x, y,d, x2, y2, d2) {
//2d
  if( this.dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};


// p5.vector version of collideCircleCircle
p5.prototype.collideCircleCircleVector = function(p1,d, p2, d2){
  return p5.prototype.collideCircleCircle(p1.x,p1.y,  d, p2.x,p2.y, d2)
}


p5.prototype.collidePointCircle = function (x, y, cx, cy, d) {
//2d
if( this.dist(x,y,cx,cy) <= d/2 ){
  return true;
}
return false;
};

// p5.vector version of collidePointCircle
p5.prototype.collidePointCircleVector = function(p, c, d){
  return p5.prototype.collidePointCircle(p.x,p.y,c.x,c.y,  d)
}

p5.prototype.collidePointEllipse = function (x, y, cx, cy, dx, dy) {
  //2d
  var rx = dx/2, ry = dy/2;
  // Discarding the points outside the bounding box
  if (x > cx + rx || x < cx - rx ||y > cy + ry || y < cy - ry) {
		return false;
  }
  // Compare the point to its equivalent on the ellipse
  var xx = x - cx, yy = y - cy;
  var eyy = ry * this.sqrt(this.abs(rx * rx - xx * xx)) / rx;
  return yy <= eyy && yy >= -eyy;
};

// p5.vector version of collidePointEllipse
p5.prototype.collidePointEllipseVector = function(p, c, d){
  return p5.prototype.collidePointEllipse(p.x,p.y,c.x,c.y,d.x,d.y);
}

p5.prototype.collidePointRect = function (pointX, pointY, x, y, xW, yW) {
//2d
if (pointX >= x &&         // right of the left edge AND
    pointX <= x + xW &&    // left of the right edge AND
    pointY >= y &&         // below the top AND
    pointY <= y + yW) {    // above the bottom
        return true;
}
return false;
};

// p5.vector version of collidePointRect
p5.prototype.collidePointRectVector = function(point, p1, sz){
  return p5.prototype.collidePointRect(point.x, point.y, p1.x, p1.y, sz.x, sz.y);
}

p5.prototype.collidePointLine = function(px,py,x1,y1,x2,y2, buffer){
  // get distance from the point to the two ends of the line
var d1 = this.dist(px,py, x1,y1);
var d2 = this.dist(px,py, x2,y2);

// get the length of the line
var lineLen = this.dist(x1,y1, x2,y2);

// since floats are so minutely accurate, add a little buffer zone that will give collision
if (buffer === undefined){ buffer = 0.1; }   // higher # = less accurate

// if the two distances are equal to the line's length, the point is on the line!
// note we use the buffer here to give a range, rather than one #
if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
  return true;
}
return false;
}

// p5.vector version of collidePointLine
p5.prototype.collidePointLineVector = function(point,p1,p2, buffer){
  return p5.prototype.collidePointLine(point.x,point.y, p1.x,p1.y, p2.x,p2.y, buffer);
}

p5.prototype.collideLineCircle = function( x1,  y1,  x2,  y2,  cx,  cy,  diameter) {
  // is either end INSIDE the circle?
  // if so, return true immediately
  var inside1 = this.collidePointCircle(x1,y1, cx,cy,diameter);
  var inside2 = this.collidePointCircle(x2,y2, cx,cy,diameter);
  if (inside1 || inside2) return true;

  // get length of the line
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = this.sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / this.pow(len,2);

  // find the closest point on the line
  var closestX = x1 + (dot * (x2-x1));
  var closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  var onSegment = this.collidePointLine(closestX,closestY,x1,y1,x2,y2);
  if (!onSegment) return false;

  // draw a debug circle at the closest point on the line
  if(this._collideDebug){
    this.ellipse(closestX, closestY,10,10);
  }

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  var distance = this.sqrt( (distX*distX) + (distY*distY) );

  if (distance <= diameter/2) {
    return true;
  }
  return false;
}

// p5.vector version of collideLineCircle
p5.prototype.collideLineCircleVector = function( p1,  p2,  c,  diameter){
  return p5.prototype.collideLineCircle( p1.x,  p1.y,  p2.x,  p2.y,  c.x,  c.y,  diameter);
}
p5.prototype.collideLineLine = function(x1, y1, x2, y2, x3, y3, x4, y4,calcIntersection) {

  var intersection;

  // calculate the distance to intersection point
  var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    if(this._collideDebug || calcIntersection){
      // calc the point where the lines meet
      var intersectionX = x1 + (uA * (x2-x1));
      var intersectionY = y1 + (uA * (y2-y1));
    }

    if(this._collideDebug){
      this.ellipse(intersectionX,intersectionY,10,10);
    }

    if(calcIntersection){
      intersection = {
        "x":intersectionX,
        "y":intersectionY
      }
      return intersection;
    }else{
      return true;
    }
  }
  if(calcIntersection){
    intersection = {
      "x":false,
      "y":false
    }
    return intersection;
  }
  return false;
}


// p5.vector version of collideLineLine
p5.prototype.collideLineLineVector = function(p1, p2, p3, p4, calcIntersection){
  return p5.prototype.collideLineLine(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, calcIntersection);
}

p5.prototype.collideLineRect = function(x1, y1, x2, y2, rx, ry, rw, rh, calcIntersection) {

  // check if the line has hit any of the rectangle's sides. uses the collideLineLine function above
  var left, right, top, bottom, intersection;

  if(calcIntersection){
     left =   this.collideLineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh,true);
     right =  this.collideLineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh,true);
     top =    this.collideLineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry,true);
     bottom = this.collideLineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh,true);
     intersection = {
        "left" : left,
        "right" : right,
        "top" : top,
        "bottom" : bottom
    }
  }else{
    //return booleans
     left =   this.collideLineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
     right =  this.collideLineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
     top =    this.collideLineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
     bottom = this.collideLineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  }

  // if ANY of the above are true, the line has hit the rectangle
  if (left || right || top || bottom) {
    if(calcIntersection){
      return intersection;
    }
    return true;
  }
  return false;
}

// p5.vector version of collideLineRect
p5.prototype.collideLineRectVector = function(p1, p2, r, rsz, calcIntersection){
  return p5.prototype.collideLineRect(p1.x, p1.y, p2.x, p2.y, r.x, r.y, rsz.x, rsz.y, calcIntersection);
}

p5.prototype.collidePointPoly = function(px, py, vertices) {
  var collision = false;

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = vertices[current];    // c for "current"
    var vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable back and forth
    if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
         (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
            collision = !collision;
    }
  }
  return collision;
}

// p5.vector version of collidePointPoly
p5.prototype.collidePointPolyVector = function(p1, vertices){
  return p5.prototype.collidePointPoly(p1.x, p1.y, vertices);
}

// POLYGON/CIRCLE
p5.prototype.collideCirclePoly = function(cx, cy, diameter, vertices, interior) {

  if (interior === undefined){
    interior = false;
  }

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = vertices[current];    // c for "current"
    var vn = vertices[next];       // n for "next"

    // check for collision between the circle and a line formed between the two vertices
    var collision = this.collideLineCircle(vc.x,vc.y, vn.x,vn.y, cx,cy,diameter);
    if (collision) return true;
  }

  // test if the center of the circle is inside the polygon
  if(interior === true){
    var centerInside = this.collidePointPoly(cx,cy, vertices);
    if (centerInside) return true;
  }

  // otherwise, after all that, return false
  return false;
}

// p5.vector version of collideCirclePoly
p5.prototype.collideCirclePolyVector = function(c, diameter, vertices, interior){
  return p5.prototype.collideCirclePoly(c.x, c.y, diameter, vertices, interior);
}

p5.prototype.collideRectPoly = function( rx, ry, rw, rh, vertices, interior) {
  if (interior == undefined){
    interior = false;
  }

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = vertices[current];    // c for "current"
    var vn = vertices[next];       // n for "next"

    // check against all four sides of the rectangle
    var collision = this.collideLineRect(vc.x,vc.y,vn.x,vn.y, rx,ry,rw,rh);
    if (collision) return true;

    // optional: test if the rectangle is INSIDE the polygon note that this iterates all sides of the polygon again, so only use this if you need to
    if(interior === true){
      var inside = this.collidePointPoly(rx,ry, vertices);
      if (inside) return true;
    }
  }

  return false;
}

// p5.vector version of collideRectPoly
p5.prototype.collideRectPolyVector = function(r, rsz, vertices, interior){
  return p5.prototype.collideRectPoly(r.x, r.y, rsz.x, rsz.y, vertices, interior);
}

p5.prototype.collideLinePoly = function(x1, y1, x2, y2, vertices) {

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position extract X/Y coordinates from each
    var x3 = vertices[current].x;
    var y3 = vertices[current].y;
    var x4 = vertices[next].x;
    var y4 = vertices[next].y;

    // do a Line/Line comparison if true, return 'true' immediately and stop testing (faster)
    var hit = this.collideLineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true;
    }
  }
  // never got a hit
  return false;
}


// p5.vector version of collideLinePoly
p5.prototype.collideLinePolyVector = function(p1, p2, vertice){
  return p5.prototype.collideLinePoly(p1.x, p1.y, p2.x, p2.y, vertice);
}

p5.prototype.collidePolyPoly = function(p1, p2, interior) {
  if (interior === undefined){
    interior = false;
  }

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<p1.length; current++) {

    // get next vertex in list, if we've hit the end, wrap around to 0
    next = current+1;
    if (next === p1.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = p1[current];    // c for "current"
    var vn = p1[next];       // n for "next"

    //use these two points (a line) to compare to the other polygon's vertices using polyLine()
    var collision = this.collideLinePoly(vc.x,vc.y,vn.x,vn.y,p2);
    if (collision) return true;

    //check if the either polygon is INSIDE the other
    if(interior === true){
      collision = this.collidePointPoly(p2[0].x, p2[0].y, p1);
      if (collision) return true;
      collision = this.collidePointPoly(p1[0].x, p1[0].y, p2);
      if (collision) return true;
    }
  }

  return false;
}

p5.prototype.collidePolyPolyVector = function(p1, p2, interior) {
  return p5.prototype.collidePolyPoly(p1, p2, interior);
}

p5.prototype.collidePointTriangle = function(px, py, x1, y1, x2, y2, x3, y3) {

  // get the area of the triangle
  var areaOrig = this.abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );

  // get the area of 3 triangles made between the point and the corners of the triangle
  var area1 =    this.abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
  var area2 =    this.abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
  var area3 =    this.abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );

  // if the sum of the three areas equals the original, we're inside the triangle!
  if (area1 + area2 + area3 === areaOrig) {
    return true;
  }
  return false;
}

// p5.vector version of collidePointTriangle
p5.prototype.collidePointTriangleVector = function(p, p1, p2, p3){
  return p5.prototype.collidePointTriangle(p.x, p.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

p5.prototype.collidePointPoint = function (x,y,x2,y2, buffer) {
    if(buffer === undefined){
      buffer = 0;
    }

    if(this.dist(x,y,x2,y2) <= buffer){
      return true;
    }

  return false;
};

// p5.vector version of collidePointPoint
p5.prototype.collidePointPointVector = function(p1, p2, buffer){
  return p5.prototype.collidePointPoint(p1.x,p1.y,p2.x,p2.y, buffer);
}

p5.prototype.collidePointArc = function(px, py, ax, ay, arcRadius, arcHeading, arcAngle, buffer) {

  if (buffer === undefined) {
    buffer = 0;
  }
  // point
  var point = this.createVector(px, py);
  // arc center point
  var arcPos = this.createVector(ax, ay);
  // arc radius vector
  var radius = this.createVector(arcRadius, 0).rotate(arcHeading);

  var pointToArc = point.copy().sub(arcPos);

  if (point.dist(arcPos) <= (arcRadius + buffer)) {
    var dot = radius.dot(pointToArc);
    var angle = radius.angleBetween(pointToArc);
    if (dot > 0 && angle <= arcAngle / 2 && angle >= -arcAngle / 2) {
      return true;
    }
  }
  return false;
}

// p5.vector version of collidePointArc
p5.prototype.collidePointArcVector = function(p1, a, arcRadius, arcHeading, arcAngle, buffer){
  return p5.prototype.collidePointArc(p1.x, p1.y, a.x, a.y, arcRadius, arcHeading, arcAngle, buffer);
}


// ------------------------------------

// controls.js

/*
------------------------------------------------

1) key pressed, released states are defines
2) current key pressed and released characters are defined

------------------------------------
*/
/*
------------------------------------------------

1) key pressed, released states are defined
2) current key pressed and released characters are defined

------------------------------------
*/

let is_key_pressed = false,is_key_released = false, release_count = 0;
let keyp = [], current_key_pressed = "", current_key_released = "";
let key_pressed_events = [], key_released_events = [];


// checks for key pressed and key released events
const key_state = function(){
  if(keyIsPressed){
    is_key_pressed = true;
  }else{
    if(is_key_pressed){
      is_key_pressed = false;
    }
  }
  if(release_count > 0 ) release_count--;
  else is_key_released = false;
}


// registers the key_state function to be called before every draw() call
p5.prototype.registerMethod("pre",key_state);



// implementing p5js provided keyPressed and keyReleased function
function keyPressed(e){
  keyp.push(set_key(keyCode,key));
  current_key_pressed = set_key(keyCode,key);
  for(let i=0 ; i<key_pressed_events.length ; i++){
    key_pressed_events[i]();
  }
}

function keyReleased(e){
  release_count += 1;
  is_key_released = true;
  current_key_released = set_key(keyCode,key);
  keyp = keyp.filter(p => p.toUpperCase() != current_key_released.toUpperCase());
  
  for(let i=0 ; i<key_released_events.length ; i++){
    key_released_events[i]();
  }
}


// helper function that on the basis of keyCode and key generated a unique key string, 
const set_key = function(key_code,key_){
  temp_key_s = ["BACKSPACE","DELETE","ENTER","RETURN","TAB","ESCAPE","SHIFT","SHIFT","CONTROL","OPTION","ALT","UP_ARROW","LEFT_ARROW","RIGHT_ARROW","DOWN_ARROW"]
  temp_key = [BACKSPACE,DELETE,ENTER,RETURN,TAB,ESCAPE,SHIFT,SHIFT,CONTROL,OPTION,ALT,UP_ARROW,LEFT_ARROW,RIGHT_ARROW,DOWN_ARROW];
  for(let i=0 ; i<temp_key.length ; i++){
    if(key_code == temp_key[i]){
      return temp_key_s[i];
    }
  }
    if((key_code >= 65 && key_code <= 90) || (key_code >= 97 && key_code <= 124)){
    return key_ ;//.toUpperCase();
  }else if((key_.charCodeAt(0) >= 32 && key_.charCodeAt(0) <= 64) || (key_.charCodeAt(0) >= 91 && key_.charCodeAt(0) <= 96) || (key_.charCodeAt(0) >= 125 && key_.charCodeAt(0) <= 128)){
    return key_;
  } 
}

/*

Helper functions
-----------------

  if(is_key_pressed){
    if(keyp,key_combination(["SHIFT","CONTROL","a"])){
      // do something
    }
  }
  
  
  if(is_key_pressed){
    print(keyp,key_combination_strict(["SHIFT","CONTROL","a"]));
  }

*/

const key_combination = function(lst){
  if(!(lst.length > 0)) return;
  for(let i=0 ; i<lst.length ; i++){
    let b1 = typeof lst[i] == "string";
    if(!b1) return;
  }
  
  if(keyp.length >= lst.length){
    for(let i=lst.length-1 ; i>=0 ; i--){
      if(keyp.filter(p=>p.toUpperCase() == lst[i].toUpperCase()).length <= 0) return false;
    }
  }else return;
  
  return true;
}

const key_combination_strict = function(lst){
  if(!(lst.length > 0)) return;
  for(let i=0 ; i<lst.length ; i++){
    let b1 = typeof lst[i] == "string";
    if(!b1) return;
  }
  
  if(keyp.length >= lst.length){
    for(let i=lst.length-1 ; i>=0 ; i--){
      if(keyp[keyp.length - i - 1].toUpperCase() != lst[lst.length - i -1 ].toUpperCase()) return false;
    }
  }else return;
  
  return true;
}

/*
---------------------------------------
mouse functions

--------------------------------------
*/
let is_mouse_pressed = false, is_mouse_released = false, is_mouse_double_clicked = false, is_mouse_clicked = false, is_mouse_dragged = false;
let mouse_release_count = 0;
let mouse_dx = 0,mouse_dy = 0;
let mouseKey = "", totalTrackPadFinger = 0;
let screenX = -1, screenY = -1, clientX,clientY;
let mouse_button_types = ["LEFT","MIDDLE","RIGHT"];
let mouse_pressed_events = [], mouse_released_events = [], mouse_moved_events = [], mouse_clicked_events = [], mouse_dragges_events = [], mouse_double_clicked_events = [];

let check_mouse_status = function(){
  is_mouse_released = false;
  is_mouse_clicked = false;
  is_mouse_double_clicked = false;
  is_mouse_dragged = false;
  mouse_dx = 0;
  mouse_dy = 0;
}

p5.prototype.registerMethod("post",check_mouse_status);


function mousePressed(e){
  is_mouse_pressed = true;
  mouse_release_count++;
  mouseKey = mouse_button_types[e.which-1];
  totalTrackPadFinger = e.buttons;
  for(let i=0 ; i<mouse_pressed_events.length ; i++){
    mouse_pressed_events[i]();
  }
}

function mouseMoved(e){
  screenX = e.screenX;
  screenY = e.screenY;
  mouse_dx = e.clientX - clientX;
  mouse_dy = e.clientY - clientY;
  clientX = e.clientX;
  clientY = e.clientY;
  for(let i=0 ; i<mouse_moved_events.length ; i++){
    mouse_moved_events[i]();
  }
}

function mouseReleased(e){
  is_mouse_released = true;
  mouse_release_count--;
  if(mouse_release_count == 0) is_mouse_pressed = false;
  for(let i=0 ; i<mouse_released_events.length ; i++){
    mouse_released_events[i]();
  }
}

function mouseClicked(e){
  is_mouse_clicked = true;
  mouseKey = mouse_button_types[e.which-1];
  totalTrackPadFinger = e.buttons;
  for(let i=0 ; i<mouse_clicked_events.length ; i++){
    mouse_clicked_events[i]();
  }
}

function doubleClicked(e){
  is_mouse_double_clicked = true;
  mouseKey = mouse_button_types[e.which-1];
  totalTrackPadFinger = e.buttons;
  for(let i=0 ; i<mouse_double_clicked_events.length ; i++){
    mouse_double_clicked_events[i]();
  }
}

function mouseDragged(e){
  is_mouse_dragged = true;
  mouseKey = mouse_button_types[e.which-1];
  totalTrackPadFinger = e.buttons;
  for(let i=0 ; i<mouse_dragges_events.length ; i++){
    mouse_dragges_events[i]();
  }
}


/*

---------------------------
implementing touch functions

----------------------

*/

let is_touch_started = false, is_touch_ended = false;
let touch_ended_count = 0;

const check_touch = function(){
  is_touch_ended = false;
}

p5.prototype.registerMethod("post",check_touch);

function touchStarted(e){
  is_touch_started = true;
  touch_ended_count++;
}

function touchEnded(e){
  is_touch_ended = true;
  touch_ended_count--;
  if(touch_ended_count == 0){
    is_touch_started = false;
  }
}

function touchMoved(e){
  // print(e)
}
// -----------------

// renderer.js

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



// -------------------------------

// event.js



/*
--------------------------------------
implementing base class of event
---------------------------------
*/

class Event{
  
    constructor(){
      this.events = {}
      this.event_args = {}
    }
    
    // name is string
    // event is of the form function()=>{}
    set_event(name, event,args){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      this.events[name] = event;
      this.event_args[name] = args;
    }
    
    get_event(name){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      return this.events[name];
    }
    
    call_event(name){
      if(typeof name != "string") return;
      if(!this.events.hasOwnProperty(name)) return;
      
      this.events[name](this.event_args[name]);
    }
  
    set_args(name,args){
      if(typeof name != "string") return;
      if(!this.events.hasOwnProperty(name)) return;
  
      this.event_args[name] = args;
  
    }
    
    clear_event(name){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      delete this.events[name];
      delete this.event_args[name];
    }
    
}
  
  
  /*
  -------------------------------------------
  clock event
  --------------------------------------------
  */
  
class Clock extends Event{
    
    constructor(){
      super();
      this.event_handlers = {}
    }
  
    
    set_interval(name,event,interval,args){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      this.set_event(name,event);
      this.event_args[name] = args;
      let temp = setInterval(this.events[name],interval,args);
      this.event_handlers[name] = temp;
    }
    
    set_timeout(name,event,timeout,args){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      this.set_event(name,event);
      this.event_args[name] = args;
      let temp = setTimeout(this.events[name],timeout,args);
      this.event_handlers[name] = temp;
    }
    
    get_handler(name){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      return this.event_handlers[name];
    }
    
    stop_event(name){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      clearInterval(this.event_handlers[name]);
      delete this.event_handlers[name];
    }
    
    reset_interval_event(name,timeout_duration){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      if(!this.events.hasOwnProperty(name)) return;
      let temp = setInterval(this.events[name],timeout_duration,this.event_args[name]);
      this.event_handlers[name] = temp;
    }
  
    reset_timeout_event(name,timeout_duration){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      if(!this.events.hasOwnProperty(name)) return;
      let temp = setTimeout(this.events[name],timeout_duration,this.event_args[name]);
      this.event_handlers[name] = temp;
    }
    
    clear_clock_event(name){
      if(typeof name != "string"){
        assert("Provide a string key")
        return;
      }
      if(!this.events.hasOwnProperty(name)) return;
      delete this.events[name];
      delete this.event_args[name];
      clearInterval(this.event_handlers[name]);
      delete this.event_handlers[name];
    }
    
}
  

// ---------------------

// shape/rect.js

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

  set_text_params(align,size,wrap,style,leading){
    this.text_align[0] = align[0] != null ? align[0] : this.text_align[0];
    this.text_align[1] = align[1] != null ? align[1] : this.text_align[1];
    this.text_size = size != null ? size : this.size;
    this.text_style = style != null ? style : this.style;
    this.text_wrap = wrap != null ? wrap : this.text_wrap;
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
  // ---------------------------

  // ui/container_ui.js

  // const { assert } = require("console");

// const { assert } = require("console");
// const { assert } = require("console");

// const { assert } = require("console");

let global_parent_uis = [];
let ui_rect;

const ui_setup = function(){
    ui_rect = new Rect([0,0,0,0]);
}

p5.prototype.registerMethod("beforeSetup",ui_setup);


class ContainerUi{

    constructor(dir,parent,name,lst){ // dir can be either of [hortz,vert]
        this.state = {};
        this.state.dir = dir;
        this.state.name = name;
        this.parent = parent;
        this.child = [];
        this.rounds = [0,0,0,0];
        this.show_text = true;
        this.text = "";
        this.text_wrap = CHAR;
        this.text_size = 14;
        this.text_color = color(0);
        this.text_align = [CENTER,CENTER];
        this.text_style = NORMAL;
        this.text_leading = 17.5*(this.text_size/3); // default text leading
        this.image = null;
        this.show_image = false;
        this.disable_events = false;
        
        this.hover_event = null;
        this.focus_event = null;
        this.focus_pressed_event = null;
        if(parent == null){
            global_parent_uis.push(this);
            this.state.x = this.x =  0;
            this.state.y = this.y = 0;
            this.state.w = this.w = lst[0];
            this.state.h = this.h = lst[1];

            this.state.w_constant = true; // true means that width is constant
            this.state.h_constant = true; // true means that height is constant

            // w_per = width percentage, h_per = height percentahe
            this.state.w_per = this.w_per = null; // null means not applicable , since it is root parent
            this.state.h_per = this.h_per = null; // null means not applicable , since it is root parent

            this.state.w_weight = this.w_weight = null // null means not applicable , since it is root parent
            this.state.h_weight = this.h_weight = null // null means not applicable , since it is root parent

            this.state.fill_color = color(0,0)
            this.state.stroke_color = color(0,0)

            this.px = this.x;
            this.py = this.y;
            this.pw = this.w;
            this.ph = this.h;

            this.pg = createGraphics(this.state.w,this.state.h);
            this.disable_window_events = false;
        }else{
            this.parent.add_child(this);
            this.state.x = this.x =  0;
            this.state.y = this.y = 0;
            this.state.w = this.w = 0; // this are considered demands if w_constant = true
            this.state.h = this.h = 0; // this are considered demands if h_constant = true

            this.state.w_constant = false; // true means that width is constant
            this.state.h_constant = false; // true means that height is constant

            // note in case of children, if parent dir = hortz and h_constant = true, the h_per is only applicable
            // note in case of children, if parent dir = vert and w_constant = true, the w_per is only applicable
            // w_per = width percentage, h_per = height percentahe
            this.state.w_per = this.w_per = 1; 
            this.state.h_per = this.h_per = 1; 

            // note in case of children, if parent dir = hortz and w_constant = false, the x_weight is only applicable otherwise it will be calculated and refilled
            // note in case of children, if parent dir = vert and h_constant = false, the y_weight is only applicable otherwise it will be calculated and refilled
            this.state.w_weight = this.w_weight = 1; 
            this.state.h_weight = this.h_weight = 1; 

            this.state.fill_color = color(0,0);
            this.state.stroke_color = color(0,0);
        }
    
    }

    set_disable_event(b){
        this.disable_events = b != null ? b : this.disable_events;
    }

    set_disable_window_event(b){
        if(this.parent != null) return;
        this.disable_window_events = b != null ? b : this.disable_window_events;
    }

    set_hover_event(f){
        this.hover_event = f;
    }

    set_hover_out_event(f){
        this.hover_out_event = f;
    }


    set_focus_event(f){
        this.focus_event = f;
    }

    set_focus_out_event(f){
        this.focus_out_event = f;
    }

    set_focus_pressed_event(f){
        this.focus_pressed_event = f;
    }

    set_focus_clicked_event(f){
        this.focus_clicked_event = f;
    }


    set_window_pos(x,y){
        if(this.parent == null){
            this.px = x != null ? x : this.x;
            this.py = y != null ? y : this.y;
        }
    }

    set_pos(x,y){
        this.state.x = x != null ? x : this.state.x;
        this.state.y = y != null ? y : this.state.y;
        if(this.parent == null){
            this.x = this.state.x;
            this.y = this.state.y;
          }
      }

    set_rounds(b1,b2,b3,b4){
        this.rounds[0] = b1 != null && b1 >= 0? b1 : this.rounds[0];
        this.rounds[1] = b2 != null && b2 >= 0? b2 : this.rounds[1];
        this.rounds[2] = b3 != null && b3 >= 0? b3 : this.rounds[2];
        this.rounds[3] = b4 != null && b4 >= 0? b4 : this.rounds[3];
    }
    

    set_size_const(w_c,h_c){
        this.state.w_constant = w_c != null ? w_c : this.state.w_constant;
        this.state.h_constant = h_c != null ? h_c : this.state.h_constant;
    }

    set_size_per(w_per,h_per){
        this.state.w_per = w_per != null ? w_per : this.state.w_per;
        this.state.h_per = h_per != null ? h_per : this.state.h_per;
    }

    set_size_weight(w_weight,h_weight){
        this.state.w_weight = w_weight != null ? w_weight : this.state.w_weight;
        this.state.h_weight = h_weight != null ? h_weight : this.state.h_weight;
    }

    set_size(w,h,b){
        this.state.w = w != null ? w : this.state.w;
        this.state.h = h != null ? h : this.state.h;
        if(this.parent == null){
            this.w = this.state.w;
            this.h = this.state.h;
            if(b){
                this.pw = this.state.w;
                this.ph = this.state.h;
                this.pg = createGraphics(this.pw,this.ph);
            }
        }
        // this.compute_box();
    }

    set_window_size(w,h){
        this.pw = w != null ? w : this.pw;
        this.ph = h != null ? h : this.ph;
        this.pg = createGraphics(this.pw,this.ph);
    }

    set_text(s){
        this.text = s != null ? s : this.text;
        // if(this.text_wrap == WORD){
        //     if(textWidth(this.text) > this.original_list[2]){
        //     this.show_text = false;
        //     }else{
        //     this.show_text = true;
        //     }
        // }
    }

    set_direction(dir){
        this.state.dir = dir != null ? dir : this.state.dir;
    }


    set_image(img){
        this.image = img != null ? img : this.image;
    }

    set_show_image(s){
        this.show_image = s != null ? s : this.show_image;
    }

    set_fill_color(c){
        this.state.fill_color = c != null ? c : this.state.fill_color;
    }

    set_stroke_color(c){
        this.state.stroke_color = c != null ? c : this.state.stroke_color;
    }

    set_text_color(c){
        this.text_color = c != null ? c : this.text_color;
    }

    set_show_text(f){
        this.show_text = f != null ? f : this.show_text;
    }

    set_text_params(align,size,wrap,style,leading){
        if(align != null){
            this.text_align[0] = align[0] != null ? align[0] : this.text_align[0];
            this.text_align[1] = align[1] != null ? align[1] : this.text_align[1];
        }
        this.text_wrap = wrap != null ? wrap : this.text_wrap;
        this.text_size = size != null ? size : this.text_size;
        this.text_style = style != null ? style : this.text_style;
        if(leading == -1)
          this.text_leading = 17.5*(this.text_size/3);
        else
          this.text_leading = leading != null ? leading : this.text_leading;
    
    }

    add_child(p,i){
        if(p == null) return;
        if(i == null){
            this.child.push(p);
        }else{
            this.child.splice(i, 0, p);
        }
        p.parent = this;
    }

    change_parent(p){
        if(p != null && this.parent != null){
            let that = this;
            this.parent.child = this.parent.child.filter(x => x != that);
            this.parent = p;
            p.add_child(that);
        }
    }

    remove(){
        let that = this;
        this.parent.child = this.parent.child.filter(x => x != that);
        let p = this.parent;
        this.parent = 1; // to avoid clashing with other real parent elements
        return p;
    }

    collidePoint(x,y){
        return collidePointRect(x,y,this.x,this.y,this.w,this.h);
    }

    compute_horizontal_minimum(including_parent){
        let w = 0;
        let i = 0;
        let temp = this.child[i];
        while(temp != null){
            if(temp.state.w_constant == true){
                let w1 = temp.state.w;
                let w2 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                w += w1 > w2 ? w1 : w2;
            }else{
                let w2 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                w += w2;
            }
            i++;
            temp = this.child[i];
        }

        return including_parent == null ? w > (this.state.w_constant ? this.state.w : 0) ? w : (this.state.w_constant ? this.state.w : 0) : w;
    }

    compute_vertical_minimum(including_parent){
        let h = 0;
        let i = 0;
        let temp = this.child[i];
        while(temp != null){
            if(temp.state.h_constant == true){
                let h1 = temp.state.h;
                let h2 = temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                h += h1 > h2 ? h1 : h2;
                // assert("vmin",temp.state.name,temp.state.dir,h1,h2,h);
            }else{
                let h2 = temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                h += h2;
            }
            i++;
            temp = this.child[i];
        }

        return including_parent == null ? h > (this.state.h_constant ? this.state.h : 0) ? h : (this.state.h_constant ? this.state.h : 0) : h;
    }

    compute_vertical_maximum(including_parent){
        let h = 0;
        let i = 0;
        let temp = this.child[i];
        while(temp != null){
            if(temp.state.h_constant == true){
                let h1 = temp.state.h;
                let h2 = temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                let h3 = h1 > h2 ? h1 : h2;
                h = h > h3 ? h : h3;
                // assert("vmax",temp.state.name,temp.state.dir,h1,h2,h3,h);
            }else{
                let h2 = temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                h = h > h2 ? h : h2;
                // assert(temp.state.name,h2,h);
            }
            i++;
            temp = this.child[i];
        }
        // assert(h);


        return including_parent == null ? h > (this.state.h_constant ? this.state.h : 0) ? h : (this.state.h_constant ? this.state.h : 0) : h;
    }

    compute_horizontal_maximum(including_parent){
        let w = 0;
        let i = 0;
        let temp = this.child[i];
        while(temp != null){
            if(temp.state.w_constant == true){
                let w1 = temp.state.w;
                let w2 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                let w3 = w1 > w2 ? w1 : w2;
                w = w > w3 ? w : w3;
            }else{
                let w2 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                w = w > w2 ? w : w2;
            }
            i++;
            temp = this.child[i];
        }

        return including_parent == null ? w > (this.state.w_constant ? this.state.w : 0) ? w : (this.state.w_constant ? this.state.w : 0) : w;
    }


    compute_box(){
        if(this.child.length == 0) return;

        if(this.state.dir == "hortz"){
            let n1 = 0; // total weight 
            let w1 = this.w; // total width
            let w2 = 0;

            let i = 0;
            let temp = this.child[i];
            while(temp != null){
                if(temp.state.w_constant == false){
                    // assert(temp.state)
                    n1 += temp.state.w_weight;
                }else{
                    w2 += temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                }
                i++;
                temp = this.child[i];
            }

            // let w2 = this.compute_horizontal_minimum(1);
            let w3 = n1 > 0 ? (w1 - w2)/n1 : (w1 - w2);
            let n2 = 0;

            // assert(this.state.name,n1,w3,w2,w1);

            i = 0;
            temp = this.child[i];
            let w4 = 0;
            let var_child = [];
            while(temp != null){
                if(temp.state.w_constant == false){
                    let p1 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                    // assert(temp.state.name,p1,w3)
                    if(p1 < w3){
                        n2 += temp.state.w_weight;
                        var_child.push(temp);
                    }else{
                        temp.w = p1;
                        w4 += p1;
                    }
                }else{
                    let p1 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                    // assert(p1,temp.state.name);
                    w4 += p1;
                    temp.w = p1 > temp.state.w ? p1 : temp.state.w;
                }
                // assert(temp.state.name,temp.w);
                i++;
                temp = this.child[i];
            }

            let w5 = n2 > 0 ? (w1 - w4)/n2 : (w1 - w4);

            // assert(this.state.name,w5,n2,w1)

            for(let j=0 ; j<var_child.length ; j++){
                var_child[j].w = w5*var_child[j].state.w_weight;
            }

            for(let j=0 ; j<this.child.length ; j++){
                this.child[j].y = this.y;
                if(j == 0){
                    this.child[j].x = this.x;
                    continue;
                }
                this.child[j].x = this.child[j-1].x + this.child[j-1].w; 
            }



            // calculating the height according to percent or constant
            let h1 = this.compute_vertical_maximum();
            if(h1 > this.h){
                this.h = h1;
            }

            // assert(this.state.name,h1);

            i = 0;
            temp = this.child[i];
            while(temp != null){
                if(temp.state.h_constant == false){
                    temp.h = temp.state.h_per * this.h;
                }else{
                    let h2 = temp.state.dir == "hortz" ? temp.compute_vertical_maximum() : temp.compute_vertical_minimum();
                    temp.h = temp.state.h > h2 ? temp.state.h : h2; 
                    // assert(temp.state.name,temp.h);
                }
                // assert(temp.h,temp.state.h_constant,temp.state.name)
                i++;
                temp = this.child[i];
            }

            i = 0;
            temp = this.child[i];
            while(temp != null){
                temp.compute_box();
                i++;
                temp = this.child[i];
            }
        }

        // calculation if vert
        else if(this.state.dir == "vert"){
            let n1 = 0; // total weight 
            let h1 = this.h; // total width
            let h2 = 0;

            let i = 0;
            let temp = this.child[i];
            while(temp != null){
                if(temp.state.h_constant == false){
                    // assert(temp.state)
                    n1 += temp.state.h_weight;
                }else{
                    h2 += temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                }
                i++;
                temp = this.child[i];
            }

            // let h2 = this.compute_vertical_minimum(1);
            let h3 = n1 > 0 ? (h1 - h2)/n1 : (h1 - h2);
            let n2 = 0;

            // assert(n1);

            i = 0;
            temp = this.child[i];
            let h4 = 0;
            let var_child = [];
            while(temp != null){
                if(temp.state.h_constant == false){
                    let p1 = temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                    // assert(temp.state.name,p1,h3)
                    if(p1 < h3){
                        n2 += temp.state.h_weight;
                        var_child.push(temp);
                    }else{
                        temp.h = p1;
                        h4 += p1;
                    }
                }else{
                    let p1 = temp.state.dir == "vert" ? temp.compute_vertical_minimum() : temp.compute_vertical_maximum();
                    // assert(p1,temp.state.name,temp.state.h)
                    h4 += p1;
                    temp.h = p1 > temp.state.h ? p1 : temp.state.h;
                    // assert(p1,temp.state.name,temp.state.h,temp.h)
                }
                i++;
                temp = this.child[i];
            }

            let h5 = n2 > 0 ? (h1 - h4)/n2 : (h1 - h4);

            // assert(h5,n2,h1,h4)

            for(let j=0 ; j<var_child.length ; j++){
                var_child[j].h = h5*var_child[j].state.h_weight;
                // assert(var_child[j].h)
            }

            for(let j=0 ; j<this.child.length ; j++){
                this.child[j].x = this.x;
                if(j == 0){
                    this.child[j].y = this.y;
                    continue;
                }
                this.child[j].y = this.child[j-1].y + this.child[j-1].h; 
            }


            // calculating the width according to percent or constant
            let w1 = this.compute_horizontal_maximum();
            if(w1 > this.w){
                this.w = w1;
            }
            // assert(w1,this.w)

            i = 0;
            temp = this.child[i];
            while(temp != null){
                if(temp.state.w_constant == false){
                    temp.w = temp.state.w_per * this.w;
                    // assert(temp.state.name,temp.state.w_per,this.w,temp.w);
                }else{
                    let w2 = temp.state.dir == "hortz" ? temp.compute_horizontal_minimum() : temp.compute_horizontal_maximum();
                    temp.w = temp.state.w >  w2 ? temp.state.w : w2;
                    // assert(temp.state.name,temp.w);
                }
                // assert(temp.h,temp.state.h_constant,temp.state.name)
                i++;
                temp = this.child[i];
            }

            i = 0;
            temp = this.child[i];
            while(temp != null){
                temp.compute_box();
                i++;
                temp = this.child[i];
            }
        }
    }

    draw(){
        this.pg.clear();
        this.draw_(this.pg,this.px,this.py,this.pw,this.ph);
    }

    draw_(pg,x,y,w,h){
        // assert(this.state.name,this.x,this.y,this.w,this.h);
        // assert(x,y,w,h)
        ui_rect.set_pos(this.x,this.y);
        ui_rect.set_size(this.w,this.h);
        ui_rect.set_fill_color(this.state.fill_color);
        ui_rect.set_stroke_color(this.state.stroke_color);
        ui_rect.set_rounds(...this.rounds);
        ui_rect.set_text(this.text);
        ui_rect.set_show_text(this.show_text);
        ui_rect.set_text_color(this.text_color);
        ui_rect.set_text_params(this.text_align,this.text_size,this.text_wrap,this.text_style,this.text_leading);
        ui_rect.set_image(this.image);
        ui_rect.set_show_image(this.show_image);
        renderer(pg,ui_rect,x,y,w,h);
        let i = 0;
        let temp = this.child[i];
        while(temp != null){
            temp.draw_(pg,x,y,w,h);
            i++;
            temp = this.child[i];
        }
    }
}

// ------------------------

// ui/global_ui_event.js
let focused = [], focused_pressed = [], focus_clicked = [], hovered = [], previous_hover = [], mouse_pressed_during_focus_pressed = false;


const compute_hover = function(p,j,px,py){
    let i=0;
    let temp = p[i];
    while(temp != null){
        if(temp.disable_window_events == true){
            i++;
            temp = p[i];
            continue;
        }
      
        if(temp.collidePoint(mouseX-(px != null ? px : temp.px),mouseY-(py != null ? py :temp.py))){
            // console.log(temp.state.name)
            // assert(mouseX,mouseY,i,j);
            hovered[j != null ? j : i].push(temp);
            compute_hover(temp.child,j != null ? j : i,(px != null ? px : temp.px),(py != null ? py :temp.py));
        }
        i++;
        temp = p[i];
    }
}



const compute_focus = function(p,px,py){
    let i=0;
    let temp = p[i];
    while(temp != null){
        if(temp.disable_window_events == true){
            i++;
            temp = p[i];
            continue;
        }
        if(!is_mouse_pressed){
            mouse_pressed_during_focus_pressed = false;
        }
        if(mouse_pressed_during_focus_pressed){
            for(let i=0 ; i<focused.length ; i++){
                focused_pressed.push(focused[i]);
            }
          break;
        }
        else if(temp.collidePoint(mouseX-(px != null ? px : temp.px),mouseY-(py != null ? py :temp.py))){
            if(is_mouse_pressed){
                if(focused_pressed.length == 0){
                    compute_focus_out_event();
                    // focused.length = 0;
                }
                // console.log(temp.state.name,px,py)
                focused.push(temp);
                focused_pressed.push(temp);
                compute_focus(temp.child,(px != null ? px : temp.px),(py != null ? py :temp.py));
                mouse_pressed_during_focus_pressed = true;
                break;
            }
        }
        i++;
        temp = p[i];
    }
}

const compute_hover_event = function(){
    let i = 0;
    let temp = hovered[i];
    // assert(i,temp)
    let b = false;
    while(temp != null){
        let temp1 = temp.pop();
        while(temp1 != null){
            if(temp1.disable_events == true){
                temp1 = temp.pop();
                continue;
            }
            if(!b){
                if(typeof(temp1.hover_event) == "function"){
                    b = temp1.hover_event();
                }
            }
            temp1 = temp.pop();
        }
        b = false;
        i++;
        temp = hovered[i];
    }
    // assert(hovered.length,hovered[0].length,hovered[0]);
}


const compute_focus_event = function(){
    let i = focused.length - 1;
    let temp = focused[i];
    let b = false;
    while(temp != null){
        if(temp.disable_events == true){
            i--;
            temp = hovered[i];
            continue;
        }
        if(!b){
            if(typeof(temp.focus_event) == "function"){
                b = temp.focus_event();
            }
        }else{
            break;
        }
        i--;
        temp = focused[i];
    }
    // assert(focused.length);
}


const compute_hover_out_event = function(p){
    if(p == null || p.length == 0) return;
    let temp = p.pop();
    let b = false;
    while(temp != null){
        if(temp.disable_events == true){
            temp = p.pop();
            continue;
        }
        if(!b){
            if(typeof(temp.hover_out_event) == "function"){
                b = temp.hover_out_event();
            }
        }else{
            break;
        }
        temp = p.pop();
    }
    // assert(focused_pressed.length);
}

const compute_focus_pressed_event = function(){
    let temp = focused_pressed.pop();
    let b = false;
    while(temp != null){
        if(temp.disable_events == true){
            temp = focused_pressed.pop();
            continue;
        }
        if(!b){
            if(typeof(temp.focus_pressed_event) == "function"){
                b = temp.focus_pressed_event();
            }
        }else{
            break;
        }
        temp = focused_pressed.pop();
    }
    // assert(focused_pressed.length);
}

const compute_focus_out_event = function(){
    let temp = focused.pop();
    let b = false;
    while(temp != null){
        if(temp.disable_events == true){
            temp = focused.pop();
            continue;
        }
        if(!b){
            if(typeof(temp.focus_out_event) == "function"){
                b = temp.focus_out_event();
            }
        }else{
            break;
        }
        temp = focused.pop();
    }
    // assert(focused_pressed.length);
}

const compute_focus_clicked_event = function(){
    let temp = focus_clicked.pop();
    let b = false;
    while(temp != null){
        if(temp.disable_events == true){
            temp = focus_clicked.pop();
            continue;
        }
        if(!b){
            if(typeof(temp.focus_clicked_event) == "function"){
                b = temp.focus_clicked_event();
            }
        }else{
            break;
        }
        temp = focus_clicked.pop();
    }
    // assert(focused_pressed.length);
}



const ui_event_loop = function(){
    // focused = [];
    if(hovered.length != global_parent_uis.length){
        hovered = [];
        for(let j = 0; j<global_parent_uis.length ; j++){
            hovered.push([]);
        }
    }

    compute_hover(global_parent_uis);
    for(let i=0 ; i<previous_hover.length ; i++){
        if(previous_hover[i][previous_hover[i].length-1] != hovered[i][hovered[i].length-1]){
            compute_hover_out_event(previous_hover[i]);
        }
    }

    previous_hover.length = 0;

    if(previous_hover.length != global_parent_uis.length){
        previous_hover = [];
        for(let j = 0; j<global_parent_uis.length ; j++){
            previous_hover.push([]);
        }
    }

    for(let i=0 ; i<hovered.length ; i++){
        for(let j=0 ; j<hovered[i].length ; j++){
            previous_hover[i].push(hovered[i][j]);
        }
    }
    compute_focus(global_parent_uis);
    if(focused_pressed.length == 0 && focus_clicked.length != 0){
        compute_focus_clicked_event();
    }
    focus_clicked.length = 0;
    for(let i=0 ; i<focused_pressed.length ; i++){
        focus_clicked.push(focused_pressed[i]);
    }


    compute_hover_event();
    compute_focus_event();
    compute_focus_pressed_event();
    
}

p5.prototype.registerMethod("post",ui_event_loop);

// ------------------------------

// ui/ui.js
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

  change_parent(p,i){
    if(p != null && this.parent != null){
      this.bg.remove();
      p.add_child(this.bg,i);
    }
  }

  remove(){
    return this.bg.remove();
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

  set_bg_color(f){
    this.bg_color = f != null ? f : this.bg_color;
    this.bg.state.fill_color = this.bg_color;
  }

  set_fg_color(f){
    this.fg_color = f != null ? f : this.fg_color;
    this.body.state.fill_color = this.fg_color;
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

  change_parent(p,i){
    if(p != null && this.parent != null){
      this.element.remove();
      p.add_child(this.element,i);
    }
  }

  remove(){
    return this.element.remove();
  }

  get_row(i){
    if( i >= this.row) return;
    return this.list[i];
  }

  add_child(i,child,j){
    let p1 = this.get_row(i);
    if(p1 != null){
      p1.add_child(child,j);
    }
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

  change_parent(p,i){
    if(p != null && this.parent != null){
      this.element.remove();
      p.add_child(this.element,i);
    }
  }

  remove(){
    return this.element.remove();
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
    this.slider.set_focus_clicked_event(()=>{
      let p1 = mouseX-this.window.px-this.slider.x;
      let p2 = mouseY-this.window.py-this.slider.y;
      this.amt = this.dir == "vert" ? (p1>0 ? p1 : 0)/this.slider.w : (p2>0 ? p2 : 0)/this.slider.h; 
      this.slider_per.set_size_per(this.amt,this.amt);
      this.window.compute_box();
      return true;
    })
  }

  change_parent(p,i){
    if(p != null && this.parent != null){
      this.slider.remove();
      p.add_child(this.slider,i);
    }
  }

  remove(){
    return this.slider.remove();
  }

  set_dir(dir){
    this.dir = dir != null ? (dir == "hortz" ? "vert" : "hortz") : "vert";
    this.slider.set_direction(this.dir);
  }


  set_size(w,h){
    let p1 = mouseX-this.window.px-this.slider.x;
    let p2 = mouseY-this.window.py-this.slider.y;
    this.size_w = w != null ? w : this.size_w;
    this.size_h = h != null ? h : this.size_h;
    this.slider.set_size(this.size_w,this.size_h);
    this.amt = this.dir == "vert" ? (p1>0 ? p1 : 0)/this.slider.w : (p2>0 ? p2 : 0)/this.slider.h;  
    this.slider_per.set_size_per(this.amt,this.amt);
  }
}

// -----------------------------------

// utility.js



let utility_colors = {}

const set_utility_colors = function(){
    utility_colors.red = color(244,667,54);
    utility_colors.pink = color(233,30,99);
    utility_colors.purple = color(156,39,176);
    utility_colors.deep_purple = color(103,53,183);
    utility_colors.indogo = color(63,81,181);
    utility_colors.blue = color(33,150,243);
    utility_colors.light_blue = color(135,206,235);
    utility_colors.cyan = color(0,188,212);
    utility_colors.aqua = color(0,255,255);
    utility_colors.teal = color(0,150,136);
    utility_colors.green = color(76,175,80);
    utility_colors.light_green = color(139,195,74);
    utility_colors.lime = color(205,220,57);
    utility_colors.sand = color(253,245,230);
    utility_colors.khaki = color(240,230,140);
    utility_colors.yellow = color(255,235,59);
    utility_colors.amber = color(255,193,7);
    utility_colors.orange = color(255,152,0);
    utility_colors.deep_orange = color(255,87,34);
    utility_colors.blur_gray = color(96,125,139);
    utility_colors.brown = color(121,85,72);
    utility_colors.light_gray = color(241,241,241);
    utility_colors.gray = color(158,158,158);
    utility_colors.dark_gray = color(97,97,97);
    utility_colors.pale_ed = color(255,221,221);
    utility_colors.pale_yellow = color(255,255,204);
    utility_colors.pale_green = color(221,255,221);
    utility_colors.pale_green = color(221,255,255);
}

p5.prototype.registerMethod("beforeSetup",set_utility_colors);

const utility_text = function(k,text){
    // console.log(k)
    let p = text.indexOf("|");
    if(k == "ESCAPE" || k == "SHIFT" || k == "control" || k == "OPTION" || k == "ALT" || k == "UP_ARROW" || k == "DOWN_ARROW"){
    }
    else if(k == "BACKSPACE"){
        return text.substring(0,p-1)+text.substring(p,text.length);
    }else if(k == "DELETE"){
        return text.substring(0,p+1)+text.substring(p+2,text.length);
    }else if(k == "ENTER" || k == "RETURN"){
        return text.substring(0,p)+"\n"+text.substring(p,text.length);
    }else if(k == "TAB"){
        return text.substring(0,p)+"  "+text.substring(p,text.length);
    }else if(k == "LEFT_ARROW"){
        return text.substring(0,p-1)+"|"+text.substring(p-1,p)+text.substring(p+1,text.length);
    }else if(k == "RIGHT_ARROW"){
        return text.substring(0,p)+text.substring(p+1,p+2)+"|"+text.substring(p+2,text.length);
    }else{
        return text.substring(0,p)+k+"|"+text.substring(p+1,text.length);
    }
}
