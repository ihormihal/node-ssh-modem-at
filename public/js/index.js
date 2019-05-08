"use strict";

Vue.prototype.$eventHub = new Vue()
new Vue({
    el: '#app',
    template: `<App />`
})


const formatDate = (date, pattern) => {
    date = new Date(date)
    let YYYY = date.getFullYear()
    let MM = date.getMonth()+1
    if(MM < 10) MM = '0'+MM
    let DD = date.getDate()
    if(DD < 10) DD = '0'+DD
    let hh = date.getHours()
    if(hh < 10) hh = '0'+hh
    let mm = date.getMinutes()
    if(mm < 10) mm = '0'+mm
    let ss = date.getSeconds()
    if(ss < 10) ss = '0'+ss

    let dt = pattern.replace('YYYY',YYYY)
    dt = dt.replace('MM',MM)
    dt = dt.replace('DD',DD)
    dt = dt.replace('hh',hh)
    dt = dt.replace('mm',mm)
    dt = dt.replace('ss',ss)
    
    return dt
}

Vue.filter('datetime', function(value) {
    if (value) {
        return formatDate(value, 'YYYY/MM/DD hh:mm')
    }
})

Vue.filter('operator', function(mnc) {
    switch(mnc) {
        case '01':
            return 'Vodafone'
        case '03':
            return 'Kyivstar'
        case '06':
            return 'Lifecell'
        default:
            return mnc
    }
})