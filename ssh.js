const node_ssh = require('node-ssh')
const utils = require('./api/utils')
const ssh = new node_ssh()

let monsc = "chat -V -t 5 'ABORT' 'ERROR' 'ABORT' 'NO CARRIER' '' 'AT\\^MONNC' 'OK' > /dev/ttyUSB0 < /dev/ttyUSB0"

let res = 'AT^MONNC\n\n\n^MONNC: WCDMA,10612,42,-79,-13\n\n^MONNC: WCDMA,10612,503,-82,-16\n\n^MONNC: WCDMA,10612,157,-85,-19\n\n\n\nOK'

console.log(utils.parseMONNC(res))
/*ssh.connect({
    host: "192.168.1.1",
    username: 'root',
    password: '1989'
})
.then(() => {
    return ssh.execCommand(monsc)
})
.then((res) => {
    console.log(res)
    return utils.parseMONSC(res.stderr)
})
.then((result) => {
    console.log('RESULT')
    console.log(result)
})
.catch((err) => {
    console.log('ERROR')
    console.log(err)
})*/

// let info = { 
//     code: 0,
//     signal: undefined,
//     stdout: '',
//     stderr: 'AT^MONSC\n\n\n^MONSC: WCDMA,255,06,10612,149,47B7E57,3459,-73,-63,-10,6,34014\n\n\n\nOK'
// }