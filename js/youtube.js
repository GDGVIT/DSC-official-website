let container = document.querySelector('.embed');


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
            console.log(result);
            var output = "";
            let i = 0;
            let j = result.videos.length;
            for(i=0; i<j; i++)
            {
                output += `<div class="card">
                                <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${result.videos[i].videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                <div class="card-body">
                                    <h6>${result.videos[i].title}</h6>
                                    <p>${result.videos[i].description}</p>
                                </div>
                            </div>`;
            }
    
            container.innerHTML = output;
    
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
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=${result.playlists[i].playlistId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                <div class="card-body">
                                    <h6>${result.playlists[i].title}</h6>
                                    <p>${result.playlists[i].description}</p>
                                    <div class='playlist-videos-btn'>
                                        See All Videos
                                        <div class='id-storage'>${result.playlists[i].playlistId}</div>
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
                            output += `<div class="card playlist-card">
                                            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${result.videos[i].videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            <div class="card-body">
                                                <h6>${result.videos[i].title}</h6>
                                                <p>${result.videos[i].description}</p>
                                            </div>
                                        </div>`;
                        }
                        $('#playlists').hide();
                        $('.embed-playlist-videos').html(output);
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
    }
});

//delay function

function Delay()
{
    $('.text-center').show();
    $('.button-text').hide();
    setTimeout(function(){
        $('.text-center').hide();
        $('.button-text').show();
        GetVids();
        GetPLaylists();
    }, 3000);
}

Delay();

//Show more toggle

$('.button-text').on('click', function(){
    if(!$('.embed').hasClass('expanded'))
    {
        $('.embed').addClass('expanded');
        $('.button-text').text('Show Less');
    }
    else
    {
        $('.embed').removeClass('expanded');
        $('.button-text').text('Show more');
    }
});