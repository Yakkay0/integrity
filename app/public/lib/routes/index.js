var express = require('express');
var router = express.Router();
var fileshtml='/home/jorge/Documentos/blockchain/reto2blockchain/node_app/views/';
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index/index', {datos: {
    dato1: "algo",
    dato2: "algo"
  }});
});

// router.get('/funcion', function(req, res) {
  
//   // Operacion
//   res.next();
// });
// router.get('/funcion', function(req, res) {
//   return res.render('index/index');
// });

module.exports = router;
