const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
var AWS = require ('aws-sdk')
const aws_key = require("./aws_key")


AWS.config.update(aws_key.dbd)
var docClient = new AWS.DynamoDB.DocumentClient()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {

  res.send(JSON.stringify('Hello World'))
})

app.post('/login', async function (req, res) {
  let params = {
    TableName: "Usuarios",
    KeyConditionExpression: "#usuario = :user ",
    ExpressionAttributeNames:{
      "#usuario": "user"
  },
    ExpressionAttributeValues: {
      ":user": req.body.user

    } }

    try {
      const data = await docClient.query(params).promise();
      console.log(JSON.stringify(data, null, 2));
      var pas = data["Items"][0]["password"];
      if(pas==req.body.password){
        res.send("exitoso")
        console.log("existe")
      }else{
        res.send("sin exito")
        console.log("no existe")
      }

      
    } catch (error) {
      console.log("error")
      res.send("sin exito")
      
    }
});
app.post('/registrar', function (req, res) {
console.log(req.body)
let params = {
  TableName: "Usuarios",
  Item:{
     "user":req.body.user,
     "password": req.body.password
 
  }
}

docClient.put(params, function(err,data){
  if (err){
    console.log(err)
    res.send("sin exito");
  }else{
    console.log(data)
    res.send("exitoso");
  }
})

});
 
 
app.listen(3000)