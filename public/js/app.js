Vue.component('App', {
    template: `<main>
        <Login />
        <div v-if="loading" class="page-loader">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
    </main>`,
    data() {
        return {
            loading: false
        }
    },
    mounted() {
        this.$eventHub.$on('CONNECT', (credentials) => {
            this.connect(credentials)
        })
    },
    methods: {
        connect(data) {
            this.loading = true
            fetch( 'http://localhost:5000/api/connect', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                this.loading = false
            })
        },
    }
})
