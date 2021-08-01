let emailValue = '';
let emailValidity = false;
let FCMToken = '';
let recaptchaToken = '';
let messaging
let submitEmail
try{
    messaging = firebase.messaging();
    messaging.onMessage(function(payload){
        return self.ServiceWorkerRegistration.showNotification(title,options);
    })
    submitEmail = () => {
    
        if(emailValidity){
            messaging.requestPermission()
            .then((permission) => {
                console.log('Notification permission granted.');
                return messaging.getToken();
            })
            .then((token) => {
                FCMToken = token;
                submitEmailwithToken();
                localStorage.setItem('userNotificationTokenDSC', FCMToken);
            });
        }
        else{
            console.log('Invalid Email')
        }
    }
}
catch(e){
    console.log(e)
}



function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function updateEmailToken(){
    fetch('https://dscrec19.herokuapp.com/notifs/?email='+emailValue+'&device_id='+FCMToken, {
            method:'PUT',
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
            if(responseJSON.status === false){
                $('.error-message').addClass('message-active');
                document.getElementById('error-message').innerHTML = "Error Changing Device";
                setTimeout(function(){ 
                    $('.error-message').removeClass('message-active');
                    document.getElementById('error-message').innerHTML = null;
                }, 2500);
            }
            else{
                $('.success-message').addClass('message-active');
                document.getElementById('success-message').innerHTML = "New Device Added";
                setTimeout(function(){ 
                    $('.success-message').removeClass('message-active');
                    document.getElementById('success-message').innerHTML = null;
                }, 2500);
            }
        })

}

function submitEmailwithToken(){

    fetch('https://dscrec19.herokuapp.com/notifs/', {
            method:'POST',
            crossDomain:true,
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                emailAddress: emailValue,
                deviceID: FCMToken
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (responseJSON){
            if(responseJSON.err === undefined){
                $('.success-message').addClass('message-active');
                document.getElementById('success-message').innerHTML = "Welcome to the Notification Gang!";
                setTimeout(function(){ 
                    $('.success-message').removeClass('message-active');
                    document.getElementById('success-message').innerHTML = null;
                }, 2500);
            }
            else if(responseJSON.err === 'User already registered'){
                $('.change-device-message').addClass('change-device-active');
            }
            else{
                $('.error-message').addClass('message-active');
                document.getElementById('error-message').innerHTML = "Error Registering your Email";
                setTimeout(function(){ 
                    $('.error-message').removeClass('message-active');
                    document.getElementById('error-message').innerHTML = null;
                }, 2500);
            }
        })
    
}




if(localStorage.getItem('userNotificationTokenDSC')===null){
    FCMToken = generateToken();
    localStorage.setItem('userNotificationTokenDSC', FCMToken);
}else{
    FCMToken = localStorage.getItem('userNotificationTokenDSC');
}

function generateToken() {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < 16; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

$(document).ready(function () {

    $('#change-deviceID').click(function(){
        updateEmailToken();
        $('.change-device-message').removeClass('change-device-active');
    })

    $('#no-change-deviceID').click(function(){
        $('.change-device-message').removeClass('change-device-active');
    })


    $("#get-updates").click((e) => {

        submitEmail();
            
        // grecaptcha.ready(() => {

            

        //         // grecaptcha.execute('6LdiJ8QUAAAAAFCiBqwvhGOI2Ho3v-EFD73PAiBn', { action: '/' }).then(async (token) => {

        //         //     let body = {
        //         //         "g-recaptcha-response": token, "email": emailValue
        //         //     }

        //         //     console.table(body)
        //         //     console.log(token)
        //         //     recaptchaToken = token;

        //         //     let resp = await fetch("/updates", {
        //         //         method: "POST",
        //         //         headers: {
        //         //             'Accept': 'application/json',
        //         //             'Content-Type': 'application/json'
        //         //         },
        //         //         body: JSON.stringify(body)
        //         //     })

        //         //     submitEmail();
                    
        //         //     let reply = await resp.json()


        //         //     if (reply.status === false) {
        //         //         alert("Captcha Not Verified")
        //         //     } else if (reply.err != null) {
        //         //         console.log(reply.err)
        //         //         if (reply.err === "Already responded")
        //         //             alert(reply.err)
        //         //     } else {

        //         //         console.log(reply)

        //         //     }

        //         // });
        // });

    });

    document.getElementById('email').addEventListener("input", function() {
        emailValue = $("#email").val();

        if(validateEmail(emailValue)){
            $('#email').addClass('text-field-true');
            $('#email').removeClass('text-field-false');
            emailValidity = true;
        }
        else{
            $('#email').removeClass('text-field-true');
            $('#email').addClass('text-field-false');
            emailValidity = false;
        }
        
    });

    checkDark();

    

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

let toggle = () => {
    toggleDark();
    checkDark();
}



document.querySelector('#dark-light-toggle').addEventListener('click', toggle)

