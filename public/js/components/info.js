Vue.component('CellInfo', {
    template: `<div class="container page page-info">
        <button class="btn btn-primary" @click="getCurrent()">Get current cell info</button>
        <button class="btn btn-primary" @click="getNearby()">Get nearby cells</button>
        <div class="row">
            <div class="col"><!--Map :cells="nearby" /--></div>
            <div class="col box">
                <Signal :rscp="current.RSCP" :rxlev="current.RXLEV" />
                <div class="info-table">
                    <dl>
                        <dt>RAT</dt>
                        <dd>{{current.RAT}}</dd>
                    </dl>
                    <dl>
                        <dt>MCC</dt>
                        <dd>{{current.MCC}}</dd>
                    </dl>
                    <dl>
                        <dt>MNC</dt>
                        <dd>{{current.MNC}} (<span v-if="current.MNC == '06'">LifeCell</span><span v-if="current.MNC == '03'">KyivStar</span><span v-if="current.MNC == '01'">MTS</span>)</dd>
                    </dl>
                    <dl>
                        <dt>ARFCN</dt>
                        <dd>{{current.ARFCN}}</dd>
                    </dl>
                    <dl>
                        <dt>Primary Scrambling Code</dt>
                        <dd>{{current.PSC}}</dd>
                    </dl>
                    <dl>
                        <dt>Cell ID</dt>
                        <dd>{{current.CELL_ID}}</dd>
                    </dl>
                    <dl>
                        <dt>Location Area Code</dt>
                        <dd>{{current.LAC}}</dd>
                    </dl>
                    <dl>
                        <dt>Received Signal Code Power</dt>
                        <dd>{{current.RSCP}} dBm</dd>
                    </dl>
                    <dl>
                        <dt>Receiving Signal Strength</dt>
                        <dd>{{current.RXLEV}} dBm</dd>
                    </dl>
                    <dl>
                        <dt>Eb/N0 (Carrier-to-noise ratio)</dt>
                        <dd>{{current.EC_N0}} dB</dd>
                    </dl>
                    <dl>
                        <dt>Discontinuous Reception Cycle Length</dt>
                        <dd>{{current.DRX}}</dd>
                    </dl>
                    <dl>
                        <dt>UTRAN Registration Area Identity</dt>
                        <dd>{{current.URA}}</dd>
                    </dl>
                </div>
                <div v-for="cell in nearby" class="info-table">
                    <dl>
                        <dt>ARFCN</dt>
                        <dd>{{cell.ARFCN}}</dd>
                    </dl>
                    <dl>
                        <dt>Primary Scrambling Code</dt>
                        <dd>{{cell.PSC}}</dd>
                    </dl>
                    <dl>
                        <dt>Cell ID</dt>
                        <dd>{{cell.CELL_ID}}</dd>
                    </dl>
                    <dl>
                        <dt>Location Area Code</dt>
                        <dd>{{cell.LAC}}</dd>
                    </dl>
                    <dl>
                        <dt>Received Signal Code Power</dt>
                        <dd>{{cell.RSCP}} dBm</dd>
                    </dl>
                    <dl>
                        <dt>Receiving Signal Strength</dt>
                        <dd>{{cell.RXLEV}} dBm</dd>
                    </dl>
                    <dl>
                        <dt>Eb/N0 (Carrier-to-noise ratio)</dt>
                        <dd>{{cell.EC_N0}} dB</dd>
                    </dl>
                </div>
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