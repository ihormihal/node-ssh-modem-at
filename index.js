const node_ssh = require('node-ssh')
const ssh = new node_ssh()
 
ssh.connect({
  host: '192.168.1.1',
  username: 'root',
  password: '1989'
})
.then(() => {
    return ssh.execCommand('echo "AT^MONSC" > /dev/ttyUSB0')
})
.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log(err)
})