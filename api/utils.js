module.exports = {
    parseMONSC(res) {
        let matches = res.match(/MONSC:(.*)?/g)
        if(!matches.length) return {};
        let monsc = matches[0].split('MONSC:')[1].trim().split(',')
    
        let info = { }
    
        if(monsc[0] != 'NONE'){
            info = { 
                RAT: monsc[0],
                MCC: monsc[1],
                MNC: monsc[2]
            }
    
            let bands = {
                '0': 'GSM 850',
                '1': 'GSM 900',
                '2': 'GSM 1800',
                '3': 'GSM1900'
            }
    
            if(info.RAT == 'GSM'){
                info.BAND = bands[monsc[3]]
                info.ARFCN = monsc[4]
                info.BSIC = monsc[5]
                info.CELL_ID = monsc[6]
                info.LAC = monsc[7]
                info.RXLEV = monsc[8]
                info.RX_QUALITY = monsc[9]
                info.TA = monsc[10]
            }
            else if(info.RAT == 'WCDMA'){
                info.ARFCN = monsc[3]
                info.PSC = monsc[4]
                info.CELL_ID = monsc[5]
                info.LAC = monsc[6]
                info.RSCP = monsc[7]
                info.RXLEV = monsc[8]
                info.EC_N0 = monsc[9]
                info.DRX = monsc[10]
                info.URA = monsc[10]
            }
    
        }
        return info
    }
}