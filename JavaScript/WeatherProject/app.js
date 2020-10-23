const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "fe24cfe234f16efa9bceb91fedcc46d1";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+
               query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    //get the data from the response
    response.on("data", function(data) {

      //parse Json data into the JavaScript object
      const weatherData = JSON.parse(data)

      //get js object attributes
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      //Send data back to the browser
      //can only have one send in an project, but can have multi writes
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query +" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL +">");
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})