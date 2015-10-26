app.controller("navCtrl",["$scope", function($scope) {
	$scope.mobileProjects = [
		{
			project_name: "Android Chat I",
			page_src_main: "my_projects/androidchat_I.html",
			page_src_sub: "../my_projects/androidchat_I.html"
		},
		{
			project_name: "Android Chat II",
			page_src_main: "my_projects/androidchat_II.html",
			page_src_sub: "../my_projects/androidchat_II.html"
		}
	];
	$scope.gameProjects = [
		{
			project_name: "Breakout",
			page_src_main: "my_projects/breakout.html",
			page_src_sub: "../my_projects/breakout.html"
		},
		{
			project_name: "Tappy Plane",
			page_src_main: "my_projects/tappy_plane.html",
			page_src_sub: "../my_projects/tappy_plane.html"
		}
	];
	$scope.webProjects = [
		{
			project_name: "ICS 415 - Web Forum Project",
			page_src_main: "my_projects/web_forum.html",
			page_src_sub: "../my_projects/web_forum.html"
		},
		{
			project_name: "Portfolio Website",
			page_src_main: "my_projects/portfolio_website.html",
			page_src_sub: "../my_projects/portfolio_website.html"
		},
		{
			project_name: "Google Grid",
			page_src_main: "my_projects/google_grid.html",
			page_src_sub: "../my_projects/google_grid.html"
		},
		{
			project_name: "Web Chat",
			page_src_main: "my_projects/web_chat.html",
			page_src_sub: "../my_projects/web_chat.html"
		},
		{
			project_name: "Breakout - JS",
			page_src_main: "my_projects/breakout_js.html",
			page_src_sub: "../my_projects/breakout_js.html"
		},
		{
			project_name: "TappyPlane - JS",
			page_src_main: "my_projects/tappy_plane_js.html",
			page_src_sub: "../my_projects/tappy_plane_js.html"			
		}
	];
}]);