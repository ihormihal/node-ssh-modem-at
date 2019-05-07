Vue.component('Info', {
    template: `<div class="container page page-info">
            <!--div>
                <button class="btn btn-mtr btn-white full" @click.stop.prevent="getInfo()">Update</button>
            </div-->
            <div class="info-table">
                <dl>
                    <dt>RAT</dt>
                    <dd>{{info.RAT}}</dd>
                </dl>
                <dl>
                    <dt>Mobile Network Code</dt>
                    <dd>{{info.MCC}}</dd>
                </dl>
                <dl>
                    <dt>Mobile Country Code</dt>
                    <dd>{{info.MNC}}</dd>
                </dl>
                <dl>
                    <dt>Absolute Radio Frequency Channel Number</dt>
                    <dd>{{info.ARFCN}}</dd>
                </dl>
                <dl>
                    <dt>Primary Scrambling Code,</dt>
                    <dd>{{info.PSC}}</dd>
                </dl>
                <dl>
                    <dt>Cell identity </dt>
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
                    <dd>{{info.MCC}} dBm</dd>
                </dl>
                <dl>
                    <dt>Ratio of energy per modulating bit to the noise spectral density</dt>
                    <dd>{{info.EC_N0}}</dd>
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