let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});



//Click scroll actions
$(document).ready(function () {

    // Scroll Clicks
    $("#home").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });

    $(".navbar-dsc-logo").click(function () {
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });

    $("#home-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });

    $("#down-arrow").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);
    })

    $("#our-work").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);

    });

    $("#our-work-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);

    });

    $("#team").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#team-scroll").offset().top
        }, 1200);

    });

    $("#team-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#team-scroll").offset().top
        }, 1200);

    });

    $("#updates").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#updates-scroll").offset().top
        }, 1800);

    });

    $("#updates-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#updates-scroll").offset().top
        }, 1800);

    });

    $("#contact").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#contact-scroll").offset().top
        }, 2100);

    });

    $("#contact-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#contact-scroll").offset().top
        }, 2100);

    });

    // Open Menu
    $('#menu-open').click(function () {
        $('.main-menu').fadeIn(100);
    })

    // Close Menu
    $('#menu-close').click(function () {
        $('.main-menu').fadeOut(100);
    })

    $(window).on('scroll', function () {

        var LogoMark = $(".main-text-holder-heading").offset().top;

        if ($(this).scrollTop() > LogoMark) {
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