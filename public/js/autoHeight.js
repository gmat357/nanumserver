function navAutoHeight(){

    var body = $('body');
    var top_banner = $('.top_banner_wrap');
    var nav = $('.main_nav_wrap');
    var height = (body.outerHeight() - top_banner.height());
    nav.css({
        'height': height + 20,
  });
}