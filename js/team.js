//Click scroll actions
$(document).ready(function () {

    checkDark();

    $('#dark-light-toggle').click(function () {
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
    $('#board-expander').click(function () {
        if (!$('#board').hasClass('icons-expanded')) {
            $('#board').addClass('icons-expanded');
            $('#board-expander').children().children().text('Show Less');
        }
        else {
            $('#board').removeClass('icons-expanded');
            $('#board-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#board").offset().top - 300
        }, 300);
    })

    $('#technical-expander').click(function () {
        if (!$('#technical').hasClass('icons-expanded')) {
            $('#technical').addClass('icons-expanded');
            $('#technical-expander').children().children().text('Show Less');
        }
        else {
            $('#technical').removeClass('icons-expanded');
            $('#technical-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#technical").offset().top - 300
        }, 300);
    })

    $('#management-expander').click(function () {
        if (!$('#management').hasClass('icons-expanded')) {
            $('#management').addClass('icons-expanded');
            $('#management-expander').children().children().text('Show Less');
        }
        else {
            $('#management').removeClass('icons-expanded');
            $('#management-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#management").offset().top - 300
        }, 300);
    })

    $('#design-expander').click(function () {
        if (!$('#design').hasClass('icons-expanded')) {
            $('#design').addClass('icons-expanded');
            $('#design-expander').children().children().text('Show Less');
        }
        else {
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

var toggleDark = function () {
    if (!$('body').hasClass('dark')) {
        localStorage.setItem('dark', true);
    }
    else {
        localStorage.setItem('dark', false);
    }
}

var checkDark = function () {

    var dark = localStorage.getItem('dark');

    if (dark === 'true') {
        $('body').addClass('dark');
        // $('body').addClass('dark');
        $('.logo-light').hide();
        $('.logo').show();
        $('.logo-nav-light').hide();
        $('.logo-nav').show();
        $('.dark-light-toggle').children().text('I want light mode');
    }
    else {
        $('body').removeClass('dark');
        $('.logo-light').show();
        $('.logo').hide();
        $('.logo-nav-light').show();
        $('.logo-nav').hide();
        $('.dark-light-toggle').children().text('I want dark mode');
    }

}





let extractJson = () => {
    let Bimgs = document.querySelectorAll('#board > div > img')
    let Bname = document.querySelectorAll('#board > div > div > h3')
    let Brole = document.querySelectorAll('#board > div > div > p')

    let Timgs = document.querySelectorAll('#technical > div > img')
    let Tname = document.querySelectorAll('#technical > div > div > h3')
    let Trole = document.querySelectorAll('#technical > div > div > p')

    let Mimgs = document.querySelectorAll('#management > div > img')
    let Mname = document.querySelectorAll('#management > div > div > h3')
    let Mrole = document.querySelectorAll('#management > div > div > p')

    let Dimgs = document.querySelectorAll('#design > div > img')
    let Dname = document.querySelectorAll('#design > div > div > h3')
    let Drole = document.querySelectorAll('#design > div > div > p')

    let board = []

    Bimgs.forEach((ele, i) => {
        board.push({
            'name': Bname[i].innerHTML,
            'img': ele.src,
            'role': Brole[i].innerHTML,
            'in': true
        })
    })
    let tech = []

    Timgs.forEach((ele, i) => {
        tech.push({
            'name': Tname[i].innerHTML,
            'img': ele.src,
            'role': Trole[i].innerHTML,
            'in': true
        })
    })
    let manage = []

    Mimgs.forEach((ele, i) => {
        manage.push({
            'name': Mname[i].innerHTML,
            'img': ele.src,
            'role': Mrole[i].innerHTML,
            'in': true
        })
    })


    let design = []

    Dimgs.forEach((ele, i) => {
        design.push({
            'name': Dname[i].innerHTML,
            'img': ele.src,
            'role': Drole[i].innerHTML,
            'in': true
        })
    })

    let final = {
        'board': board,
        'tech': tech,
        'management': manage,
        'design': design
    }

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(final));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();

}

$.getJSON("team.json", function (json) {
    insertTeamData(json)
});
let insertTeamData = (data) => {

    Object.keys(data).forEach((ele) => {
        let div = document.querySelector(`#${ele}`)
        data[ele].forEach((person) => {
            if (person.in && person.img) {

                div.innerHTML += `
                    <div class="circle-icon-holder">
                        
                        <img class="circle-icon" src="${person.img}" alt="${person.name}">
                        <div class="circle-icon-caption">
                            <h3 class="text-center barlow-thin">${person.name}</h3>
                            <p class="text-center barlow-medium">${person.role}</p>
                        </div>

                    </div>
        `
            }
        })
    })
}