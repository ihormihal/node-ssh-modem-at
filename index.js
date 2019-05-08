"use strict"
const http = require('http')
const nodeStatic = require('node-static')
const pkg = require('./package.json')
const utils = require('./api/utils')
const cells = require('./api/cells')
const node_ssh = require('node-ssh')
const ssh = new node_ssh()

const delay = (timeout, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data || {ok: true, data: null })
        }, timeout || 0)
    })
}

let out = {
    code: 0,
    signal: undefined,
    stdout: '',
    stderr: 'AT^MONSC\n\n\n^MONSC: WCDMA,255,06,10612,149,1001,1001,-73,-63,-10,6,34014\n\n\n\nOK'
}

const routes = {
    connectHost(credentials) {
        return delay(500)
        // return ssh.connect(credentials)
        //     .then((res) => 'CONNECTED')
    },
    getInfo() {
        return delay(500, {
            ok: true,
            data: utils.parseMONSC(out.stderr)
        })
        return ssh.execCommand('ls')
    },
    getCells(filter) {
        return cells.getCells(filter)
    }
}







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
        else if(/^\/api\/info/.test(request.url)){
            routes.getInfo()
                .then((res) => {
                    writeResponse(res)
                })
                .catch((err) => {
                    writeResponse(err, true)
                })
        }
        else if(/^\/api\/cells/.test(request.url)){
            routes.getCells(body)
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