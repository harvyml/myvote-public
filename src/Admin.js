import React, {Component} from 'react'
import {Nav, HeaderForMobile, Footer, LastProjects, ParticipantsHandler} from "./Body"
import firebase from 'firebase';
import {Button} from 'react-materialize'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const firebaseConfig = {
    apiKey: "AIzaSyAon2l7MexGkcaM2xkhMZ_JCBvdt_YPmwA",
    authDomain: "myvote-sandbox.firebaseapp.com",
    databaseURL: "https://myvote-sandbox.firebaseio.com",
    projectId: "myvote-sandbox",
    storageBucket: "myvote-sandbox.appspot.com",
    messagingSenderId: "763004420769",
    appId: "1:763004420769:web:e7081df0e5352c979d26e0",
    measurementId: "G-9HP4E6HPZC"
  };

  firebase.initializeApp(firebaseConfig)

class Admin extends Component {
    componentWillMount (){
        firebase.auth().onAuthStateChanged(user => {
          this.setState({user})
        });
        firebase.database().ref("users").once("child_added", snap => {
            this.setState({
                participants: this.state.participants.concat(snap.val())
            })
        })
    }
    constructor(props){
        super(props)
        this.state = {
            user: null,
            limit: 1,
            participant: {},
            participants: [],
            contest:{}
        }
        this.showNav = this.showNav.bind(this)
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
        return <HeaderForMobile index="/"/>
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
          </header>
          </div>
          <div className="row separated-from-top">
            <div className="col s12 m8 l8 container-main-projects">
                <div className="participants-table-container">
                    {
                        this.state.participants.map((t, i) => {
                            return(
                                <ParticipantsHandler contestName="Spme"/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="col s12 m4 l4 aside-container-main-projects">
				<div className="mini mini-m">
					<h4>Name of contest</h4>
					<ul>
						<li>Number of schools: 1</li>
						<li>Number of participants: 5</li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
            <div className="col s12 m12 l12">
                <div className="container-project-story">
                    <div className="project-story">
                        
                    </div>
                </div>
            </div>
            <div id="modal-vote-con" className="modal">
                <div className="modal-content">
                <h4>Vote for <span className="participant-name"></span></h4>
                <p>Average score: <span className="participant-av"></span></p>
                    <div className="vote-con-mobile-modal white">
                        <ul>
                            <a href="" className="1">1</a>
                            <a href="" className="2">2</a>
                            <a href="" className="3">3</a>
                            <a href="" className="4">4</a>
                            <a href="" className="5">5</a>
                            <a href="" className="6">6</a>
                            <a href="" className="7">7</a>
                            <a href="" className="8">8</a>
                            <a href="" className="9">9</a>
                            <a href="" className="10">10</a>
                        </ul>
                        
                    </div>
                </div>
                <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
          </div>
          <Footer/>
        </ReactCSSTransitionGroup>
        );
    }
}

export default Admin