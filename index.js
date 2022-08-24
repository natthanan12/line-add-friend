const https = require("https")
const express = require("express")
const mysql = require("mysql")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN || "xxvcCF4XO+EEyIHzn8Tp+RQlv4LGYY6NgsQQX9itLEciOQ7Mzain74h5TMvvzUofgqcUEQMfClwoExI8pbVGqdrV+TrxpKLr8GZoLUh2GXv50hw5oLqNKMrih93Z1jajL1rMKn53Vg7KulvpQDrHNgdB04t89/1O/w1cDnyilFU="

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendStatus(200)
})
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

  
app.post("/webhook", function(req, res) {
     res.sendStatus(200)
    // res.send("HTTP POST request sent to the webhook URL!")
    // If the user sends a message to your bot, send a reply message
    if (req.body.events[0].type === "message") {
      // Message data, must be stringified
      console.log(req.body.events[0])
      const user = req.body.events[0].source.userId
      const connection = mysql.createConnection({
        host: "bauto-schema.cfnxq6b0ia8q.ap-southeast-1.rds.amazonaws.com",
        port: 3306,
        user: "admin",
        password: "Technician2020!",
        database: "erp_schema",
        ssl: true,
      })

      console.log("insert user",user)
      const data = {
        userName:"",
        userId: user,
        department:""
      }
      const query = "INSERT INTO lineusers SET ?"
      connection.query(query,data, (err, rows, fields) => {
        if (!err) {
          console.log("success")
        //   request.end()
        } else {
          process.exit(1)
        }
        connection.end()
      })
    }
  })