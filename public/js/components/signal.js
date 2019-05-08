Vue.component('Signal', {
    template: `<div class="signal">
        <div class="piles"> 
            <div v-for="(pile, index) in piles" class="pile" :class="index < currentRxLev ? 'level-'+currentRxLev : ''" ></div>
        </div>
        <div class="values">
            <div class="rxlev">{{rxlev}} <span>dBm</span></div>
            <div class="rscp">{{rscp}} <span>dBm</span></div>
        </div>
    </div>`,
    props: {
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
        currentRxLev: function () {
            let fullRange = this.max - this.min //60
            let percent = (this.rxlev - this.min)/fullRange
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