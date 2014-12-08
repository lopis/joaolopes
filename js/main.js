
var color = {
	"h": 8,
	"s": 100,
	"l": 57
}

window.onscroll = function() {
    color.h = 8 - (document.documentElement.scrollTop / document.getElementById("content").clientHeight)*40;
    document.getElementById("content").style.borderLeftColor = "hsl("+color.h+","+color.s+"%,"+color.l+"%)";
    
    console.log(color.h);
};