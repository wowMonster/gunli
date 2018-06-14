var express = require('express');
var async = require('async');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/houtai"
var Objectid = require("mongodb").ObjectId;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/denglu',(req,res)=>{
  res.render('denglu',{})
})
router.get('/zhuce',(req,res)=>{
  res.render('zhuce',{})
})


router.get('/main',(req,res)=>{
        // 页数

        var pageno=req.query.pageno;
        pageno=pageno?pageno:1;
        // 每页展示的数量
        var size=8;
        // 总的留言数
        var count=0;
        // 总的页码数
        var page=0;
  mongodb.connect(db_str,(err,database)=>{
    database.collection('liuyan',(err,coll)=>{
          async.series([
              function(callback){
                  coll.find({}).toArray((err,data)=>{
                    count=data.length;
                    page=Math.ceil(count/size)
                    // 上一页 下一页
                    pageno=pageno<1?1:pageno;
                    pageno=pageno>page?page:pageno;
                    callback(null,'')
                  })
              },
              function(callback) {
                  coll.find({}).sort({_id:-1}).limit(size).skip((pageno-1)*size)
                  .toArray((err,data)=>{
                    callback(null,data)
                  })
              }
          ],function(err,data) {

              res.render('main',{
                data:data[1],
                size:size,
                page:page,
                count:count,
                pageno:pageno,
                name: req.session.name
              })
              database.close();
          })
    })
  })
})




router.get('/main1',(req,res)=>{
        // 页数

        var pageno=req.query.pageno;
        pageno=pageno?pageno:1;
        // 每页展示的数量
        var size=8;
        // 总的留言数
        var count=0;
        // 总的页码数
        var page=0;
  mongodb.connect(db_str,(err,database)=>{
    database.collection('liuyan',(err,coll)=>{
          async.series([
              function(callback){
                  coll.find({}).toArray((err,data)=>{
                    count=data.length;
                    page=Math.ceil(count/size)
                    // 上一页 下一页
                    pageno=pageno<1?1:pageno;
                    pageno=pageno>page?page:pageno;
                    callback(null,'')
                  })
              },
              function(callback) {
                  coll.find({}).sort({_id:-1}).limit(size).skip((pageno-1)*size)
                  .toArray((err,data)=>{
                    callback(null,data)
                  })
              }
          ],function(err,data) {

              res.send(data[1]);
              flag=false;
              database.close();
          })
    })
  })
})

// 详情
router.get('/xiang',(req,res)=>{
  var id=Objectid(req.query.id)
  mongodb.connect(db_str,(err,database)=>{
    database.collection("liuyan",(err,coll)=>{
      coll.find({_id:id}).sort({_id:-1}).toArray((err,data)=>{
              res.send(data);
                database.close();
        })
      })
    })
  })
// 删除
router.get('/shan',(req,res)=>{
  var id=Objectid(req.query.id)
  console.log(id);
  mongodb.connect(db_str,(err,database)=>{
    database.collection("liuyan",(err,coll)=>{
       coll.remove({"_id":id},(err,data)=>{
              res.send("1");
       })
      })
    })
  })



module.exports = router;
