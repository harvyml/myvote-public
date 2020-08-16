var firebaseConfig = {
    apiKey: "AIzaSyDOEB5cesDlsZi40P-0txJQsS0Oya7Hp4Y",
    authDomain: "harvy-mosquera.firebaseapp.com",
    databaseURL: "https://harvy-mosquera.firebaseio.com",
    projectId: "harvy-mosquera",
    storageBucket: "harvy-mosquera.appspot.com",
    messagingSenderId: "341656867563",
    appId: "1:341656867563:web:5682edebdf45b564"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

date()
console.log(date())
var month_day = ""
var today = ""
var month = ""
var dates = {}


firebase.database().ref("posts").once("value").then(snap => {
    let keys = Object.keys(snap.val())
    console.log(keys)
    for(i = 0; i <= keys.length; i++){
        var k = keys[i]
        var x;
        x = document.getElementById("main-set")
        var l = document.createElement("url")
        l.setAttribute("id", k)
        x.append(l)
        
        var s = document.getElementById(k)
        s.innerHTML = `
                        <loc>https://harvymosquera.co/${snap.val()[k].titleForURL}</loc>
                        <lastmod>${date().today}</lastmod>
                    `
        
    }
})

function date(){
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }
  today = mm + '-' + dd + '-' + yyyy;
  month = mm;
  month_day = `${mm}-${dd}`
  dates = {
      today,
      month,
      month_day
  }
  return dates
}