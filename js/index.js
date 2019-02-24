//Click scroll actions
$(document).ready(function(){
    $("#home").click(function (){
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });
    $("#our-work").click(function (){
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);
    });
    $("#team").click(function (){
        $('html, body').animate({
            scrollTop: $("#team-scroll").offset().top
        }, 1200);
    });
    $("#updates").click(function (){
        $('html, body').animate({
            scrollTop: $("#updates-scroll").offset().top
        }, 1800);
    });
    $("#contact").click(function (){
        $('html, body').animate({
            scrollTop: $("#contact-scroll").offset().top
        }, 2100);
    });
})