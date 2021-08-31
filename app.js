const { log } = require("console");
const express=require("express");
const https= require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){
  //console.log(req.body.cityName);
  const query=req.body.cityName;
  const apiKey="7d18c4d4a16edd1ab851e04d7179f85b";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data)
    {
      const weatherData =JSON.parse(data);
      const temp=weatherData.main.temp;
      console.log("Temperature : " + temp);
      const description=weatherData.weather[0].description;
      console.log("Description : "+ description);

      const icon=weatherData.weather[0].icon;
      const name=weatherData.name;
      console.log("Nmae of City is : " + name);
      const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p><b>Weather Description is : " + description + "</b></p>")
      res.write("<h1>The Temperature in " + name +" is : " + temp + " degrees Celcius</h1>" );
      res.write("<img src=" + imageURL + ">");  
      //res.write(icon);
      res.send();
      // console.log(weatherData);

      // const object={
      //   name: "Govind",
      //   favouriteFood: "Chicken" 
      // }
      // console.log(JSON.stringify(object));
    });
  });

})


app.listen(3000,function()
{
  console.log("Server is running on port 3000.");
})