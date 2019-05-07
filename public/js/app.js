Vue.component('App', {
    template: `<main>
        <Login v-if="!connected" />
        <Info :info="info" v-if="connected" />
        <div v-if="loading" class="page-loader">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
    </main>`,
    data() {
        return {
            connected: false,
            loading: false,
            info: null
        }
    },
    mounted() {
        this.$eventHub.$on('CONNECT', (credentials) => {
            this.connectHost(credentials)
        })
        this.$eventHub.$on('GET_INFO', (credentials) => {
            this.getInfo()
        })
    },
    methods: {
        connectHost(data) {
            this.loading = true
            fetch( 'http://localhost:5000/api/connect', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                this.connected = true
                this.loading = false
            })
        },
        getInfo() {
            this.loading = true
            fetch('http://localhost:5000/api/info', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                this.loading = false
                return res.json()
            })
            .then((res) => {
                console.log(res)
                this.info = res
                this.loading = false
            })
        }
    }
})
