//Click scroll actions
$(document).ready(function () {

    checkDark();

    $('#dark-light-toggle').click(function(){
        toggleDark();
        checkDark();
    })

    // Scroll Clicks
    $("#down-arrow").click(function () {
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);
    })

    // Icons Expanders
    $('#board-expander').click(function(){
        if(!$('#board').hasClass('icons-expanded')){
            $('#board').addClass('icons-expanded');
            $('#board-expander').children().children().text('Show Less');
        }
        else{
            $('#board').removeClass('icons-expanded');
            $('#board-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#board").offset().top - 300
        }, 300);
    })

    $('#technical-expander').click(function(){
        if(!$('#technical').hasClass('icons-expanded')){
            $('#technical').addClass('icons-expanded');
            $('#technical-expander').children().children().text('Show Less');
        }
        else{
            $('#technical').removeClass('icons-expanded');
            $('#technical-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#technical").offset().top - 300
        }, 300);
    })

    $('#management-expander').click(function(){
        if(!$('#management').hasClass('icons-expanded')){
            $('#management').addClass('icons-expanded');
            $('#management-expander').children().children().text('Show Less');
        }
        else{
            $('#management').removeClass('icons-expanded');
            $('#management-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#management").offset().top - 300
        }, 300);
    })

    $('#design-expander').click(function(){
        if(!$('#design').hasClass('icons-expanded')){
            $('#design').addClass('icons-expanded');
            $('#design-expander').children().children().text('Show Less');
        }
        else{
            $('#design').removeClass('icons-expanded');
            $('#design-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#design").offset().top - 300
        }, 300);
    })

    // Close Menu
    $('#menu-close').click(function () {
        $('.main-menu').fadeOut(100);
    })

    $(window).on('scroll', function () {

        if ($(this).scrollTop() > 0) {
            if (!$('.navbar').hasClass('navbar-scrolled')) {
                $('.navbar').addClass('navbar-scrolled');
            }
        } else {
            if ($('.navbar').hasClass('navbar-scrolled')) {
                $('.navbar').removeClass('navbar-scrolled');
            }
        }
    });
})

var toggleDark = function(){
    if(!$('body').hasClass('dark')){
        localStorage.setItem('dark',true);
    }
    else{
        localStorage.setItem('dark',false);
    }
}

var checkDark = function (){

    var dark = localStorage.getItem('dark');

    if(dark==='true'){
        $('body').addClass('dark');
        $('.dark-light-toggle').children().text('I want light mode');
    }
    else{
        $('body').removeClass('dark');
        $('.dark-light-toggle').children().text('I want dark mode');
    }

}