import express from 'express'
var indexRoute = express.Router()

indexRoute.get('/tree:/code', function(req, res, next){
	res.send(`<h1>${indexRoute.param.code}</h1>`)
	next()
})

export default indexRoute