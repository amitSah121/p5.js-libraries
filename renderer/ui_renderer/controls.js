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