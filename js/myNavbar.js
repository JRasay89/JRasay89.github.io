$(document).ready(function() {
	var documentTitle = $('title').text();
	setActiveMenu(documentTitle);
	
});

function setActiveMenu(pageTitle) {
	switch(pageTitle) {
		case "Home page":
			console.log(pageTitle);
			$('#home_menu').addClass('active');
			break;
		case "Coursework page":
			console.log(pageTitle);
			$('#coursework_menu').addClass('active');
			break;
		case "Projects page":
			console.log(pageTitle);
			$('#projects_menu').addClass('active');
			break;
		case "About Me page":
			console.log(pageTitle);
			$('#about_me_menu').addClass('active');
			break;
		default:
			console.log("Home");
			break;
	}
}