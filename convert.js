const fs = require('fs')
const csv = require('fast-csv')

const stream = fs.createReadStream("./api/db.csv")

const csvStream = csv.createWriteStream({headers: true})
const writableStream = fs.createWriteStream("./api/db_lifecell.csv")

writableStream.on("finish", () => {
    console.log("DONE!")
})

csvStream.pipe(writableStream)

//MNC	MCC	LAC CELL_ID	LNG	LAT
csv.fromStream(stream)
    .on("data", (data) => {
        let dt = data.toString().split('\t')
        if(dt[0] == 255 && dt[1] == 6){
            let row = {
                LAC: dt[2],
                CELL_ID: dt[3],
                LNG: dt[5],
                LAT: dt[5]
            }
            csvStream.write(row)
        }
    })
    .on("end", () => {
        csvStream.end()
    })

// stream.pipe(csvStream);