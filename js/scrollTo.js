$(document).ready(function(){
	//Initialize the current active link
	if ($(document).scrollTop() == 0) {
		$("#about_me_link").addClass("current_active");
	}
	//On scroll change current active link
	$(document).on("scroll", onScroll);
	
	$('#custom_nav a[href^="#"]').click(function(e) {
	    //Prevent default action of anchor
		e.preventDefault();
        $(document).off("scroll");
		
		$('#custom_nav a').each(function () {
            $(this).removeClass('current_active');
        });
		
		$(this).addClass('current_active');
		$(this).blur(); //Unselect anchor
	    var target = this.hash;
	    var $target = $(target);
		
	    $("html, body").stop().animate({
	        "scrollTop": $target.offset().top
	    }, 900, "swing", function() {
			$(document).on("scroll", onScroll);
		});
	});
});

function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	//console.log(scrollPos);
	$("#custom_nav a").each(function() {
		var currLink = $(this);
		var refElement = $(currLink.attr("href"));
		//console.log(refElement.position().top);
		if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$('#custom_nav a').removeClass("current_active");
					currLink.addClass("current_active");
		}
		else{
			currLink.removeClass("active");
		}			
	});	
}