const fs = require('fs')
const csv = require('fast-csv')

module.exports = {
    getCells: (filter = {}) => {
        console.log(filter)
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream("./api/db_cells.csv")
            let rows = []
            let index = 0
            csv.fromStream(stream, {headers : ["LAC", "CELL_ID", "LAT", "LNG"]})
                .on("data", (data) => {
                    console.log(data)
                    if(index == 0){
                        index++
                        return
                    }
                    let CELL_ID = filter.CELL_ID

                    if(filter.LAC && !CELL_ID && data.LAC == lac){
                        rows.push(data)
                    }
                    else if(CELL_ID && !filter.LAC && data.CELL_ID == CELL_ID){
                        rows.push(data)
                    }
                    else if(CELL_ID && filter.LAC && data.CELL_ID == CELL_ID && data.LAC == filter.LAC){
                        rows.push(data)
                    }
                    index++
                })
                .on("end", () => {
                    resolve(rows)
                })
        })
    }
}