$(document).ready(function (){

    let container = document.querySelector('.embed');
    checkDark();

    $('#dark-light-toggle').click(function(){
        toggleDark();
        checkDark();
    })

    //GET videos

    function GetVids()
    {
        var requestOptions = 
        {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        fetch("https://youtube-intg.herokuapp.com/api/v1/getPlaylistVideos", requestOptions)
            .then(response => response.json())
            .then(result => {
                $('.loader').show();
                $('.show-more-btn').hide();

                console.log(result);
                var output = "";
                let i = 0;
                let j = result.videos.length;
                for(i=0; i<j; i++)
                {
                    output += `<div class="card">
                                    <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${result.videos[i].videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div class="card-body">
                                        <h5 class='barlow-medium'>${result.videos[i].title}</h5>
                                        <p class='barlow-extralight'>${result.videos[i].description}</p>
                                    </div>
                                </div>`;
                }
                $('.loader').hide();
                
                container.innerHTML = output;
                $('.show-more-btn').show();
                
            })
            .catch(err => console.log('error' , err))
    }

    //GET playlists
    function GetPLaylists()
    {
        var requestOptions = 
        {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch("https://youtube-intg.herokuapp.com/api/v1/getPlaylistVideos", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                var output = "";
                let i = 0;
                let j = result.playlists.length;
                for(i=0; i<j; i++)
                {
                    output += `<div class="card playlist-card">
                                    <iframe width="100%" height="300" src="https://www.youtube.com/embed/videoseries?list=${result.playlists[i].playlistId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div class="card-body">
                                        <h5 class='barlow-medium'>${result.playlists[i].title}</h5>
                                        <p class='barlow-extralight'>${result.playlists[i].description}</p>
                                        <div class='button-maker'>
                                            <div class='playlist-videos-btn button-text'>
                                                View all
                                                <div class='id-storage'>${result.playlists[i].playlistId}</div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>`;
                }
        
                $('.embed-playlists').html(output);

                $('.playlist-videos-btn').on('click', function(){
                    var requestOptions = {
                        method: 'GET',
                        redirect: 'follow'
                    };

                    var id = $(this).children().text();
                    
                    fetch("https://youtube-intg.herokuapp.com/api/v1/getPlaylist?playlistId=" + id, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            var output = "";
                            let i = 0;
                            let j = result.videos.length;
                            for(i=0; i<j; i++)
                            {
                                output += `<div class="card">
                                                <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${result.videos[i].videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                <div class="card-body">
                                                    <h5 class='barlow-medium'>${result.videos[i].title}</h5>
                                                    <p class='shave barlow-extralight'>${result.videos[i].description}</p>
                                                </div>
                                            </div>`;
                            }
                            $('.embed-playlist-videos').html(output);
                            $('#playlists').hide();
                            $('#playlist-videos').show();
                            shave($('.shave'), 130);
                            $('.playlists').hide();
                            $('.videos').hide();

                        })
                        .catch(error => console.log('error', error));
                });
                
            })
            .catch(err => console.log('error' , err))


    }

    //Playlists section on click
    $('.playlists').on('click', function()
    {
        if($('.playlists').hasClass('active'))
        {
            console.log('already loaded');
        }
        else
        {
            $('#playlists').show();
            $('.playlists').addClass('active');
            $('.videos').removeClass('active');
            $('#videos').hide();
            $('#playlist-videos').hide();
        }
    });

    //videos section on click
    $('.videos').on('click', function()
    {
        if($('.videos').hasClass('active'))
        {
            console.log('already loaded');
        }
        else
        {
            $('#videos').show();
            $('.videos').addClass('active');
            $('.playlists').removeClass('active');
            $('#playlists').hide();
            $('#playlist-videos').hide();
        }
    });

    $('.back-to-playlist').on('click', function(){
        $('.playlists').show();
        $('.videos').show();
        $('#playlist-videos').hide();
        $('#playlists').show();
    });

    //delay function

    // function Delay()
    // {
    //     $('.loader').show();
    //     $('.button-maker').hide();
    //     setTimeout(function(){
    //         $('.loader').hide();
    //         $('.button-maker').show();
    //         GetVids();
    //         GetPLaylists();
    //     }, 3000);
    // }

    // Delay();

    GetPLaylists();
    GetVids();
    //Show more toggle

    $('.show-more-btn').on('click', function(){
        if(!$('.embed').hasClass('expanded'))
        {
            $('.embed').addClass('expanded');
            $('.show-more-btn').text('Show Less');
        }
        else
        {
            $('.embed').removeClass('expanded');
            $('.show-more-btn').text('Show more');
        }
    });


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