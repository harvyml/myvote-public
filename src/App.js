import React, { Component } from 'react';
import firebase from 'firebase';
import {Parallax} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import {Nav, HeaderForMobile, Footer, Main} from "./Body"


const config = {
  apiKey: "AIzaSyAon2l7MexGkcaM2xkhMZ_JCBvdt_YPmwA",
  authDomain: "myvote-sandbox.firebaseapp.com",
  databaseURL: "https://myvote-sandbox.firebaseio.com",
  projectId: "myvote-sandbox",
  storageBucket: "myvote-sandbox.appspot.com",
  messagingSenderId: "763004420769",
  appId: "1:763004420769:web:e7081df0e5352c979d26e0",
  measurementId: "G-9HP4E6HPZC"
}
firebase.initializeApp(config)

class App extends Component{
  componentWillMount (){
  firebase.auth().onAuthStateChanged(user => {
    this.setState({user})
  });
}

  componentDidUpdate(){
    console.log(this.state.form, this.state.info, this.state.personalCode)
  }

constructor(){
  super()
  this.state = {
    user: null,
    page: window.location.pathname,
    projects: [],
    personalCode: "",
    rol: {},
    form: true,
    info: false
  }
  this.handleAuth = this.handleAuth.bind(this)
  this.changeMarginFromTop = this.changeMarginFromTop.bind(this)
  this.showNav = this.showNav.bind(this)
  this.send = this.send.bind(this)  
  this.inputOnChange = this.inputOnChange.bind(this)
}
send(){
  try{
      firebase.database().ref("comments").push({
          html: this.state.comment,
          displayImg: this.state.user.photoURL,
          titleForURL: this.state.page,
          user: this.state.user.displayName,
          email: this.state.user.email,
          uid: this.state.user.uid,
          date: date().today
      })
  }catch(err){
      alert("Inicia Sesión para enviar un comentario")
  }   
}
handleAuth (){
  firebase.database().ref("users").orderByChild("code").equalTo(parseInt(this.state.personalCode)).once("value").then(snap => {  
    let k = Object.keys(snap.val())[0]
    this.setState({
      rol: snap.val()[k].rol
    })
  }).then(() => {
    this.setState({
      form: false,
      info: true
    })
    console.log(this.state.rol)
  }).catch(err => console.log(err.message))
}

inputOnChange(e){
  this.setState({
    personalCode: e.target.value
  })
}

changeMarginFromTop(){
  if(window.innerWidth <= 500 && this.state.page == "/blog"){
    return "separated-from-top posts-container col s12 m12 l12"
  }else if(this.state.page == "/newPost"){
    return "col s12 m12 l12"
  }else if(this.state.page == "/blog" && window.innerWidth >= 500){
    return "col s12 m9 l9 separated-from-top"
  }else{
    return "col s12 m12 l12"
  }
}
showNav(){
if(window.innerWidth > 790){
  return(
    <div>
      <Nav index="../../"
      posts="../blog"
      about="../acercaDe"
      user={this.state.user}
      />
    </div>
  )
  }else if(window.innerWidth < 790){
    return <HeaderForMobile index="/" loggedIn={this.state.user ? true : false} login={this.signInWithGoogle} logout={this.logout}/>
  } 
}
//---------------- Functions -----------------------------

  render() {
    return (
    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
      <div className="App">
      <header>
          {
            this.showNav()
          }       
      </header>
      <div className={"separated-from-top section white"}>
        <div className="row">
          <Main 
            form={this.state.form}
            info={this.state.info}
            code={this.state.code}
          />
        </div>
      </div>
      </div>
      <Footer/>
      
    </ReactCSSTransitionGroup>
    );
  }
}



export default App;