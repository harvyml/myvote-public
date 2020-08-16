'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ssrapp = undefined;

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _App = require('./src/App');

var _App2 = _interopRequireDefault(_App);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _Projects = require('./src/Projects');

var _Projects2 = _interopRequireDefault(_Projects);

var _Admin = require('./src/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _Participant = require('./src/Participant');

var _Participant2 = _interopRequireDefault(_Participant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

date();
console.log(date());
var month_day = "";
var today = "";
var month = "";
var dates = {};

_firebaseAdmin2.default.initializeApp();

var index = _fs2.default.readFileSync(__dirname + "/index.html", "utf8");
var projects = _fs2.default.readFileSync(__dirname + "/projects.html", "utf8");
var projectHtml = _fs2.default.readFileSync(__dirname + "/project.html", "utf8");
var admin = _fs2.default.readFileSync(__dirname + "/admin.html", "utf8");
var acercaDe = _fs2.default.readFileSync(__dirname + "/acercaDe.html", "utf8");
var app = (0, _express2.default)();

app.get('/', function (req, res) {
	//** is used to get every single request to the server
	var html = (0, _server.renderToNodeStream)(_react2.default.createElement(_App2.default, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200"); // Ten seconds stores in the CDN so that when a user hits the page other users will download it directly from the CDN
	var finalHtml = index.replace("<!-- App -->", html);
	res.send(finalHtml);
});

app.get("/projects", function (req, res) {
	var html = (0, _server.renderToNodeStream)(_react2.default.createElement(_Projects2.default, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var finalHtml = projects.replace("<!-- App -->", html);
	res.send(finalHtml);
});
app.get("/admin", function (req, res) {
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var html = (0, _server.renderToNodeStream)(_react2.default.createElement(_Admin2.default, null));
	var finalHtml = admin.replace("<!-- App -->", html);
	res.send(finalHtml);
});

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

app.get("/acercaDe", function (req, res) {
	var html = (0, _server.renderToNodeStream)(_react2.default.createElement(AcercaDe, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var finalHtml = acercaDe.replace("<!-- acercaDe -->", html);
	res.send(finalHtml);
});

app.route("/project/:projectid").get(function (req, res) {
	res.write(projectHtml);
	var projectid = req.params.projectid;
	var completeHtml;
	requestForProject(projectid).then(function (project) {
		var key = Object.keys(project.val());
		var metaTags = project.val()[key].name;
		var description = project.val()[key].name;
		var imgURL = project.val()[key].img;
		completeHtml = projectHtml.replace("<!-- Change this for metatags -->", '<meta name=\'keywords\' content=\'' + metaTags + '\'/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta name=\'description\' content=\'' + description + '\'/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<title>linki | ' + description + '</title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:type" content="website" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:url" content="https://linkii.web.app/blog/' + project.val()[key].name + '"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:image" content=' + imgURL + ' />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:image:width" content="200" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:image:height" content="200" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:title" content="linki | ' + description + '" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<meta property="og:description" content="' + description + '"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<link rel="canonical" href="https://linkii.web.app/blog/' + project.val()[key].name + '">\n\t\t\t\t\t\t\t\t\t\t\t');
		res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
		var html = (0, _server.renderToNodeStream)(_react2.default.createElement(Project, { project: project.val() }));
		completeHtml = completeHtml.replace("<!-- App -->", html);
		res.write(completeHtml);
	}).catch(function (err) {
		return res.send('Error <br/> ' + err.message);
	});
	res.end();
});

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
function requestForProject(projectid) {
	var ref = _firebaseAdmin2.default.database().ref("projects").orderByChild("projectid").equalTo(projectid);
	try {
		return ref.once("value");
	} catch (e) {
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

app.get("/sitemap.txt", function (req, res) {
	res.set('Cache-Control: no-cache');
	var ready = false;
	res.write("https://linkii.web.app\n");
	res.write("https://linkii.web.app/blog\n");
	res.write("https://linkii.web.app/acercaDe\n");
	_firebaseAdmin2.default.database().ref("posts").once("value").then(function (snap) {
		var keys = Object.keys(snap.val());
		for (var i = 0; i <= keys.length; i++) {
			var k = keys[i];
			/*all += `
   	<url>
   		<loc>https://linkii.web.app/${snap.val().titleForURL}</loc>
   		<lastmod>${date().today}</lastmod>
   	</url>
   `
   			res.write(all)
   res.end()*/
			res.write('\n\t\t\t\thttps://linkii.web.app/blog/' + (k ? snap.val()[k].titleForURL : "") + '\n\n\t\t\t');
			ready = true;
		}
	});
	setInterval(function () {
		if (ready) {
			res.end();
		} else {
			console.log("Loading");
		}
	}, 1000);
});

function loginWithFirebase(email, pass) {
	admin.auth().getUser(uid).then(function (userRecord) {
		// See the UserRecord reference doc for the contents of userRecord.
		console.log('Successfully fetched user data:', userRecord.toJSON());
	}).catch(function (error) {
		console.log('Error fetching user data:', error);
	});
}

function date() {
	today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}
	today = mm + '-' + dd + '-' + yyyy;
	month = mm;
	month_day = mm + '-' + dd;
	dates = {
		today: today,
		month: month,
		month_day: month_day
	};
	return dates;
}

var ssrapp = exports.ssrapp = functions.https.onRequest(app);