import React, { Component } from 'react';
import firebase from 'firebase';
import $ from "jquery";
import {Modal, Icon, Carousel, Row, Col, Card, CardTitle, Parallax, Input, Button, Container} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Routes from "./routes"
import MarkDown from "react-remarkable"
import {SocialMedia, Nav, Footer, HeaderForMobile, Info, SliderFullPage, About, ItemCardToShow} from "./Body"

class Edit extends Component{
    componentDidMount(){
        firebase.database().ref("posts").orderByChild("titleForURL").equalTo(this.state.page).on("child_added", snap => {
            this.setState({
                post: snap.val()
            })
        })
    }
    constructor(){
        super()
        this.state = {
            page: (window.location.pathname).slice(window.location.pathname.lastIndexOf("/")+1, window.location.href),
            post: {
                title: "Title",
                html: "Hello **world**",
                metatags: "Post",
                date: date().today,
                imgURL: "",
                video: ""
            },
            postToEdit: "",
            postEdited: {
                title: "Title",
                html: "Hello **world**",
                metatags: "Post",
                date: date().today,
                imgURL: "",
                video: ""
            }
        }

        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
        this.newPost = this.newPost.bind(this)
        this.changeMetaTags = this.changeMetaTags.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeImgURL = this.changeImgURL.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.changeVideoSRC = this.changeVideoSRC.bind(this)
        this.uploadPost = this.uploadPost.bind(this)
        this.reloadPost = this.reloadPost.bind(this)
    }

    deletePost(e){
        let key = e.currentTarget.dataset.value
        var k = ""
        firebase.database().ref("posts").orderByChild("titleForURL").once("child_added", snap => {
            k = snap.key
        }).then(() => {
            firebase.database().ref(`posts/${k}`).set({})
            .then(() => alert("Borrado"))
            .catch(err => console.log(err.message, "Error"))
        }).catch(err => console.log("Error", err.message))
    }
    editPost(e){
        this.setState({
            postToEdit: e.target.value
        })
        console.log(this.state.postToEdit)
    }

    newPost(e){
        let postEdited = Object.assign({}, this.state.postEdited); 
        postEdited.html = e.target.value
        this.setState({postEdited});
        console.log(postEdited, "Changed")
      }
      changeMetaTags(e){
        let postEdited = Object.assign({}, this.state.postEdited); 
        postEdited.metatags = e.target.value
        this.setState({postEdited})
        console.log(postEdited, "MetaTags")
      }
      changeTitle(e){
        let postEdited = Object.assign({}, this.state.postEdited); 
        var val = e.target.value
        postEdited.title = eliminarDiacriticos(val)
        this.setState({postEdited})
        console.log(postEdited, "Title Changed")
      }
      changeImgURL(e){
        let postEdited = Object.assign({}, this.state.postEdited); 
        var val = e.target.value
        postEdited.imgURL = val
        this.setState({post})
        console.log(post, "imgURL Changed")
      }
      changeDate(e){
        let postEdited = Object.assign({}, this.state.postEdited); 
        var val = e.target.value
        postEdited.date = val
        this.setState({postEdited})
        console.log(postEdited, "Date Changed")
      }
      changeVideoSRC(e){
        let postEdited = Object.assign({}, this.state.postEdited); 
        var val = e.target.value
        postEdited.video = getURLOutOfEmbbed(val)
        this.setState({postEdited})
        console.log(postEdited, "video Changed")
      }
      changeAutocomplete(e){
        this.setState({
          Autocomplete: e.target.value
        })
        console.log(this.state.Autocomplete)
      }
      reloadPost(e){
          firebase.database().ref(`posts`).orderByChild("titleForURL").equalTo(e.currentTarget.dataset.key).once("child_added", snap => {
              this.setState({
                  post: snap.val()
              })
          }).then(() => console.log(this.state.postEdited))
          .catch(err => console.log(err.message+ "\nsomething happened"))
      }
      uploadPost(e){
        let html = this.state.postEdited.html
        let title = this.state.postEdited.title
        let titleForURL = title.replace(/ /g, "-")
        let metatags = this.state.postEdited.metatags
        let date = this.state.postEdited.date
        let imgURL = this.state.postEdited.imgURL
        let video = this.state.postEdited.video
        console.log(html, title)
        firebase.database().ref("posts").push({
          title: title,
          html: html,
          metatags: metatags,
          titleForURL: titleForURL,
          date: date,
          imgURL: imgURL,
          video: video
        }).then((res) => {
          console.log(this.state.postEdited.html, "Alright")
          alert("Posteado")
        }).catch((err) => {
            alert(err.message + "Error")
        })
      }

    render(props){
        return (
            <div>
                <div className="container">
                    <table>
                        <tr>
                            <th>Titulo</th>
                            <th>Fecha</th>
                            <th>URL</th>
                        </tr>
                        {
                            this.props.posts.map((p, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{p.title}</td>
                                        <td>{p.date}</td>
                                        <td><a href={"https://harvymosquera.co/blog/"+p.titleForURL}>{p.titleForURL}</a></td>
                                        <td><a className="red-text" id={p.i} data-value={p.titleForURL} href="#" onClick={this.deletePost}><i className="material-icons">delete</i></a></td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    {/*<h4>Eitar Post</h4>
                    <input className="center" onChange={this.editPost} value={this.state.postToEdit}/><i className="material-icons">edit</i>
                    <button className="btn hoverable waves center" data-key={this.state.postToEdit} onClick={this.reloadPost}>Buscar</button>*/}
                </div>
            </div>
        )
    }
}


function FormatForPost(props){
    return (
      <div className="container">
        <div className="MarkdownEditor">
            <h3>Input</h3>
            <label htmlFor="markdown-content">
              Enter some markdown
            </label>
            <label htmlFor="title-of-markdown">
              Enter the title
            </label>
            <input id="title-of-markdown" onChange={props.changeTitle} defaultValue={props.title} value={props.title}/>
            <label htmlFor="metatags-of-markdown">
              Enter MetaTags separed by comas
            </label>
            <input id="metatags-of-markdown" onChange={props.changeMetaTags} defaultValue={props.metaTags} value={props.metaTags}/>
            <textarea className="textarea blog-post" 
              id="markdown-content"
              onChange={props.function}
            >{() => {
                console.log(props.source)
                setInterval(function(){
                    return props.source
                }, 2000)
            }}</textarea>
            <input onChange={props.changeDate}/>
            <input onChange={props.changeImgURL} placeholder="Url de la Imagen" value={props.imgURL}/>
            <input onChange={props.changeVideo} placeholder="Url del video" value={props.video}/>
            <button className="btn hoverable waves-light center" onClick={props.sendToDB} >Enviar Post</button><br/>
            <span className="tags">{props.metaTags}</span>
            <img src={props.imgURL} />
            <MarkDown source={props.source}/>
            <iframe width="100%" src={props.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <span className="colored right bold">{props.date}</span>
        </div>
      </div>
    )
  }



var today = ""
var month = ""
var month_day = ""
var dates = ""
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
    today = mm + '/' + dd + '/' + yyyy;
    month = mm;
    month_day = `${mm}-${dd}`
    dates = {
        today,
        month,
        month_day
    }
    return dates
}

function getURLOutOfEmbbed(url) {
    let u = url.lastIndexOf("/")+1
    let whole = url.slice(u, url.length)
    let youtubeLink = "https://www.youtube.com/embed/"
    return youtubeLink + whole
}
function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }
export default Edit