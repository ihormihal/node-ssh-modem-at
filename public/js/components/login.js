Vue.component('Login', {
    template: `<div class="container page page-login">
        <form>
            <div class="form-group">
                <input class="mtr white" type="text" v-model="host" />
            </div>
            <div class="form-group">
                <input class="mtr white" type="text" v-model="username" />
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
            host: "192.168.2.73",
            username: 'wildfly',
            password: 'wildfly12'
        }
    },
    methods: {
        connectHost() {
            this.$eventHub.$emit('CONNECT', {
                host: this.host,
                username: this.username,
                password: this.password
            })
        }
    }
})