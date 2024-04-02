
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
