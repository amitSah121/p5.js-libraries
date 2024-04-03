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

    set_size(w,h){
        this.state.w = w != null ? w : this.state.w;
        this.state.h = h != null ? h : this.state.h;
        if(this.parent == null){
            this.w = this.state.w;
            this.h = this.state.h;
            this.pg = createGraphics(this.state.w,this.state.h);
        }
        // this.compute_box();
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

    set_text_params(align,size,style,leading){
        if(align != null){
            this.text_align[0] = align[0] != null ? align[0] : this.text_align[0];
            this.text_align[1] = align[1] != null ? align[1] : this.text_align[1];
        }
        this.text_size = size != null ? size : this.text_size;
        this.text_style = style != null ? style : this.text_style;
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
        this.draw_(this.pg,this.px,this.py,this.w,this.h);
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
        ui_rect.set_text_params(this.text_align,this.text_size,this.text_style,this.text_leading);
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