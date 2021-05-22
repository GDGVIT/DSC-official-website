//Click scroll actions
$(document).ready(function () {

    checkDark();

    let api = "https://medium-feed-app.herokuapp.com"

    $('#dark-light-toggle').click(function(){
        toggleDark();
        checkDark();
    })

    // fetch('https://api.github.com/orgs/GDGVIT/repos?sort=forks&order=desc').then((response)=>{
    //     response.json().then((responseJSON)=>{
    //         var n = Object.values(responseJSON).length;
    //         for(i=0;i<n;i++){
    //             $( "#github-repos" ).append( "<div class='circle-icon-holder'><div class='circle-icon-caption'><h3 class='text-center barlow-thin'>" + responseJSON[i].name + "</h3><p class='text-center barlow-medium'> Forks:" + responseJSON[i].forks + "</p></div></div>" );
    //         }
    //     })
    // }).catch((error)=>{
    //     alert(error)
    // })
    function gettext() {
        fetch( api + '/api/v2/articles?orgid=gdg-vit' ,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                })
        .then((res) => res.json())
        .then((data) => {
          $('.loader').show();  
          console.log(data);
          let output = '';
          let i=0;
          let j=data.articles.length;
          for(i=0;i<j;i=i+1){
              if (data.articles[i].thumbnailref.length <=32){
                output += `
                <div id="carder">
                            <a href="${data.articles[i].link}"><img src="../images/dsc-logo-square.svg" alt="" style=""></a>
                        <div class="details">
                            <h1><a href="${data.articles[i].link}">${data.articles[i].title}</a></h1>
                            <h3>${data.articles[i].subtitle}</h3>
                            <div class="creator">
                            <h5>${data.articles[i].creators.name}</h5>
                            <img src="${data.articles[i].creators.avatar}" alt="">
                            </div>
                        </div>
                </div><br><br><br><br>
                
                `
              }
              else{
            output += `
            <div id="carder">
                        <a href="${data.articles[i].link}"><img src="${data.articles[i].thumbnailref}" alt="" style=""></a>
                    <div class="details">
                        <h1><a href="${data.articles[i].link}">${data.articles[i].title}</a></h1>
                        <h3>${data.articles[i].subtitle}</h3>
                        <div class="creator">
                        <h5>${data.articles[i].creators.name}</h5>
                        <img src="${data.articles[i].creators.avatar}" alt="">
                        </div>
                    </div>
            </div><br><br><br><br>
            
            `}
              };
              $('.loader').hide();
          document.getElementById("github-repos").innerHTML = output;
          console.log(data.articles[18].thumbnailref.length);
        // console.log(data[0].event_name)
           });
          };
          gettext();

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
            scrollTop: $("#board").offset().top - 200
        }, 200);
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