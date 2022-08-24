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
    res.send("HTTP POST request sent to the webhook URL!")
    // If the user sends a message to your bot, send a reply message
    if (req.body.events[0].type === "message") {
      // Message data, must be stringified
      console.log(req.body.events[0])
      const user = req.body.events[0].source.userId
      const connection = mysql.createConnection({
        host: "bauto-schema.cfnxq6b0ia8q.ap-southeast-1.rds.amazonaws.com",
        username: "admin",
        password: "Technician2020!",
        database: "erp_schema",
        dialect: "mysql",
        pool: {
          max: 20,
          min: 0,
          acquire: 600000,
          idle: 10000
        },
        logging: false,
        dialectOptions: {
          connectTimeout: 600000
        }
      })

      console.log("insert user")
      const data = {
        userName:"",
        userId: user,
        department:""
      }
      const query = "INSERT INTO lineusers VALUES(?)"
      connection.query(query,data, (err, rows, fields) => {
        if (!err) {
          console.log("success")
        } else {
          console.log(err.message)
        }
        connection.end()
      })


      const dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            "type": "text",
            "text": "Welcome To Line Bot BAE"
          }
        ]
      })
  
      // Request header
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + TOKEN
      }
  
      // Options to pass into the request
      const webhookOptions = {
        "hostname": "api.line.me",
        "path": "/v2/bot/message/reply",
        "method": "POST",
        "headers": headers,
        "body": dataString
      }
  
      // Define request
      const request = https.request(webhookOptions, (res) => {
        res.on("data", (d) => {
          process.stdout.write(d)
        })
      })
  
      // Handle error
      request.on("error", (err) => {
        console.error(err)
      })
  
      // Send data
      request.write(dataString)
    //   request.end()
    }
  })