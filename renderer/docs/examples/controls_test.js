
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