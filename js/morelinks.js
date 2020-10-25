
function replaceWithLoader(e, index) {
    e.target.style.opacity = "1";
    document.getElementById(`wave-${index}`).style.display = "none";
}

fetch('https://dsclinks.herokuapp.com/' ,{})
    .then((res) => res.json())
    .then((data) => {
        $('.loader').show();
      console.log(data);
        var posts = data.data.length;
        let output = '';
        for(i=0;i<posts;i++){
            if(data.data[i].media_type === "IMAGE"){

            
            if(data.data[i].url === ""){
                output += `
            <div class="image" style="position:relative;">
                <div id="wave-${i}" class="wave">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <img 
                src="${data.data[i].media_url}" 
                alt="" 
                style='opacity:0;transition:opacity 0.5s ease;'
                onLoad="replaceWithLoader(event, ${i})" />
            </div>`;
            }
            else{
                output += `
            <div class="image" style="position:relative;">
                <a href="${data.data[i].url}" target="_blank">
                    <div id="wave-${i}" class="wave">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <img 
                    src="${data.data[i].media_url}" 
                    alt="" 
                    style='opacity:0;transition:opacity 0.5s ease;'
                    onLoad="replaceWithLoader(event, ${i})" />
                </a>
            </div>`;
            }
            // <a href="${data.data[i].url}" target="_blank">
            // <img src="${data.data[i].media_url}" alt="">
            // </a>
        }
        else if (data.data[i].media_type === "VIDEO"){
            if(data.data[i].url === ""){
                output+=`
            <div class="image">
            <video  controls>
            <source src="${data.data[i].media_url}" type="video/mp4">
            Your browser does not support the video tag.
            </video>
            </div>`
            }
            else{
                output+=`
            <div class="image">
            <a href="${data.data[i].url}" target="_blank">
            <video  controls>
            <source src="${data.data[i].media_url}" type="video/mp4">
            Your browser does not support the video tag.
            </video>
            </a>
            </div>`
            }
        }
        else if (data.data[i].media_type === "CAROUSEL_ALBUM"){
            if(data.data[i].url === ""){
                output+=`
            <div class="image">
            <img src="${data.data[i].media_url}" alt="">
            </div>`
            }
            else{
                output+=`
            <div class="image">
            <a href="${data.data[i].url}" target="_blank">
            <img src="${data.data[i].media_url}" alt="">
            </a>
            </div>`
            }
        }
        }
        $('.loader').hide();
        document.getElementById("links").innerHTML = output;  
    })
    
    // for future use

    //  <div class="text">
    //         ${data.data[i].caption}
    //         </div>




// var raw = "{\n	\"Name\": \"H\",\n	\"Phone_number\": \"9876543210\",\n	\"Total_amount\": \"1000\",\n	\"Paid_amount\": \"425\",\n	\"Date\": \"2020-5-23\",\n	\"Time\": \"10:0:0\",\n	\"Examination\": \"FALSE\"\n}";

//         var requestOptions = {
//           method: 'POST',
//           body: raw
//         };
        
//         fetch("https://linksinstagram.herokuapp.com/", requestOptions)
//           .then(response => response.text())
//           .then(result => console.log(result))
//           .catch(error => console.log('error', error));




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

    $('#github-repo-expander').click(function(){
        if(!$('#github-repos').hasClass('icons-expanded')){
            $('#github-repos').addClass('icons-expanded');
            $('#github-repo-expander').children().children().text('Show Less');
        }
        else{
            $('#github-repos').removeClass('icons-expanded');
            $('#github-repo-expander').children().children().text('Show All');
        }
        // $('html, body').animate({
        //     scrollTop: $("#github-repo").offset().top - 300
        // }, 300);
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
        // $('body').addClass('dark');
        $('.logo-light').hide();
        $('.logo').show();
        $('.logo-nav-light').hide();
        $('.logo-nav').show();
        $('.dark-light-toggle').children().text('I want light mode');
    }
    else{
        $('body').removeClass('dark');
        $('.logo-light').show();
        $('.logo').hide();
        $('.logo-nav-light').show();
        $('.logo-nav').hide();
        $('.dark-light-toggle').children().text('I want dark mode');
    }

}
