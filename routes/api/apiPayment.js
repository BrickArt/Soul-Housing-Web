var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var checkAuth = require('../../middleware/checkAuth');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/upload/payments')
  },
  filename: function (req, file, cb) {
    cb(null, 'payment_' + Date.now() + '.' + file.mimetype.split('/')[1])
  }
})

var upload = multer({ storage: storage });


//===========================================
//-----------------DataBase------------------
//===========================================
var House = require('../../models/house').House;
var Gist = require('../../models/gist').Gist;
var Residence = require('../../models/residence').Residence;
var Test = require('../../models/test').Test;
var Payment = require('../../models/payment').Payment;



//===========================================
//------------------Router-------------------
//===========================================

//------------------GET--------------------
router.get('/payments', function(req, res, next){
  Gist.find()
  .then(function (doc){
    for (var i = 0; i < doc.length; i++) {
      doc[i].image = 'img/upload/guest/' +  doc[i].image;
      Residence.findById(doc[i].residence).then(function(resid){
        House.findById(resid.houseID).then(function(house){
          doc[i].houseName = house._id
          console.log(doc[i]);

        })
      });
    }
    res.send(doc);
    console.log(doc);
  });
  return;
});
//------------------GET--------------------
router.get('/payments/user_:id?', function(req, res, next){
  if (req.params.id){
    var id = req.params.id
    Payment.find({userID: id})
    .then(function (doc){
      res.send(doc);
      console.log(doc);
    });
    return;
  }
});



//-------------------ADD--------------------
router.post('/payments/add/user_:id?', upload.any(), function(req, res, next){
  var id = req.params.id;
  var item = {
    date: new Date(req.body.date),
    sum: req.body.sum,
    type: req.body.type,
    program: req.body.program,
    userID: id
  };
  if(req.files[0]){
    item.image = req.files[0].filename;
  };
  var data = new Payment(item);
  data.save(function (err) {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      res.send(data);
    }
  });
});











module.exports = router;
