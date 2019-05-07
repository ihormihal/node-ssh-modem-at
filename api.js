const node_ssh = require('node-ssh')
const ssh = new node_ssh()

let monsc = "chat -V -t 5 'ABORT' 'ERROR' 'ABORT' 'NO CARRIER' '' 'AT\\^MONSC' 'OK' > /dev/ttyUSB0 < /dev/ttyUSB0"
 
ssh.connect({
  host: '192.168.1.1',
  username: 'root',
  password: '1989'
})
.then(() => {
    return ssh.execCommand(monsc)
})
.then((result) => {
    console.log('RESULT')
    console.log(result)
})
.catch((err) => {
    console.log('ERROR')
    console.log(err)
})

let info = { 
    code: 0,
    signal: undefined,
    stdout: '',
    stderr: 'AT^MONSC\n\n\n^MONSC: WCDMA,255,06,10612,149,47B7E57,3459,-73,-63,-10,6,34014\n\n\n\nOK'
}