"use strict"

const http = require('http')
const nodeStatic = require('node-static')
const pkg = require('./package.json')
const routes = require('./api/routes')

const apiRequest = (request, response) => {

    const writeResponse = (data, isError) => {
        response.writeHead(isError ? 500 : 200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(data), 'utf-8')
    }

    let tmp = []
    let body
    request.on('data', chunk => {
        tmp.push(chunk)
    });
    request.on('end', () => {
        if(tmp.length) body = JSON.parse(tmp)
        
        if(/^\/api\/connect/.test(request.url)){
            routes.connectHost(body)
                .then((res) => {
                    writeResponse(res)
                })
                .catch((err) => {
                    writeResponse(err, true)
                })
        }

        else if(/^\/api\/cell\/current/.test(request.url)){
            routes.getCurrentCell()
                .then((res) => {
                    writeResponse(res)
                })
                .catch((err) => {
                    writeResponse(err, true)
                })
        }

        else if(/^\/api\/cell\/nearby/.test(request.url)){
            routes.getNearbyCells()
                .then((res) => {
                    writeResponse(res)
                })
                .catch((err) => {
                    writeResponse(err, true)
                })
        }
    })
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