var express = require('express');
var router = express.Router();
Web3 = require('web3')
//var Web3 = require('web3');
//var es6= require('es6');
const BlockPeers=require("../lib/cantidad_block_peers");
//import Cantidad_block_peers from "../lib/cantidad_block_peers";
var interval=null;
//var estadoBlock = BlockPeers();

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

function refrescarBlockChain() {
  estadoBlock = BlockPeers();
 console.log('blockPeers', estadoBlock);
}

/* GET home page. */
router.get('/', function(req, res) {
 res.render('index/index');

 // interval=setInterval(refrescarBlockChain, 2000);
});



router.post('/MNtbjinq4zQCtL3EGUvj', function(req,res){
  console.log('llego a la peticion');
  refrescarBlockChain();
// obtengo las variables de la cadena de bloques   

//console.log(block_peers);

//// exactamente este codigo lo pase a un modulo 
/// se demora mas ejecutandose desde el modulo y pone mas lento el front-end
/*var numerobloques;
var peerCount;
var web3 = new Web3(new Web3.providers.HttpProvider("http://172.16.5.170:8545"));
console.log(web3.version.api);
if(web3.isConnected()) {
   numerobloques=web3.eth.blockNumber;
   peerCount = web3.net.peerCount+1;
}
else {
  numerobloques="no conectado";
  peerCount = "no conectado";
} 
return res.json({data1: numerobloques,data2:peerCount});*/
///////////////////////////////////////////////////////////////////

return res.json({data1: estadoBlock[0], data2:estadoBlock[1],data3:estadoBlock[2],data4:estadoBlock[3]});
});


router.post('/MNtbjinq4zQCtL3EGUva', function(req,res){
  console.log('llego a la peticion');
  clearInterval(interval);
  return res.json({ data5:true});
});
//*/
// router.get('/funcion', function(req, res) {
  
//   // Operacion
//   res.next();
// });
// router.get('/funcion', function(req, res) {
//   return res.render('index/index');
// });
router.post('/MNtbjinq4zQCtL3EGUdi/:id/:otro', function(req,res){
  var codidiplo=req.params.id;
  var md5diploma= req.params.otro;
  console.log(codidiplo,md5diploma);
  var num_conectar=randomIntInc(0,1);
  var direcciones= ['http://172.16.5.170:8545','http://172.16.5.171:8545'];
  var web3 = new Web3(new Web3.providers.HttpProvider(direcciones[num_conectar]));
  var    contract = web3.eth.contract([{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"}],"name":"verFuncionarios","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"}],"name":"verEstadoSesion","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"name":"enviarSesionID","outputs":[{"name":"sesionID","type":"bytes32"},{"name":"rol","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedulaFuncionario","type":"uint256"}],"name":"verFuncionario2","outputs":[{"name":"nombre","type":"string"},{"name":"rol","type":"uint256"},{"name":"habilitado","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"}],"name":"borrarSesionIdTemporal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"name":"ingresar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"nuevoHash","type":"string"},{"name":"nuevoCodigo","type":"bytes32"}],"name":"agregarDiploma","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"codigo","type":"bytes32"}],"name":"verDiploma","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedulaRol2","type":"uint256"},{"name":"sesionIdRol2","type":"bytes32"},{"name":"cedulaRol3","type":"uint256"}],"name":"habilitarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"}],"name":"salir","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"verFuncionarios2","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"sesionID","type":"bytes32"},{"name":"nuevaContrasena","type":"string"}],"name":"cambiarContrasena","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"cedulaFuncionario","type":"uint256"}],"name":"verFuncionario","outputs":[{"name":"nombre","type":"string"},{"name":"rol","type":"uint256"},{"name":"habilitado","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"sesionID","type":"bytes32"}],"name":"consultarcontrasena","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"cedulaFuncionario","type":"uint256"}],"name":"desabilitarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"codigoDiploma","type":"bytes32"},{"name":"hashVerificar","type":"string"}],"name":"verificarDiploma","outputs":[{"name":"mensaje","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conteoDiplomas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"nuevaCedula","type":"uint256"},{"name":"nuevaContrasena","type":"string"},{"name":"nuevoDocumentoSecreto","type":"string"},{"name":"nuevoNombre","type":"string"},{"name":"nuevoRol","type":"uint256"}],"name":"agregarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoIngresar","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoSalir","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoAgregarFuncionario","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoCambiarContrasena","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedulaRol3","type":"uint256"},{"indexed":true,"name":"cedulaRol4","type":"uint256"}],"name":"EventoHabilitarFuncionario","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"},{"indexed":true,"name":"codigo","type":"bytes32"},{"indexed":true,"name":"hashDiploma","type":"bytes32"}],"name":"EventoAgregarDiploma","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoDeshabilitarFuncionario","type":"event"}]);
  var    instance = contract.at("0xc69e0116457c20ae4e9c0ba8eaa85cea8986494d");
  //console.log(instance);
  var account=web3.eth.coinbase;
  var password="nodo1*123"
  web3.personal.unlockAccount(account,password);
  var    txnObject = {
      from: web3.eth.coinbase,
      gas: 47000
  }
  var verificardiploma=instance.verificarDiploma.call(codidiplo,md5diploma);
  return res.json({ data6:verificardiploma});
});


module.exports = router;
