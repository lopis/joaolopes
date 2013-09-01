$(".pt").hide();
$(".en").show();
$("#flag-gb").addClass("active");
$("#flag-pt").removeClass("active");


$("#flag-pt").click(function(){
	$(".en").hide();
	$(".pt").show();
	$("#flag-pt").addClass("active");
	$("#flag-gb").removeClass("active");
});

$("#flag-gb").click(function(){
	$(".pt").hide();
	$(".en").show();
	$("#flag-gb").addClass("active");
	$("#flag-pt").removeClass("active");
});