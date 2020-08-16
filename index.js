import * as functions from 'firebase-functions';
import React from 'react'
import {renderToNodeStream } from "react-dom/server"
import App from "./src/App"
import express from "express"
import fs from "fs"
import firebase from 'firebase-admin'
import Projects from './src/Projects'
import Admin from "./src/Admin"
import Participant from "./src/Participant"

date()
console.log(date())
var month_day = ""
var today = ""
var month = ""
var dates = {}

firebase.initializeApp()


const index = fs.readFileSync(__dirname + "/index.html", "utf8")
const projects = fs.readFileSync(__dirname + "/projects.html", "utf8")
const projectHtml = fs.readFileSync(__dirname + "/project.html", "utf8")
const admin = fs.readFileSync(__dirname + "/admin.html", "utf8")
const acercaDe = fs.readFileSync(__dirname + "/acercaDe.html", "utf8")
const app = express()

app.get('/', (req, res) => {//** is used to get every single request to the server
	const html = renderToNodeStream(<App />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");// Ten seconds stores in the CDN so that when a user hits the page other users will download it directly from the CDN
	const finalHtml = index.replace("<!-- App -->", html)
	res.send(finalHtml);
})

app.get("/projects", (req, res) => {
	const html = renderToNodeStream(<Projects />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = projects.replace("<!-- App -->", html)
	res.send(finalHtml);
})
app.get("/admin", (req, res) => {
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const html = renderToNodeStream(<Admin/>)
	const finalHtml = admin.replace("<!-- App -->", html)
	res.send(finalHtml)
})

/*
app.get("/trees", (req, res) => {
	const treeHtml = renderToNodeStream(<Trees />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = index.replace("<!-- App -->", treeHtml)
	res.send(finalHtml);
})
/*
app.use('/tree/:code', indexRoute, (req, res, next) => {
	let code = req.params.code
	requestForTree(code).then(tree => {
		res.send(tree.val())
	}).catch(err => res.send(err.message + "there was an error"))
})

app.use('/post/:title', indexRoute, (req, res, next) => {
	const html = renderToNodeStream(<Post />)
	let title = req.params.title
	const finalHtml = post.replace("<!-- Post -->", html)
	requestForPost(title).then(post => {
		//let key = Object.keys(post.val())
		res.send(finalHtml)
	}).catch(err => res.send(`there was an error ${err.message}`))
})
*/

app.get("/acercaDe", (req, res) => {
	const html = renderToNodeStream(<AcercaDe />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = acercaDe.replace("<!-- acercaDe -->", html)
	res.send(finalHtml);
})


app.route("/project/:projectid").get((req, res) => {
	res.write(projectHtml)
	let projectid = req.params.projectid
	var completeHtml
	requestForProject(projectid).then(project => {
		let key = Object.keys(project.val())
		let metaTags = project.val()[key].name
		let description = project.val()[key].name
		let imgURL = project.val()[key].img
		completeHtml = projectHtml.replace("<!-- Change this for metatags -->", `<meta name='keywords' content='${metaTags}'/>
																		<meta name='description' content='${description}'/>
																		<title>linki | ${description}</title>
																		<meta property="og:type" content="website" />
																		<meta property="og:url" content="https://linkii.web.app/blog/${project.val()[key].name}"/>
																		<meta property="og:image" content=${imgURL} />
																		<meta property="og:image:width" content="200" />
																		<meta property="og:image:height" content="200" />
																		<meta property="og:title" content="linki | ${description}" />
																		<meta property="og:description" content="${description}"/>
																		<link rel="canonical" href="https://linkii.web.app/blog/${project.val()[key].name}">
											`)
		res.set("Cache-Control", "public, max-age=600, s-maxage=1200")
		let html = renderToNodeStream(<Project project={project.val()} />)
		completeHtml = completeHtml.replace("<!-- App -->", html)
		res.write(completeHtml)
	}).catch(err => res.send(`Error <br/> ${err.message}`))
	res.end()
})


/*
app.get("/blog/:title", (req, res) => {
	const html = renderToNodeStream(<Post />)
	const s = post.replace("<!-- Post -->", html)
	let title = req.params.title
	requestForPost(title).then(post => {
		let key = Object.keys(post.val())
		res.send(s)
	}).catch(err => res.send(`there was an error ${err.message}`))
})
*/
function requestForProject(projectid){
	let ref = firebase.database().ref("projects").orderByChild("projectid").equalTo(projectid)
		try {
		return ref.once("value");
	}
	catch (e) {
		console.log(e.message + "Error");
	}
		
		/*html = (snap.val()) ? `
				<div class="tree" key="${snap.val().code}">
				<div class="img-container">
					<img src="${snap.val().img}" class="materialboxed"/>
				</div>
				<div class="description">
					<h1 class="title">${snap.val().name}</h1>
					<p>${snap.val().description}</p>
					<a href="" class="btn waves hoverable waves-effect green">Ordenar</a>
				</div>
			</div>
		` : ""*/
}

/*
app.all('/tree/:code', (req, res) => {
	const link = index.replace('<link href="styles.css" rel="stylesheet">', '<link href="../styles.css" rel="stylesheet">')
	const script = index.replace('<script type="text/javaScript" src="client_bundle.js"></script>', '<script type="text/javaScript" src="../client_bundle.js"></script>')
	res.write(link)
	res.write(script)
	res.end()
})
*/


app.get("/sitemap.txt", (req, res) => {
	res.set('Cache-Control: no-cache');
	var ready = false;
	res.write("https://linkii.web.app\n")
	res.write("https://linkii.web.app/blog\n")
	res.write("https://linkii.web.app/acercaDe\n")
	firebase.database().ref("posts").once("value").then(snap => {
		let keys = Object.keys(snap.val())
		for(var i = 0; i <= keys.length; i++){
				var k = keys[i]
			/*all += `
				<url>
					<loc>https://linkii.web.app/${snap.val().titleForURL}</loc>
					<lastmod>${date().today}</lastmod>
				</url>
			`
		
			res.write(all)
			res.end()*/
			res.write(`
				https://linkii.web.app/blog/${k ? snap.val()[k].titleForURL : ""}\n
			`)
			ready = true;
		}
	})
	setInterval(function(){
		if(ready){
			res.end()
		}else{
			console.log("Loading")
		}
	}, 1000)
	
})



function loginWithFirebase(email, pass){
	admin.auth().getUser(uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data:', userRecord.toJSON());
  })
  .catch(function(error) {
    console.log('Error fetching user data:', error);
  });
}

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

export let ssrapp = functions.https.onRequest(app)