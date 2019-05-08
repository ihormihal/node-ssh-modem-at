function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

Vue.component('App', {
    template: `<main>
        <Login v-if="!connected" />
        <CellInfo v-if="connected" :current="currentCell" :nearby="nearbyCells" />
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
            currentCell: {},
            nearbyCells: {}
        }
    },
    mounted() {
        this.$eventHub.$on('CONNECT', (credentials) => {
            this.connectHost(credentials)
        })
        this.$eventHub.$on('GET_CURRENT_CELL', () => {
            this.getCurrentCell()
        })
        this.$eventHub.$on('GET_NEARBY_CELLS', () => {
            this.getNearbyCells()
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
        getCurrentCell() {
            this.loading = true
            fetch('http://localhost:5000/api/cell/current', {
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
                this.currentCell = res
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
        },
        getNearbyCells() {
            this.loading = true
            fetch('http://localhost:5000/api/cell/nearby', {
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
                this.nearbyCells = res
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
        }
    }
})
