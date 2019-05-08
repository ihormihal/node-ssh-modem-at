function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

Vue.component('App', {
    template: `<main>
        <!--Login v-if="!connected" /-->
        <Info :info="info" />
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
            info: {}
        }
    },
    mounted() {
        this.getInfo()
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
            })
            .then(handleErrors)
            .then((res) => {
                this.connected = true
                this.loading = false
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
        },
        getInfo() {
            console.log('getInfo')
            this.loading = true
            fetch('http://localhost:5000/api/info', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(handleErrors)
            .then((res) => {
                this.loading = false
                return res.json()
            })
            .then((res) => {
                this.info = res.data
                console.log('filter1')
                this.getCells(this.info)
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
        },
        getCells(filter) {
            console.log('filter2')
            fetch('http://localhost:5000/api/cells', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            })
            .then(handleErrors)
            .then((res) => {
                return res.json()
            })
            .then((cells) => {
                this.info = { ...this.info, cells }
            })
        }
    }
})
