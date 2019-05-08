Vue.component('Info', {
    template: `<div class="container page page-info">
        <div class="row">
            <div class="col"><Map :cells="info.cells" /></div>
            <div class="col box">
                <Signal :rscp="info.RSCP" :rxlev="info.RXLEV" />
                <div class="info-table">
                    <dl>
                        <dt>RAT</dt>
                        <dd>{{info.RAT}}</dd>
                    </dl>
                    <dl>
                        <dt>MCC</dt>
                        <dd>{{info.MCC}}</dd>
                    </dl>
                    <dl>
                        <dt>MNC</dt>
                        <dd>{{info.MNC}} (<span v-if="info.MNC == '06'">LifeCell</span><span v-if="info.MNC == '03'">KyivStar</span><span v-if="info.MNC == '01'">MTS</span>)</dd>
                    </dl>
                    <dl>
                        <dt>ARFCN</dt>
                        <dd>{{info.ARFCN}}</dd>
                    </dl>
                    <dl>
                        <dt>Primary Scrambling Code</dt>
                        <dd>{{info.PSC}}</dd>
                    </dl>
                    <dl>
                        <dt>Cell ID</dt>
                        <dd>{{info.CELL_ID}}</dd>
                    </dl>
                    <dl>
                        <dt>Location Area Code</dt>
                        <dd>{{info.LAC}}</dd>
                    </dl>
                    <dl>
                        <dt>Received Signal Code Power</dt>
                        <dd>{{info.RSCP}} dBm</dd>
                    </dl>
                    <dl>
                        <dt>Receiving Signal Strength</dt>
                        <dd>{{info.RXLEV}} dBm</dd>
                    </dl>
                    <dl>
                        <dt>Eb/N0 (Carrier-to-noise ratio)</dt>
                        <dd>{{info.EC_N0}} dB</dd>
                    </dl>
                    <dl>
                        <dt>Discontinuous Reception Cycle Length</dt>
                        <dd>{{info.DRX}}</dd>
                    </dl>
                    <dl>
                        <dt>UTRAN Registration Area Identity</dt>
                        <dd>{{info.URA}}</dd>
                    </dl>
                </div>
            </div>
        </div>
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