Vue.component('Info', {
    template: `<div class="container page page-info">
        <form>
            <div>
                <button class="btn btn-mtr btn-white full" @click.stop.prevent="getInfo()">Update</button>
            </div>
        </form>
        {{info}}
    </div>`,
    props: {
        info: Object
    },
    data() {
        return {}
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.$eventHub.$emit('GET_INFO')
        }
    }
})