// music player interface
let a = {};
let play_song;
let clock;


function setup(){
  createCanvas(400,400);
  clock  = new Clock();
  play_song = clock.set_interval("playing",(args)=>{
    // console.log(a.slider_ui.amt);
    a.slider_ui.amt += 0.1;
    if(a.slider_ui.amt > 1){
      a.slider_ui.amt = 0;
    }
    a.slider_ui.slider_per.set_size_per(a.slider_ui.amt,a.slider_ui.amt);
    a.b.compute_box();
  },1000);
  clock.stop_event("playing");

  // tabs 
  a.a = new ContainerUi("hortz",null,"parent",[150,36]);
  a.a.set_window_pos(50,50);
  a.a.set_fill_color(color(125));
  
  a.play = new BoxUi(a.a,"Play");
  a.play.set_text("Play");
  a.play.set_fg_color(utility_colors.light_gray);
  a.play.set_bg_color(utility_colors.light_gray);
  a.play.bg.set_focus_clicked_event(()=>{
    a.play.set_fg_color(utility_colors.light_gray);
    a.play.set_bg_color(utility_colors.light_gray);
    a.volume.set_fg_color(color(255));
    a.volume.set_bg_color(color(255));
    a.b.set_disable_window_event(false);
    a.c.set_disable_window_event(true);
  })
  
  a.volume = new BoxUi(a.a,"Volume",80);
  a.volume.set_text("Volume");
  a.volume.bg.set_focus_clicked_event(()=>{
    a.volume.set_fg_color(utility_colors.light_gray);
    a.volume.set_bg_color(utility_colors.light_gray);
    a.play.set_fg_color(color(255));
    a.play.set_bg_color(color(255));
    a.c.set_disable_window_event(false);
    a.b.set_disable_window_event(true);
  })
  
  
  // body of music player
  a.b = new ContainerUi("hortz",null,"parent",[250,100]);
  a.b.set_window_pos(50,100);
  a.b.set_fill_color(color(255));
  
  a.b_grid = new GridUi(a.b,"grid_b",2);
  
  // in row 0
  a.b_grid.set_row_constant(0,false);
  {
    new ExpandedUi(a.b_grid.get_row(0));
  }
  
  a.play_button = new BoxUi(a.b_grid.get_row(0),"play_button",66,50);
  a.play_button.body.set_text_params(null,50);
  a.play_button.set_text("<>");
  a.play_button.set_fg_color(utility_colors.light_gray);
  a.play_button.set_bg_color(utility_colors.light_gray);
  
  a.play_button.body.set_focus_clicked_event(()=>{
    clock.reset_interval_event("playing",1000);
    // console.log("Helli")
  });
  
  
  
  a.pause_button = new BoxUi(a.b_grid.get_row(0),"pause_button",60,50);
  a.pause_button.body.set_text_params(null,50);
  a.pause_button.set_text("| |");
  a.pause_button.set_fg_color(utility_colors.light_gray);
  a.pause_button.set_bg_color(utility_colors.light_gray);
  a.pause_button.body.set_focus_clicked_event(()=>{
    clock.stop_event("playing");
    // console.log("Helli")
  });
  
  {
    new ExpandedUi(a.b_grid.get_row(0));
  }
  
  // in row 2
  a.slider_ui = new SliderUi(a.b_grid.get_row(1),"time");
  a.slider_ui.slider.set_size(250);
  
  // body of volume
  a.c = new ContainerUi("hortz",null,"parent",[250,50]);
  a.c.set_window_pos(50,100);
  a.c.set_fill_color(color(255));
  
  // in row 0
  a.vol = new SliderUi(a.c,"volume_slider");
  a.vol.slider.set_size(250);
  a.vol.slider_per.set_size_per(0.5,0.5);

  
  a.a.compute_box();
  a.b.compute_box();
  a.c.compute_box();
  a.c.set_disable_window_event(true);
  // console.log(global_parent_uis)

}

function draw(){
  background(0);
  a.a.draw();
  if(!a.b.disable_window_events)
    a.b.draw();
  if(!a.c.disable_window_events)
    a.c.draw();
  
  // a.c.draw();

}