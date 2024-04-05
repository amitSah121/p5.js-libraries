let a = {};
let clock_event;

function setup(){
    createCanvas(600,600);

    a.a = new ContainerUi("hortz",null,"a",[width,80]);
    a.a.set_fill_color(utility_colors.red);
    
    a.a1 = new GridUi(a.a,"Header",2);

    a.a1.set_row_constant(0,false);
    a.a11 = new BoxUi(a.a1.get_row(0),"File");
    a.a11.set_text("File");
    a.a11.bg.set_fill_color(utility_colors.light_gray);
    a.a12 = new BoxUi(a.a1.get_row(0),"New");
    a.a12.set_text("New");
    a.a12.bg.set_fill_color(utility_colors.light_gray);
    a.a13 = new ExpandedUi(a.a1.get_row(0),"S1");
    a.a13.element.set_fill_color(utility_colors.light_gray);

    a.a1.make_row_expanded(1);
    a.a1.get_row(1).set_fill_color(utility_colors.light_gray);
    a.a1.get_row(1).set_fill_color(color(255));
    a.a21 = new BoxUi(a.a1.get_row(1),"TextBox",80);
    a.a21.bg.set_fill_color(utility_colors.light_gray);
    a.a21.set_text("|");
    a.a21.body.set_text_params([LEFT,null]);
    a.a22 = new BoxUi(a.a1.get_row(1),"Submit",60);
    a.a22.set_text("Submit");
    a.a22.bg.set_fill_color(utility_colors.light_gray);

    a.b = new ContainerUi("hortz",null,"b",[width-20,height-100]);
    a.b.set_fill_color(utility_colors.blur_gray);
    a.b.set_window_pos(null,a.a.state.h);

    a.b1 = new GridUi(a.b,"Grid",100);
    for(let i=0 ; i<100 ; i++){
        for(let j=0 ; j<10 ; j++){
            let p3 = new BoxUi(a.b1.get_row(i));
            p3.set_text(i+"_"+j);
            p3.bg.set_focus_clicked_event(()=>{
                console.log(p3.body.text);
            })
        }
    }

    a.c = new ContainerUi("hortz",null,"c",[20,height-20-a.a.state.h]);
    // a.c.set_fill_color(utility_colors.gray);
    a.c.set_window_pos(a.b.state.w,a.a.state.h);
    a.c1 = new SliderUi(a.c,"Vert Slider","vert",null,a.c.state.h,1);
    a.c1.slider.set_fill_color(utility_colors.light_gray);
    a.c1.slider_per.set_fill_color(utility_colors.gray);



    a.d = new ContainerUi("hortz",null,"c",[width,20]);
    // a.d.set_fill_color(utility_colors.dark_gray);
    a.d.set_window_pos(0,a.b.state.h+a.b.py);
    a.d1 = new SliderUi(a.d,"Hortz Slider",null,a.d.state.w,null);
    a.d1.slider.set_fill_color(utility_colors.light_gray);
    a.d1.slider_per.set_fill_color(utility_colors.gray);
    


    a.a.compute_box();
    a.b.compute_box();
    a.c.compute_box();
    a.d.compute_box();


    a.a.set_disable_window_event(true);
    a.b.set_disable_window_event(true);
    a.c.set_disable_window_event(true);
    a.d.set_disable_window_event(true);

    // a.d1.set

    // clock_event = 
    console.log(a)

}

function draw(){
    background(0);
    a.a.draw();
    a.b.draw();
    a.c.draw();
    a.d.draw();

    if(is_mouse_pressed){
        a.b.set_pos(a.b.x+mouseX-pmouseX,a.b.y+mouseY-pmouseY);
        a.b.compute_box();
    }
}