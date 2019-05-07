"use strict"
const http = require('http')
const nodeStatic = require('node-static')
const pkg = require('./package.json')

let info = { 
    code: 0,
    signal: undefined,
    stdout: '',
    stderr: 'AT^MONSC\n\n\n^MONSC: WCDMA,255,06,10612,149,47B7E57,3459,-73,-63,-10,6,34014\n\n\n\nOK'
}

const routes = {
    connectHost(credentials) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ok: true, data: credentials})
            }, 2000)
        })
    },
    getInfo() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ok: true, data: info})
            }, 1000)
        })
    }
}

const apiRequest = (request, response) => {

    const writeResponse = (data) => {
        response.writeHead(200, { 'Content-Type': 'application/json' })
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
        }
        else if(/^\/api\/info/.test(request.url)){
            routes.getInfo()
                .then((res) => {
                    writeResponse(res)
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