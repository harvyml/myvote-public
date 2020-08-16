import React, {Component, useState, useEffect} from 'react'
import {Nav, HeaderForMobile, Footer, LastProjects, MainProjects} from "./Body"
import firebase from 'firebase';
import {Parallax} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



class Projects extends Component {
    componentWillMount (){
        firebase.auth().onAuthStateChanged(user => {
          this.setState({user})
        });
      }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
          if(user){
              var user = user;
              console.log("Logueado", user.displayName)
              if(typeof user == 'object'){
                  this.setState({
                      user: user
                  })
                  firebase.database().ref("users").update({
                      user
                  })
                  console.log(`User: \n ${this.state.user}`)
              }else{
                  console.log("Not Array")
              }
          }else{
              console.log("Not logged In")
              this.setState({
                  user: false
              })
          }
      })
      }
    constructor(props){
        super(props)
        this.state = {
            user: null,
            limit: 1
        }
        this.signInWithGoogle = this.signInWithGoogle.bind(this)
        this.logout = this.logout.bind(this)
        this.showNav = this.showNav.bind(this)
    }


    //---------------- Functions -------------------------------
signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential, errorCode, errorMessage, email)
      });
  }
  logout(){
    firebase.auth().signOut().then((result) => {
        this.setState({
          user: false
        })
        console.log(this.state.user)
      })
  }
  showNav(){
    if(window.innerWidth > 790){
      return(
        <div>
          <Nav index="../../"
          posts="../blog"
          about="../acercaDe"
          loggedIn={this.state.user ? true : false}
          login={this.signInWithGoogle} 
          logout={this.logout}
          user={this.state.user}
          />
        </div>
      )
      }else if(window.innerWidth < 790){
        return <HeaderForMobile index="/" loggedIn={this.state.user ? true : false} login={this.signInWithGoogle} logout={this.logout}/>
      } 
    }
    
//============================================================================  
    render() {
        return (
        <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
          <div className="App">
          <header>
              {
                this.showNav()
              }       
              <Parallax
                    image={<img alt="" src="http://materializecss.com/images/parallax1.jpg"/>}
                    options={{
                    responsiveThreshold: 0
                    }}
                />
          </header>
          </div>
          <div className="row">
            <div className="col s12 m6 l6 container-main-projects">
                <div className="main-projects-con">
                    <MainProjects limit={1} orderBy="likes" title="FEATURED PROJECT"/>
                </div>
            </div>
            
            <div className="col m6 l6 hide-on-med-and-down aside-container-main-projects">
                <div className="container-aside-projects">
                    <span className="sub-wide-bar">Most Viewed</span>
                    <MainProjects limit={2} orderBy="views"/>
                </div>
            </div>
          </div>
          <div className="separated-from-top">
            <LastProjects title="Last Projects: " subtitle="See all projects" limit={3} orderBy="likes"/>
          </div>
          
        </ReactCSSTransitionGroup>
        );
    }
}

function ScrollableProjects(props){
    const [limit, setLimit] = useState(1)
    useEffect(() => {
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                //bottom of the page
                setLimit(limit+15)
                console.log(limit)
            }else{
                console.log("nothing")
            }
        } 
        console.log(limit)
        return limit
    })
}

export default Projects