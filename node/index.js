const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var multer  = require('multer');
const api=require('./api/api');

/* Mongo DB */
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/findawk";
const dbName = "findawk";
/* Mongo DB */

const perPage = 3;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});



var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({ storage : Storage }).single('file');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/uploads'));
// parse application/json
app.use(bodyParser.json())
app.use(cors())


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/addCatRequest", (req, res) => {
  
  upload(req, res, function(err) {       
      MongoClient.connect(url, function(err, db) {
        var imgName = '';
        try {
          imgName= req.file.filename;
        }
        catch(err) {
          console.log("image not found backend");
        }
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = { 
          cat_name: req.body.cat_name,
          popularStatus:0,
          cat_img: imgName
         };
        dbo.collection("category").insertOne(myobj, function(err, res1) {
          if (err) throw err;
          //console.log("Category Inserted Successfully");
          res.json({ msg: 'success' });
          db.close();
        });
      });
    });
});

        app.post("/updateCatRequest", (req, res) => {          
            upload(req, res, function(err) {       
                MongoClient.connect(url, function(err, db) {
                  var imgName = req.body.cat_img;
                  try {
                    imgName= req.file.filename;
                  }
                  catch(err) {
                    console.log("image not found backend");
                  }
                  if (err) throw err;
                  var dbo = db.db(dbName);
            
                  dbo.collection("category").findOneAndUpdate({_id: ObjectId(req.body.id)}, {$set: {'cat_name': req.body.cat_name,'cat_img':imgName}},function(err,doc) {
             
                    if (err) throw err;                    
                    res.json({ msg: 'success' });
                   db.close();
                  });

                });
              });
        });


app.get("/get_category", async (req, res) => {    
      var page = req.query.page || 1
      MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
          var dbo = db.db(dbName);
          dbo.collection("category").find({}).skip((perPage * page) - perPage)
          .limit(perPage).sort({_id:-1}).toArray(function(err, result) {              
              res.json({ catdata: result})
          });
      }); 
});

app.post("/getCollectionCount", async (req, res) => {    
  let count = await api.collectionCount(req.body.tbl,{});
        res.json({ count:count});
  
});
app.get("/get_totalItem", (req, res) => {
  MongoClient.connect(url, function(err, db){    
    var dbo = db.db(dbName);
    dbo.collection("category").find({}).count(function(err, count) {   
      if (err) throw err;
      res.json({ count: count});
    });
  });
});

app.post("/get_category_by_id", (req, res) => {
    MongoClient.connect(url, function(err, db){
      var dbo = db.db(dbName);
      dbo.collection("category").findOne({_id:ObjectId(req.body.id)}, function(err, result) {
        if (err) throw err;
        res.json({ catdata: result});
        });
    });
});

app.post("/delete_category", (req, res) => {
  console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { _id: ObjectId(req.body.id) };
        dbo.collection("category").deleteOne(myquery, function(err, obj) {
          res.json({ id: 'success' });
          db.close();
        });
    });
});




app.post("/loginFormRequest", (req, res) => {
    console.log("login");
    console.log(req.body);
    let email='admin@gmail.com';
    let password='123';
    let msg = {};
    if(req.body.email==email&&req.body.password==password){
        msg = {'msg':'Successfully Login'};
    }else{
        msg = {'msg':'Invalid Details'};
    }
    return res.json(msg);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});