"use strict"
const http = require('http')
const nodeStatic = require('node-static')
const pkg = require('./package.json')


const apiRequest = (request, response) => {

    let content = {
        requestUrl: request.url,
        method: request.method,
        body: request.body
    }

    if(/^\/api\/connect/.test(request.url)){
        console.log('connect')
    }
    else if(/^\/api\/info/.test(request.url)){
        console.log('info')
    }

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(content), 'utf-8')
}

var fileServer = new nodeStatic.Server('./public')
http.createServer((request, response) => {

    if(/^\/api/.test(request.url)){
        apiRequest(request, response)
    }else{
        request.addListener('end', () => {
            fileServer.serve(request, response)
        }).resume()
    }

}).listen(pkg.config.port);

console.log(`Server running at http://localhost:${pkg.config.port}`);