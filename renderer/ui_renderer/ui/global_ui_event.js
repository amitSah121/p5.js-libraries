let focused = [], focused_pressed = [], focus_clicked = [], hovered = [], previous_hover = [], mouse_pressed_during_focus_pressed = false;


const compute_hover = function(p,j,px,py){
    let i=0;
    let temp = p[i];
    while(temp != null){
        if(temp.collidePoint(mouseX-(px != null ? px : temp.px),mouseY-(py != null ? py :temp.py))){
            // assert(mouseX,mouseY,i,j);
            hovered[j != null ? j : i].push(temp);
            compute_hover(temp.child,j != null ? j : i,temp.px,temp.py);
        }
        i++;
        temp = p[i];
    }
}



const compute_focus = function(p,px,py){
    let i=0;
    let temp = p[i];
    while(temp != null){
        if(!is_mouse_pressed){
            mouse_pressed_during_focus_pressed = false;
        }
        if(mouse_pressed_during_focus_pressed){
            for(let i=0 ; i<focused.length ; i++){
                focused_pressed.push(focused[i]);
            }
        }
        else if(temp.collidePoint(mouseX-(px != null ? px : temp.px),mouseY-(py != null ? py :temp.py))){
            if(is_mouse_pressed){
                if(focused_pressed.length == 0){
                    compute_focus_out_event();
                    // focused.length = 0;
                }
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
