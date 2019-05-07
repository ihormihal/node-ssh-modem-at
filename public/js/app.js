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
            info: {"RAT":"WCDMA","MCC":"255","MNC":"06","ARFCN":"10612","PSC":"149","CELL_ID":"47B7E57","LAC":"3459","RSCP":"-73","RXLEV":"-63","EC_N0":"-10","DRX":"6","URA":"6"}
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
                console.log(res)
                this.info = res.data
                this.loading = false
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
        }
    }
})
