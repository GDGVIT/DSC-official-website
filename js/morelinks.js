let notificationsResponse = '';


function displayNotifications (data){
    for(i=0;i<data.length;i++){
        $( "#notifications" ).append("<a target='_blank' href=' " + data[i].url + " '><div class='notification'><p class='barlow-medium text-center'><b>" + data[i].title + "</b></p><p class='barlow-extralight text-center extra-break'>" + data[i].body + "</p></div></a>");
    }
}

$(document).ready(function(){

    fetch('https://dscrec19.herokuapp.com/notifs/past', {
            method:'GET',
            crossDomain:true,
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (responseJSON){
            notificationsResponse = responseJSON;
            displayNotifications(notificationsResponse.notification_records);
        })
})

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
