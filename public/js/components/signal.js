Vue.component('Signal', {
    template: `<div class="signal">
        <div class="type">{{type}}</div>
        <div class="piles"> 
            <div v-for="(pile, index) in piles" class="pile" :class="index < signal ? 'level-'+signal : ''" ></div>
        </div>
        <div class="values">
            <div v-if="rxlev" class="rxlev">{{rxlev}} <span>dBm</span></div>
            <div v-if="rscp" class="rscp">{{rscp}} <span>dBm</span></div>
        </div>
    </div>`,
    props: {
        rat: String,
        rscp: Number,
        rxlev: Number
    },
    data() {
        return {
            min: -109,
            max: -55,
            piles: new Array(10)
        }
    },
    computed: {
        type: function () {
            switch(this.rat) {
                case 'GSM':
                    return '2G'
                case 'WCDMA':
                    return '3G'
                default:
                    return ''
            }
        },
        signal: function () {
            let sig = this.rxlev || this.rscp
            let fullRange = this.max - this.min //60
            let percent = (sig - this.min)/fullRange
            if(percent < 0) percent = 0
            if(percent > 1) percent = 1
            return Math.ceil(percent*10)
        }
    },
    mounted() {
        
    },
    methods: {
        
    }
})