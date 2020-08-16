import React, { Component, useEffect, useState, useReducer } from 'react';
import firebase from 'firebase';
import {SideNav, SideNavItem, Slider, Slide, Caption} from 'react-materialize';
import MarkDown from "react-remarkable"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from "material-ui/AutoComplete"
// import MyEditor from "./MyEditor"
import Participant from "./Participant"
import Judge from "./Judge"


class ParticipantsHandler extends Component{
    render(props){
        return (
            <div className="mini mini-m">
                <h4>{props.contestName}</h4>
                <table className="highlight table participants-judges-table participants">
                    <thead>
                        <th>Name</th>
                        <th>School</th>
                        <th>Av. Score</th>
                        <th className="hide-on-med-and-up">Vote</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.name}</td>
                            <td>{props.group}</td>
                            <td>{props.score}</td>
                            <td><a href="#vote-con-mobile" data-target="modal-vote-con" className="btn modal-trigger button-desktop-vote" onClick={() => {
                                this.setState({
                                    uid: props.uid
                                })
                            }}><i className="material-icons">person</i></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
class Nav extends Component{
    componentDidMount(){
        InitializeAll()
    }
    render(props){
        return(
                <div className="navbar-fixed">
                    <nav className="nav not-animated">
                    <div className="nav-wrapper">
                        <ul className="left">
                        <li>
                            <a href={this.props.index} className="colored"> <span className="bold">myvote | Project Your Ideas</span></a>
                        </li>
                        </ul>
                        <ul className="right">
                            <li><a href={this.props.index} className="colored"><i className="material-icons">home</i></a></li>
                            <li><a href={this.props.posts} className="colored">Blog</a></li>
                            <li><a href={this.props.about} className="colored">Acerca De</a></li>
                        </ul>
                    </div>
                    </nav>
                </div>
        )
    }
}

class HeaderForMobile extends Component{
    render(props){
        return (
            <header>
                <div className="navbar-fixed">
                    <nav className="nav not-animated">
                    <div className="nav-wrapper">
                        <ul className="left">
                        <li>
                            <a href={this.props.index} className="colored"> <span className="bold">myvote | Project Your Ideas</span></a>
                        </li>
                        </ul>
                        <ul className="right">
                        <Side user={this.props.user} loggedIn={this.props.loggedIn} login={this.props.login} logout={this.props.logout}/>
                        </ul>
                    </div>
                    </nav>
                </div>
            </header>
        )
    }
}

class Side extends Component{
    render(props){
        return(
            <div>
                <SideNav trigger={<a ><i className="material-icons">menu</i></a>} options={{closeOnClick: true}}>
                
                <a href="/" className="colored center title-sidenav"><h5 className="colored">myvote, Project Your Ideas</h5></a>
                <SideNavItem divider className="no-margin divider"/>
                <SideNavItem href="/" icon="home">
                Home
                </SideNavItem>
                <SideNavItem href="/blog" icon="cloud">
                Blog
                </SideNavItem>
                <SideNavItem href="/acercaDe" icon="person">
                Acerca De
                </SideNavItem>
                <SideNavItem divider />
                </SideNav>
            </div>
        )
    }
}


class Footer extends Component{
    render(){
        return (
            <footer className="row footer center">
                <div className="col s12 m4">
                <div className="info">
                    <h5>Contacto</h5>
                    <ul>
                        <li><a href="tel:3137307365">3137307365</a></li>
                        <li><a href="tel:3116263711">3116263711</a></li>
                    </ul>
                </div>  
                </div>
                <div className="col s12 m4 center">
                <h5>Dirección</h5>
                <ul>
                    <li>Edificio Plaza San Fernando: Oficina 217</li>
                </ul>
                <div className="map center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1293.0899858399412!2d-76.54567757374082!3d3.4280138418420076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x164a5706d1525386!2sSan+Fernando+Plaza+building!5e0!3m2!1sen!2sco!4v1557616652336!5m2!1sen!2sco" allowfullscreen></iframe>
                </div>
                </div>
                <div className="col s12 m4">
                    <h5>Dejanos tu informacion</h5>
                    <form>
                    <div className="input-field">
                        <input type="text" id="form-name" />
                        <label for="form-name">Nombre</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="form-phone-number" />
                        <label for="form-phone-number">Teléfono</label>
                    </div>
                    <button className="btn hoverable waves-effect">Enviar</button>
                    </form>
                </div>
            </footer>
        )
    }
}

class WhereTo extends Component{
    constructor(){
        super()
        this.state = {
            page: window.location.pathname
        }
        this.title = this.title.bind(this)
    }

    title(){
        
    }
    render(){
        return(
            <div className="main-title white-text">
                <h1 clasName="bold white-text">
                    {
                        (this.state.page.substring((this.state.page).lastIndexOf("/")+1) == "blog") ? 
                            <h1>myvote | Blog</h1>
                        : null
                    }
                </h1>
            </div>
        )
    }
}


class SocialMedia extends Component{
   render(props){
        return (
            <div className={this.props.classes}>
                <ul>
                    <li>
                        <div className="fb-share-button" data-href={this.props.URL} data-layout="box_count" data-size="small"><a target="_blank" href={this.props.URL} className="fb-xfbml-parse-ignore">Compartir</a></div>
                    </li>
                    <li>
                    <a href={'https://twitter.com/intent/tweet?text=myvote, Project Your Ideas '+this.props.postTitle+" "+ this.props.URL}
                    className="twitter-share-button" data-show-count="false">
                        Tweet
                    </a>
                    </li>
                </ul>
        </div>
        )
   }
}

class TwitterEmbbed extends Component{
    render(props){
        return (
            <div className={this.props.classes}>
                <a className="twitter-timeline" 
                data-chrome="nofooter noborders" 
                data-height={this.props.height}
                href={"https://twitter.com/"+this.props.user+"?ref_src=twsrc%5Etfw"}>Tweets by {this.props.user}</a>
            </div>
        )
    }
}

class FacebookPage extends Component{
    render(props){
        return (
            <div className={`fb-page ${this.props.classes}`} data-href="https://www.facebook.com/Harvy-Mosquera-Todos-por-Cali-193290967379196/" data-tabs="timeline" data-width="400" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-height={this.props.height}><blockquote cite="https://www.facebook.com/Harvy-Mosquera-Todos-por-Cali-193290967379196/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Harvy-Mosquera-Todos-por-Cali-193290967379196/">myvote - Todos por Cali</a></blockquote></div>
        )
    }
}

class WhatWeveDone extends Component{
    constructor(){
        super()
        this.state = {
            darken: false
        }
    }
    render(props){
        return (
            <Slider>
                <Slide image={<img src="https://i.ibb.co/tqsmqc0/4.png" className="darken-img"/>}>
                    <Caption>
                        <h3>
                        Project Your Ideas
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                        Sumando Esfuerzos 
                        Por una Cali Segura
                        </h5>
                    </Caption>
                </Slide>
                <Slide image={<img src="https://i.ibb.co/CWcw91T/6.png" className="darken-img" onMouseOver={this.changeDarkenForImg}/>}>
                    <Caption placement="left">
                        <h3>
                        Project Your Ideas
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                        Celebramos el Día de la Afrocolombianidad con gran Esperanza
                        Soñamos una Cali segura, #lncluyente y Próspera
                        </h5>
                    </Caption>
                </Slide>
                <Slide image={<img src="https://i.ibb.co/gDQ55Qr/addedOne.jpg" className="darken-img" onMouseOver={this.changeDarkenForImg}/>}>
                    <Caption placement="right">
                        <h3>
                            Project Your Ideas
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                        Por una Cali <span className="bold">Prospera, Incluyente y Segura</span>
                        </h5>
                    </Caption>
                </Slide>
                <Slide image={<img src="https://i.ibb.co/z77CpN6/1.png" className="darken-img" onMouseOver={this.changeDarkenForImg}/>}>
                    <Caption placement="left">
                        <h5 className="light grey-text text-lighten-3">
                            para avanzar en la construcción de una 
                            Cali más Segura, Incluyente y Próspera.
                        </h5>
                    </Caption>
                </Slide>
            </Slider>
        )
    }
}

class Info extends Component{
    render(props){
        return (
            <div className="col s12">
                <div className="white info-main">
                    <h3 className="title">¡myvote!</h3>
                    <p>
                        Concejal 2012 - 2015, ExDirector INPEC Regional Occidente, Gestor Social, Docente Universitario, Administrador de Empresas. <br/> <br/>
                        <span className="colored bold">Project Your Ideas</span>
                    </p>
                    
                    <a className="btn hoverable waves center white orange-text" href="/acercaDe">Sobre Nosotros</a>
                </div>
            </div>
        )
    }
}

class About extends Component{
    render(props){
        return (
            <div className={"card info-about " + this.props.classes}>
                <div className="card-image">
                    <img src="./assets/logo-myvote.png"/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <h3>myvote Mission</h3><br/>
                        <p>myvote mission is to embrace any kind of enterprenourship led by any kind of agent, letting them store their whole projects on a platform that will point big brands and potential investors to them.</p>
                    </div>
                    <div className="card-action">
                        <a href="https://www.facebook.com/pages/category/Politician/Harvy-Mosquera-Todos-por-Cali-193290967379196/">Facebook</a>
                        <a href="https://twitter.com/HARVYMOSQUERA">Twitter</a>
                    </div>
                </div>
            </div>
        )
    }
}

class ItemCardToShow extends Component{
    render(props){
        return(
        <div className={"card card-item " + this.props.classes}>
                <div className="card-image">
                    <img src={this.props.imgSrc}/>
                </div>
                <div className="card-stacked">
                    <h5>{this.props.title}</h5><br/>
                    <div className="card-content">
                        <p>{this.props.description}</p>
                    </div>
                    <div className="card-action">
                        <a href="https://www.facebook.com/pages/category/Politician/Harvy-Mosquera-Todos-por-Cali-193290967379196/">Facebook</a>
                        <a href="https://twitter.com/HARVYMOSQUERA">Twitter</a>
                    </div>
                </div>
            </div>
        )
    }
}

class MainNav extends Component{
    render(props){
        return (
            <div className="navbar-fixed">
             <nav className="nav nav-animated">
                <div className="nav-wrapper">
                    <ul className="left">
                    <li>
                        <a href="#!"> <span className="bold">myvote | Project Your Ideas</span></a>
                    </li>
                    </ul>
                    <ul className="right">
                    <li><a href={this.props.index}><i className="material-icons">home</i></a></li>
                    <li><a href={this.props.blog}>Blog</a></li>
                    <li><a href={this.props.about}>Acerca De</a></li>
                    </ul>
                </div>
            </nav>
          </div>
        )
    }
}

class AutocompleteCustomed extends Component{
    componentWillMount(){
        firebase.database().ref("posts").on("child_added", snap => {      
            this.setState({
                all: this.state.all.concat(snap.val())
            })
        })
    }
    constructor(){
        super()
        this.state = {
            all: []
        }
        this.toJson = this.toJson.bind(this)
    }
    render(props){
        const dataSourceConfig = {
            text: 'textKey',
            value: 'valueKey',
          };
        console.log(this.toJson(this.state.all))
        return (
            <MuiThemeProvider>
            <div className={this.props.classes}>
                 <div className="row">
                 <AutoComplete
                    hintText="Buscar"
                    openOnFocus={true}
                    dataSource={this.toJson(this.state.all)}
                    dataSourceConfig={dataSourceConfig}
                    onNewRequest={(chosenRequest, index) => window.location.href = chosenRequest.valueKey}
                    filter={AutoComplete.fuzzyFilter}
                    maxSearchResults={5}
                    />
                </div>
            </div>
            </MuiThemeProvider>
        )
    }

    toJson(array){
        var a = []
        array.map((e, i) => {
            a.push({textKey: e.title, valueKey: `https://myvotei.web.app/blog/${e.titleForURL}`})
        })
        return a
    }
}

class Objective extends Component{
    render(props){
        return (
            <div className="s12 main-name">
                <span className="line-left line"></span><h1 className="first-title colored">myvote - Project Your Ideas</h1><span className="line-right line"></span>
                <h1 className="first-subtitle">Por una Cali <span className="bold">Segura, Incluyente y Prospera</span></h1>
            </div>
        )
    }
}


class SliderMini extends Component{
    render(props){
        return (
            <div className="c-slider">
       		<div className="slider">
	            <section className="jquery-responsive">
	               	<img src="https://i.ibb.co/7WszS1p/1.png" alt="Imagen"/>
                    <div className="caption slider-caption">
                        <h5>Hola</h5>
                        <p>Hola un subtitulo de myvote, Cali segura, incluyente y prospera</p>
                    </div>
                    <div className="description">
                        <h3>"Los Jovenes..."</h3>
                        <p className="bold">Los Jóvenes requieren Políticas Públicas pertinentes que faciliten su desarrollo Académico y Laboral.
                        En el Concejo Municipal 2020-2023 será nuestra prioridad.</p>
                    </div>
	            </section>

	           	 <section className="jquery-responsive">
	            	 <img src="https://i.ibb.co/8DjGM3N/5.png" alt="Imagen"/>
                    <div className="caption slider-caption">
                        <h5>Hola</h5>
                        <p>Hola un subtitulo de myvote, Cali segura, incluyente y prospera</p>
                    </div>
                    <div className="description">
                        <h3>"Avanzamos..."</h3>
                        <p className="bold">Avanzamos en la construcción de una Cali Segura, Incluyente y Próspera.</p>
                    </div>
	             </section>

	             <section className="jquery-responsive">
	            	 <img src="https://i.ibb.co/z77CpN6/1.png" alt="Imagen"/>
                    <div className="caption slider-caption">
                        <h5>Hola</h5>
                        <p>Hola un subtitulo de myvote, Cali segura, incluyente y prospera</p>
                    </div>
                    <div className="description">
                        <h3>"Por..."</h3>
                        <p className="bold">Por una Cultura Ciudadana soportada en Valores.</p>
                    </div>
	             </section>

	             <section className="jquery-responsive">
	             	 <img src="https://i.ibb.co/tqsmqc0/4.png" alt="Imagen"/>
                    <div className="caption slider-caption">
                        <h5>Hola</h5>
                        <p>Hola un subtitulo de myvote, Cali segura, incluyente y prospera</p>
                    </div>
                    <div className="description">
                        <h3>"Transparencia..."</h3>
                        <p className="bold">Constancia y Transparencia en Nuestra Gestión Social y Administrativa.</p>
                    </div>
	             </section>
        	</div>
		</div>
        )
    }
}

class Subscribe extends Component{
    render(props){
        return(
            <div className="col s12 m4">
                <h5>Dejanos tu informacion</h5>
                <form>
                <div className="input-field">
                    <input type="text" id="form-name" />
                    <label for="form-name">Nombre</label>
                </div>
                <div className="input-field">
                    <input type="text" id="form-phone-number" />
                    <label for="form-phone-number">Teléfono</label>
                </div>
                <button className="btn hoverable waves-effect">Enviar</button>
                </form>
            </div>
        )
    }
}

class Entries extends Component{
    render(props){
        function replaceUnnecessary(el, first, second){
            var all = el.html
            var start = all.indexOf(first)
            var finish = all.indexOf(second, start)
            var whole = (all.slice(0, start) + all.slice(finish, all.length+1)).replace(/#/g, "")
            return whole.slice(0, 100) + "..."
        }
        return (
            <div className="flex-always posts-to-adv">
                {
                    this.props.posts.slice(0, 3).map(p => {
                        return (
                            <a className="post-to-adv" href={"https://myvotei.web.app/blog"+p.titleForURL}>
                            <div className="card">
                            <div className="card-image">
                                <img src={p.imgURL}/>
                                </div>
                                <div className="card-content">
                                <h1 className="first-title">{p.title}</h1>
                                <p>{
                                    p.html
                                    }</p>
                                </div>
                                <div className="card-action">
                                <a href="#">This is a link</a>
                            </div>
                            </div>
                        </a>
                        )
                    })
                }
            </div>
        )
    }
}

class Comments extends Component{
    componentWillMount(){
        const postURL = this.state.page
        firebase.database().ref("comments").orderByChild("titleForURL").equalTo(postURL).on("child_added", snap => {
            this.setState({
                comments: this.state.comments.concat(snap.val())    
            })
            console.log(snap.val())
        })
    }
    constructor(){
        super()
        this.state = {
            comments: [],
            page: eliminarDiacriticos((window.location.pathname).substring((window.location.pathname).lastIndexOf('/')+1)),
        }
    }
    render(props){
        return (
            <div className={this.props.classes}>
                <div className="comments">
                <MyEditor
                button={true}
                buttonValue="Enviar Comentario"
                send={this.props.send}
                onChangedMarkdown={this.props.onChangedMarkdown}
                onFocus={this.props.onFocus}
                />
                    <div className="all-comments">
                    {
                        this.state.comments.map((el, i) => {
                            return (
                                <Comment 
                                displayImg={el.displayImg}
                                displayName={el.user}
                                html={el.html}
                                />
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

class Comment extends Component {
    render(props){
        return(
            <article className="comment">
                <div className="user-info flex-always">
                    <div className="user-img">
                        <img src={this.props.displayImg} alt={this.props.displayName} className="circle responsive-img"/>
                    </div>
                    <div className="username">
                        <h5>{this.props.displayName}</h5>
                    </div>
                </div>
                <div className="markdown">
                    <MarkDown source={this.props.html}/>
                </div>
            </article> 
        )
    }
}

class SearchBar extends Component{
    render(props){
        return(
            this.state.page == "/blog" && window.innerWidth < 600 ? <AutocompleteCustomed classes="search-bar" data={this.state.data} function={this.changeAutocomplete} search={() => {
                this.autoCompletePostsName(this.state.posts)
            }}/> : null
        )
    }
}



class LastProjects extends Component{
    componentWillMount(){
        firebase.database().ref("projects").limitToFirst(this.state.limit).orderByChild(this.state.orderBy).on("child_added", snapshot => {
            this.setState({
                projects: this.state.projects.concat(snapshot.val())})
        })
    }
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            limit: this.props.limit,
            orderBy: this.props.orderBy,
            title: this.props.title,
            subtitle: this.props.subtitle
        }
    }
    render(props){
        return(
            <div className="projects-container">
                <div className="projects-con">
                    <div className="projects-info">
                        <span className="sub-wide-bar last-tree-projects">{this.state.title}</span><a href="#last-projects">{this.state.subtitle}</a>
                    </div>  
                    <div className="projects">
                        {   
                            this.state.projects.map((t, i) => {
                                return <Projects key={i} name={t.name} description={t.description} img={t.img} by={t.by} owner={t.owner}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class MainProjects extends Component{
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            limit: this.props.limit,
            orderBy: this.props.orderBy,
            title: this.props.title,
            subtitle: this.props.subtitle
        }
    }
    componentWillMount(){
        firebase.database().ref("projects").limitToFirst(this.state.limit).orderByChild(this.state.orderBy).on("child_added", snapshot => {
            this.setState({
                projects: this.state.projects.concat(snapshot.val())})
        })
    }

    render(props){
        return (
            <div className="main-project">
                <span className="sub-wide-bar">{this.state.title}</span>
                {   
                    this.state.projects.map((t, i) => {
                        return <Projects key={i} name={t.name} description={t.description} img={t.img} by={t.by} owner={t.owner}/>
                    })
                }
            </div>
        )
    }

}

function Main(props){
    const [state, setState] = useState({
        form: props.form,
        info: props.info,
        personalCode: "",
        user: {},
        activeInfo: false,
        activeForm: true,
        groupInfo: {},
        contestInfo: []
    })
    const handleAuth = (e) => {
        e.preventDefault()
        firebase.database().ref(`users`).orderByChild("code").equalTo(parseInt(state.personalCode)).once("value").then(snap => {
            if(snap.val()){
                let key = Object.keys(snap.val())[0]
                setState({
                    user: snap.val()[key],
                    activeInfo: true,
                    activeForm: false
                })
            }else{
                alert("El codigo no existe")
            }
        }).catch(err => console.log(err.message))
    }

    const changeString = (ev) => {
        ev.preventDefault()
        setState(
            Object.assign(state, {
                personalCode: ev.target.value
            })
        )
    }
    
    return (
        <div>
            <div className="container">
                <form className={"form-login-container" + ` ${state.activeForm}`} onSubmit={handleAuth} method="post">
                    <h3 className="center">Inicia Sesión</h3>
                    <div className="form-login">
                    <input  placeholder="Type here your personal code" onChange={changeString}/>
                    <input type="submit" className="btn hoverable waves-light btn-form" value="Login"/>
                    </div>
                </form>
            </div>
            {state.activeInfo ? <ShowPerCategory state={state}/> : ""}
        </div>
    )
}

function ShowPerCategory(props){
    if(props.state.user.rol == 3){
        return <Participant user={props.state.user} {...props.state.user} {...props.state.contestInfo}/> 
    }else if(props.state.user.rol == 4){
        return <Participant user={props.state.user} {...props.state.user} {...props.state.contestInfo}/> 
    }else if(props.state.user.rol == 2){
        return <Judge user={props.state.user} {...props.state.user} {...props.state.contestInfo}/> 
    }
}

function Projects(props){
    return(
        <div className="project" key={props.key}>
            <img src={props.img} className="img img-project"/>
            <div className="project-info">
                <h4>{props.name}</h4>
                <p>{props.description}</p>
                <span><a className="grey-text by project-by" href={props.owner}>{props.by}</a></span>
            </div>
        </div>
    )
}
function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}
function InitializeAll(){
    var dropdown = document.getElementsByClassName('dropdown-trigger');
    M.AutoInit()
}
export {Main, ParticipantsHandler, MainProjects, LastProjects, Comments, Entries, Objective, FacebookPage, SliderMini, AutocompleteCustomed, ItemCardToShow, About, MainNav, WhatWeveDone, Info, HeaderForMobile, TwitterEmbbed, SocialMedia, WhereTo, Nav, Footer}