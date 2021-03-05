var express = require('express');
var fs = require('fs');
var multer = require("multer");
var upload = multer({ dest: "uploadFile/" });
var app = express();
app.listen(8000);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/problems'));

app.get('/', function(req, res){
    console.log('connect to home page');
    console.log(req.url);
    fs.readFile('index.html', function(err, data){
        res.write(data);
        res.end();
    });
});

app.get('/problems', function(req, res){
    console.log('load in problems');
    console.log(req.url);
    fs.readFile('problems.html', function(err, data){
        res.write(data);
        res.end();
    });
});

app.post("/fileUpload", upload.any(), function (req, res, next) {
    console.log(req.files[0]); // 吐出上傳檔案資訊
    var newFile = "./uploadFile/" + req.files[0].originalname;
    fs.rename(req.files[0].path, newFile, function (err) {
      if (err) throw err;
      res.write("File uploaded and moved!");
      res.end();
    });
  });
  