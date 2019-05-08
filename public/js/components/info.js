Vue.component('InfoCard', {
    template: `<div class="card">
        <Signal :rat="cell.RAT" :rscp="cell.RSCP" :rxlev="cell.RXLEV" />
        <div class="operator-logo">
            <img v-if="cell.MNC == '01'" src="img/logo-vadafone.png" />
            <img v-if="cell.MNC == '03'" src="img/logo-kyivstar.png" />
            <img v-if="cell.MNC == '06'" src="img/logo-lifecell.png" />
        </div>
        <table class="info-table">
            <tr v-if="cell.RAT">
                <td>Technology</td>
                <td>{{cell.RAT}}</td>
            </tr>
            <tr v-if="cell.MCC">
                <td>MCC</td>
                <td>{{cell.MCC}}</td>
            </tr>
            <tr v-if="cell.MNC">
                <td>MNC</td>
                <td>{{cell.MNC}}</td>
            </tr>
            <tr v-if="cell.BAND">
                <td>BAND</td>
                <td>{{cell.BAND}}</td>
            </tr>
            <tr v-if="cell.ARFCN">
                <td>ARFCN</td>
                <td>{{cell.ARFCN}}</td>
            </tr>
            <tr v-if="cell.BSIC">
                <td>BSIC</td>
                <td>{{cell.BSIC}}</td>
            </tr>
            <tr v-if="cell.PSC">
                <td>Primary Scrambling Code</td>
                <td>{{cell.PSC}}</td>
            </tr>
            <tr v-if="cell.CELL_ID">
                <td>Cell ID</td>
                <td>{{cell.CELL_ID}}</td>
            </tr>
            <tr v-if="cell.LAC">
                <td>Location Area Code</td>
                <td>{{cell.LAC}}</td>
            </tr>
            <tr v-if="cell.RXLEV">
                <td>Receiving Signal Strength</td>
                <td>{{cell.RXLEV}} dBm</td>
            </tr>
            <tr v-if="cell.RSCP">
                <td>Received Signal Code Power</td>
                <td>{{cell.RSCP}} dBm</td>
            </tr>
            <tr v-if="cell.EC_N0">
                <td>EC/N0 (Bit energy / Noise)</td>
                <td>{{cell.EC_N0}} dB</td>
            </tr>
            <tr v-if="cell.DRX">
                <td>Discontinuous Reception Cycle Length</td>
                <td>{{cell.DRX}}</td>
            </tr>
            <tr v-if="cell.URA">
                <td>UTRAN Registration Area Identity</td>
                <td>{{cell.URA}}</td>
            </tr>
            <tr v-if="cell.RX_QUALITY">
                <td>Quality of Reception</td>
                <td>{{cell.RX_QUALITY}}</td>
            </tr>
            <tr v-if="cell.TA">
                <td>Timing Advance</td>
                <td>{{cell.TA}}</td>
            </tr>
        </table>
    </div>`,
    props: {
        cell: Object
    }
})


Vue.component('CellInfo', {
    template: `<div class="container page page-info">
        <div class="actions box">
            <button class="btn btn-primary" @click="getCurrent()">Get current cell info</button>
            <button class="btn btn-primary" @click="getNearby()">Get nearby cells</button>
        </div>
        <div class="row box">
            <div v-if="current.RAT" class="col current-cell">
                <InfoCard :cell="current" />
            </div>
            <div v-for="cell in nearby" class="col nearby-cell">
                <InfoCard :cell="cell" />
            </div>
        </div>
    </div>`,
    props: {
        current: Object,
        nearby: Array
    },
    data() {
        return {}
    },
    mounted() {
        // setInterval(this.getCurrent, 2000)
        // this.getCurrent()
        // this.getNearby()
    },
    methods: {
        getCurrent() {
            this.$eventHub.$emit('GET_CURRENT_CELL')
        },
        getNearby() {
            this.$eventHub.$emit('GET_NEARBY_CELLS')
        }
    }
})