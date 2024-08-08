[Previous](./introduction.md)
--------------------------------

## Controls

This file is specifically made to handle all the mouse and keyboard events. 

### Keyboard Events and globally declared variables

Names       | Description
---------------|------------------------
`is_key_pressed` | if a key is pressed, can register multiple clicks
`is_key_released` | if a key is released, can register multiple releases
`release_count` | it is for internal use only, used to detect the number of key released
`keyp` | a variable that contains list of all key pressed
`current_key_pressed` | a variable that contains current key pressed, note that this variable is meant to be used with __is_key_pressed__ , since it retains the value even after key is released
`current_key_released` | a variable that contains current key released, note that this variable is meant to be used with __is_key_released__ , since it retains the value even after key is released
`key_pressed_events` | you can append your own function in this, e.g., key_pressed_events.push(()=>console.log("pressed")). In this way on every key press this event will be called.
`key_released_events` | you can append your own function in this, e.g., key_released_events.push(()=>console.log("released")). In this way on every key release this event will be called. 

Note: You won't be able to declare functions : keyPressed, keyReleased


### Examples

```js

function setup(){
    createCanvas(400,400);
}

function draw(){
    background(0);

    if(is_key_pressed){
        console.log(keyp);
        console.log(current_key_pressed);
    }

    if(is_key_released){
        console.log(current_key_released);
    }
}

```
In the above example if I press "a,b" keys in order then keyp = ["a","b"] and currnet_key_pressed = "a" then "b" , and if I released keys "a" then "b", then the current_key_released will be "a" then "b"

```
Note:

Special keys have following names:
["BACKSPACE","DELETE","ENTER","RETURN","TAB","ESCAPE","SHIFT","SHIFT",
"CONTROL","OPTION","ALT","UP_ARROW","LEFT_ARROW","RIGHT_ARROW",
"DOWN_ARROW"]

So, if shift is pressed then current_key_pressed = "SHIFT"
  
```


### Mouse Events and variables

Names    | Description
-----------|-------------
`is_mouse_pressed` | if mouse is button pressed and held
`is_mouse_released` | if mouse is button released
`is_mouse_clicked` | 1 click for 1 event of a button pressed and released
`is_mouse_double_clicked` | 1 double click for 2 very near event of button pressed and released , note that is_mouse_clicked will be called once and then both is_mouse_clicked and is_mouse_double_clicked will be called,  **note it only works with latest version of p5js**
`is_mouse_dragged` | if mouse is clicked and dragged, intended to be used with mouse_dx and mouse_dy
`mouse_release_count` | for internal use only
`mouse_dx` | change in mouse x position ( mouseX - pmouseX )
`mouse_dy` | change in mouse y position ( mouseY - pmouseY )
`mouseKey` | contains which key is pressed, `["LEFT","MIDDLE","RIGHT"]`
`totalTrackPadFinger` | total number of fingers on trackpad when clicked, note 1->for 1 finger, 2-> for 2 fingers, 4-> for 3 fingers
`screenX` | actual mouse x position
`screenY` | actual mouse y position
`clientX` | mouseX
`clientY` | mouseY
`mouse_pressed_events` | you can append your own function in this, e.g., mouse_pressed_events.push(()=>console.log("pressed")). In this way on every mouse press this event will be called.
`mouse_double_clicked_events` | you can append your own function in this, e.g., mouse_double_clicked_events.push(()=>console.log("Hello")). In this way on every mouse double click this event will be called.
`mouse_dragges_events` | you can append your own function in this, e.g., mouse_dragges_events.push(()=>console.log("drag")). In this way on every mouse drag this event will be called.
`mouse_clicked_events` | you can append your own function in this, e.g., mouse_clicked_events.push(()=>console.log("click")). In this way on every mouse click this event will be called.
`mouse_moved_events` | you can append your own function in this, e.g., mouse_moved_events.push(()=>console.log("moved")). In this way on every mouse moved this event will be called.
`mouse_released_events` | you can append your own function in this, e.g., mouse_released_events.push(()=>console.log("released")). In this way on every mouse released this event will be called.


Note: You won't be able to declare functions: mousePressed, mouseClicked, mouseDoubleClicked, mouseReleased

Note: mouse_dx and mouse_dy , clientX and client_Y , don't work as expected so please use mouseX-pmouseX and mouseY-pmouseY instead of mouse_dx and mouse_dy.

### Examples

```js

function setup(){
    createCanvas(400,400);
}

function draw(){
    background(0);

    if(is_mouse_pressed){
        console.log("Mouse Pressed");
    }


    if(is_mouse_released){
        console.log("Mouse Released");
    }


    if(is_mouse_clicked){
        console.log("Mouse Clicked");
    }


    if(is_mouse_double_clicked){
        console.log("Mouse Double clicked");
    }


    if(is_mouse_dragged){ 
        console.log("Mouse dragged");
    }
}

```

Note: In above example

1) if I clicked the mouse twice then: Output -> Mouse Pressed(0 or more times), Mouse Released, Mouse Clicked

2) If I click and hold the mouse then release then: Output -> Mouse Pressed (n times called), Mouse Released , Mouse Clicked

3) If I double clicked the mouse then: Output -> Mouse Pressed(0 or more times), Mouse Released, Mouse Clicked, Mouse Pressed(0 or more times), Mouse Released, Mouse Clicked , Mouse Double clicked

4) If I press and then drag and then release then: Output -> Mouse Pressed( n times ), Mouse Dragged( n times ), Mouse Released, Mouse Clicked


### Touch events and variables

Names    | Description
----------|------------
`is_touch_started` | when touching starts
`is_touch_ended` | when all touching ends
`touch_ended_count` | for internal use only
`touch_started_events` | push your function to run when touch starts
`touch_ended_events` | push your function to run when touch ends
`touch_moved_events` | push your function to run when touch moves


Note: You won't be able to declare functions: touchStarted, touchEnded, touchMoved


Still in progress, so redeclare the functions of touch events for your own use

---------------------------------------
[Next](./renderer.md)
-----------------------------