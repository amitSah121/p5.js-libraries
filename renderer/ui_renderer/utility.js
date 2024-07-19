

let utility_colors = {}

const set_utility_colors = function(){
    utility_colors.red = color(244,67,54);
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
    utility_colors.pale_red = color(255,221,221);
    utility_colors.pale_yellow = color(255,255,204);
    utility_colors.pale_green = color(221,255,221);
    utility_colors.pale_blue = color(221,255,255);
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
