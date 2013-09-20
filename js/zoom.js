zoomed = false;


$(".zoom").click(function(){
	if(!zoomed) {
		src = $(this).attr('src');
		$("body").prepend("<div class='large'><img src='" + src + "' /></div>");
		zoomed = true;
	}

	$(".large").click(function(){
	if(zoomed) {
		$(".large").remove();
		zoomed = false;
	}
});
});

