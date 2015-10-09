$(document).ready(function(){


	if (matchMedia) {
		var mq = window.matchMedia("(max-width: 1199px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
	}	

});

// media query change
function WidthChange(mq) {
	if (mq.matches) {
		$("#googleplus_icon").attr("src", "images/icons/google_plus_icon_32.png");
		$("#googlesearch_icon").attr("src", "images/icons/google_search_icon_32.png");
		$("#gmail_icon").attr("src", "images/icons/gmail_icon_32.png");
		$("#youtube_icon").attr("src", "images/icons/youtube_icon_32.png");
		$("#googlemap_icon").attr("src", "images/icons/google_map_icon_32.png");
		$("#blogger_icon").attr("src", "images/icons/blogger_icon_32.png");
		$("#googleearth_icon").attr("src", "images/icons/google_earth_icon_32.png");
		$("#googlechrome_icon").attr("src", "images/icons/google_chrome_icon_32.png");
		$("#androidmarket_icon").attr("src", "images/icons/android_market_icon_32.png");
		$("#googlemusic_icon").attr("src", "images/icons/google_music_icon_32.png");
		$("#googlenews_icon").attr("src", "images/icons/google_news_icon_32.png");
	}
	else {
		$("#googleplus_icon").attr("src", "images/icons/google_plus_icon.png");
		$("#googlesearch_icon").attr("src", "images/icons/google_search_icon.png");
		$("#gmail_icon").attr("src", "images/icons/gmail_icon.png");
		$("#youtube_icon").attr("src", "images/icons/youtube_icon.png");
		$("#googlemap_icon").attr("src", "images/icons/google_map_icon.png");
		$("#blogger_icon").attr("src", "images/icons/blogger_icon.png");
		$("#googleearth_icon").attr("src", "images/icons/google_earth_icon.png");
		$("#googlechrome_icon").attr("src", "images/icons/google_chrome_icon.png");
		$("#androidmarket_icon").attr("src", "images/icons/android_market_icon.png");
		$("#googlemusic_icon").attr("src", "images/icons/google_music_icon.png");
		$("#googlenews_icon").attr("src", "images/icons/google_news_icon.png");
	}
}