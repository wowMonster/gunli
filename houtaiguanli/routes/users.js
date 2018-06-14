const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;
var db_str = "mongodb://localhost:27017/houtai"
var Objectid = require("mongodb").ObjectId;
var upload=require("./upload");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 注册
router.post('/zhuce',(req,res)=>{
  mongodb.connect(db_str,(err,database)=>{
    database.collection("shuju",(err,coll)=>{
      coll.find({name:req.body.name}).toArray((err,data)=>{
        if(data.length>0) {
          res.send("1");
        }else{
          coll.insertOne(req.body,()=>{
            res.send("2");
          })
        }
        database.close();
      })
    })
  })
})
// 登录
router.post('/index',(req,res)=>{
    mongodb.connect(db_str,(err,database)=>{
      database.collection("shuju",(err,coll)=>{
        coll.find(req.body).toArray((err,data)=>{
          if (data.length>0) {
            req.session.name=data[0].name;
            res.send("1");
          }else {
            res.send("2");
          }
          database.close();
        })
      })
    })
})
// 留言
router.post('/main',(req,res)=>{
  mongodb.connect(db_str,(err,database)=>{
    database.collection("liuyan",(err,coll)=>{
      coll.insertOne(req.body,()=>{
        res.send("1");
        database.close();
      })
    })
  })
})

// 修改留言
router.post('/xiugai',(req,res)=>{
  var id=Objectid(req.body.id)
  console.log(req.body)
  mongodb.connect(db_str,(err,database)=>{
    database.collection("liuyan",(err,coll)=>{
        coll.update({"_id":id},{$set:{"tit":req.body.tit,"con":req.body.con,"nei":req.body.nei}},(err,data)=>{
          res.send("1");
        })
    })
  })
})
// 富文本
router.post("/uploadImg",(req,res)=>{
  upload(req,res)
})






module.exports = router;
