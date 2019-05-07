Vue.component('Login', {
    template: `<div class="container page page-login">
        <form>
            <div class="form-group">
                <input class="mtr white" type="text" v-model="host" />
            </div>
            <div class="form-group">
                <input class="mtr white" type="text" v-model="user" />
            </div>
            <div class="form-group">
                <input class="mtr white" type="password" v-model="password" />
            </div>
            <div>
                <button class="btn btn-mtr btn-white full" @click.stop.prevent="connectHost()">Connect</button>
            </div>
        </form>
    </div>`,
    data() {
        return {
            host: "192.168.1.1",
            user: 'root',
            password: '1989'
        }
    },
    methods: {
        connectHost() {
            console.log('emit CONNECT')
            this.$eventHub.$emit('CONNECT', {
                host: this.host,
                user: this.user,
                password: this.password
            })
        }
    }
})