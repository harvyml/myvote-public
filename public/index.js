// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDOEB5cesDlsZi40P-0txJQsS0Oya7Hp4Y",
authDomain: "harvy-mosquera.firebaseapp.com",
databaseURL: "https://harvy-mosquera.firebaseio.com",
projectId: "harvy-mosquera",
storageBucket: "harvy-mosquera.appspot.com",
messagingSenderId: "341656867563",
appId: "1:341656867563:web:5682edebdf45b564"
};

document.addEventListener('DOMContentLoaded', function(){
    var dropdown = document.getElementsByClassName('dropdown-trigger')
    M.AutoInit();
    InitializeAll()
    function InitializeAll(){
        var dropdown = document.getElementsByClassName('dropdown-trigger');
        var instances = M.Dropdown.init(dropdown, {
            constrainWidth: false
        });
    }
    function callPosts(){
        firebase.database().ref("posts").once("child_added", snap => {
            var data = {}
            return data = {[snap.val().title]: snap.val().titleForURL}
            console.log(data)
        })
    }
    /*footer's position in Y*/
    let footer = document.querySelector("footer")
    var footerY;
    let beforeFooter;
    setTimeout(function(){
        footerY = footer.offsetTop
        beforeFooter = footerY * 2
        scrollChanges(footerY+footer.offsetHeight, document.querySelector(".next-post"), "transition: all .3s ease;", `transition: all .3s ease; transform: translateY(${-(footer.offsetHeight + 20)}px)`, console.log(window.scrollY))
        console.log(footerY, beforeFooter)
    }, 3000)
    
    /*Changes on width less than 895*/
    let tweets_container = document.querySelector(".tweets-container")
    if(window.innerWidth <= 600){
        console.log("Less")
        tweets_container.style.cssText = "width: 80% !important; margin: auto;"
    }else{
        scrollChanges(100, document.querySelector(".tweets-container"), "position: sticky; top: 0;", "position: sticky; top: 60px;", console.log("Twits"))
        scrollChanges(100, document.querySelector(".nav-animated"), "background: transparent; transition: ease 2s all;", "background: rgba(0,0,0,0.5); transition: ease 2s all;", console.log("Scroll"))
    }

})

function scrollChanges(y, elem, prevStyles, nextStyles, last){//Number of scroll, DOM element, styles
    window.addEventListener("scroll", function(){
        let n = window.scrollY
        if(elem != null){
            if(n >= y){
                elem.style.cssText = nextStyles
                last
            }else{
                elem.style.cssText = prevStyles
                last
            }
        }
    })
}

var slider = $('.slider');

function moverD(){
    slider.animate({marginLeft:'-'+100+'%'},700, function(){
        $('.slider section:first').insertAfter('.slider section:last');
        slider.css('margin-left', '+'+0+'%');
    });
}

function autoplay(){
    interval = setInterval(function(){
        moverD();
    },6000);
}

autoplay();
