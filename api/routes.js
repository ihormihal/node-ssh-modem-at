const utils = require('./utils')
const node_ssh = require('node-ssh')
const ssh = new node_ssh()
// const cells = require('./cells')

const delay = (timeout, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data || {ok: true, data: null })
        }, timeout || 0)
    })
}


module.exports = {
    connectHost(credentials) {
        return delay(500)
        return ssh.connect(credentials)
            .then((res) => 'CONNECTED')
    },
    getCurrentCell() {
        return delay(500, {"RAT":"WCDMA","MCC":"255","MNC":"06","ARFCN":"10612","PSC":"149","CELL_ID":"47B7E57","LAC":"3459","RSCP":"-76","RXLEV":"-65","EC_N0":"-11","DRX":"6","URA":"6"})
        let monsc = "chat -V -t 5 'ABORT' 'ERROR' 'ABORT' 'NO CARRIER' '' 'AT\\^MONSC' 'OK' > /dev/ttyUSB0 < /dev/ttyUSB0"
        return ssh.execCommand(monsc)
            .then((res) => {
                console.log(res)
                return utils.parseMONSC(res.stderr)
            })
    },
    getNearbyCells() {
        return delay(500, [{"RAT":"WCDMA","ARFCN":"10612","PSC":"42","RSCP":"-77","EC_N0":"-10"},{"RAT":"WCDMA","ARFCN":"10612","PSC":"503","RSCP":"-81","EC_N0":"-15"}])
        let monsc = "chat -V -t 5 'ABORT' 'ERROR' 'ABORT' 'NO CARRIER' '' 'AT\\^MONNC' 'OK' > /dev/ttyUSB0 < /dev/ttyUSB0"
        return ssh.execCommand(monsc)
            .then((res) => {
                console.log(res)
                return utils.parseMONNC(res.stderr)
            })
    }
}