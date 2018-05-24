var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3=null;

//// funciones 
function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('ingresar/ingresar');
 
});


router.post('/conectar', function(req,res){
  console.log("conecto");
  var num_conectar=randomIntInc(0,1);
  var direcciones= ['http://172.16.5.170:8545','http://172.16.5.171:8545'];
  console.log(direcciones[num_conectar]);
  web3 = new Web3(new Web3.providers.HttpProvider(direcciones[num_conectar]));
  if(web3==null){
    console.log("Debe conectarse a la blockchain para poder realizar esta accion");
  }
  else {
   if(!web3.isConnected() ) {
    console.log("Debe conectarse a la blockchain para poder realizar esta accion");
   } 
   else {
         console.log("se conecto a la blockchain!");
         var account=web3.eth.coinbase;
         var password="nodo1*123"
         web3.personal.unlockAccount(account, password,function(error, result)  {
          
                  // console.log(error,result)
                  if(error){
                    console.log("su password es incorrecto");
                  } else {
                      // Result = True if unlocked, else false
                      var str = "la cuenta  " + account.substring(0,20)+'...ha sido desbloqueada';
                      console.log(str);
                      if(result){
                          console.log(result);
                      } else {
                          // This does not get called - since and error is returned for incorrect password :-)
                          str = 'Incorrect Password???';
                          console.log("el password es incorrecto");
                      }
                      
                      
                  }
              });
              return  res.json({data1:"ejecuto el post"});
         
        } }
});
  
  // post  transacción ingresar
  router.post('/ypaeojbzmk/:id/:otro/:otro2', function(req,res){
    var account=web3.eth.coinbase;
    var password="nodo1*123"
    web3.personal.unlockAccount(account, password,function(error, result)  {
      
              // console.log(error,result)
              if(error){
                console.log("su password es incorrecto");
              } else {
                  // Result = True if unlocked, else false
                  var str = "la cuenta  " + account.substring(0,20)+'...ha sido desbloqueada';
                  console.log(str);
                  if(result){
                      console.log(result);
                  } else {
                      // This does not get called - since and error is returned for incorrect password :-)
                      str = 'Incorrect Password???';
                      console.log("el password es incorrecto");
                  }
                  
                  
              }
          });
    // variables para  login con la blockchain
    var user=req.params.id;
    var password= req.params.otro;
    var md5_document=req.params.otro2;
    var    contract = web3.eth.contract([{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"}],"name":"verFuncionarios","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"}],"name":"verEstadoSesion","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"name":"enviarSesionID","outputs":[{"name":"sesionID","type":"bytes32"},{"name":"rol","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedulaFuncionario","type":"uint256"}],"name":"verFuncionario2","outputs":[{"name":"nombre","type":"string"},{"name":"rol","type":"uint256"},{"name":"habilitado","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"}],"name":"borrarSesionIdTemporal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"name":"ingresar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"nuevoHash","type":"string"},{"name":"nuevoCodigo","type":"bytes32"}],"name":"agregarDiploma","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"codigo","type":"bytes32"}],"name":"verDiploma","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedulaRol2","type":"uint256"},{"name":"sesionIdRol2","type":"bytes32"},{"name":"cedulaRol3","type":"uint256"}],"name":"habilitarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"}],"name":"salir","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"verFuncionarios2","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"sesionID","type":"bytes32"},{"name":"nuevaContrasena","type":"string"}],"name":"cambiarContrasena","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"cedulaFuncionario","type":"uint256"}],"name":"verFuncionario","outputs":[{"name":"nombre","type":"string"},{"name":"rol","type":"uint256"},{"name":"habilitado","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"sesionID","type":"bytes32"}],"name":"consultarcontrasena","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"cedulaFuncionario","type":"uint256"}],"name":"desabilitarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"codigoDiploma","type":"bytes32"},{"name":"hashVerificar","type":"string"}],"name":"verificarDiploma","outputs":[{"name":"mensaje","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conteoDiplomas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"nuevaCedula","type":"uint256"},{"name":"nuevaContrasena","type":"string"},{"name":"nuevoDocumentoSecreto","type":"string"},{"name":"nuevoNombre","type":"string"},{"name":"nuevoRol","type":"uint256"}],"name":"agregarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoIngresar","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoSalir","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoAgregarFuncionario","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoCambiarContrasena","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedulaRol3","type":"uint256"},{"indexed":true,"name":"cedulaRol4","type":"uint256"}],"name":"EventoHabilitarFuncionario","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"},{"indexed":true,"name":"codigo","type":"bytes32"},{"indexed":true,"name":"hashDiploma","type":"bytes32"}],"name":"EventoAgregarDiploma","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoDeshabilitarFuncionario","type":"event"}]);
    var    instance = contract.at("0xc69e0116457c20ae4e9c0ba8eaa85cea8986494d");
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: 4700000
  }
  var txingresar=instance.ingresar.sendTransaction(user,password,md5_document,txnObject);
  //var ingreso=instance..call(1075241723);
  console.log(txingresar);
  return res.json({data3: txingresar});
  });

  /// router para verificar si la transaccion mino
  router.post('/laiytrgf/:id', function(req,res){
    statetx=req.params.id;
    var tx_minada=web3.eth.getTransactionReceipt(statetx);
    console.log(tx_minada);
    return res.json({data4: tx_minada}); 
  });

  router.post('/idspru/:id/:otro/:otro2', function(req,res){
    // variables para  login con la blockchain
    var user=req.params.id;
    var password= req.params.otro;
    var md5_document=req.params.otro2;
    console.log(user,password,md5_document);
    var    contract = web3.eth.contract([{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"}],"name":"verFuncionarios","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"}],"name":"verEstadoSesion","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"name":"enviarSesionID","outputs":[{"name":"sesionID","type":"bytes32"},{"name":"rol","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedulaFuncionario","type":"uint256"}],"name":"verFuncionario2","outputs":[{"name":"nombre","type":"string"},{"name":"rol","type":"uint256"},{"name":"habilitado","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"}],"name":"borrarSesionIdTemporal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"name":"ingresar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"nuevoHash","type":"string"},{"name":"nuevoCodigo","type":"bytes32"}],"name":"agregarDiploma","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"codigo","type":"bytes32"}],"name":"verDiploma","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedulaRol2","type":"uint256"},{"name":"sesionIdRol2","type":"bytes32"},{"name":"cedulaRol3","type":"uint256"}],"name":"habilitarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"}],"name":"salir","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"verFuncionarios2","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"sesionID","type":"bytes32"},{"name":"nuevaContrasena","type":"string"}],"name":"cambiarContrasena","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"cedulaFuncionario","type":"uint256"}],"name":"verFuncionario","outputs":[{"name":"nombre","type":"string"},{"name":"rol","type":"uint256"},{"name":"habilitado","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"sesionID","type":"bytes32"}],"name":"consultarcontrasena","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"cedulaFuncionario","type":"uint256"}],"name":"desabilitarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"codigoDiploma","type":"bytes32"},{"name":"hashVerificar","type":"string"}],"name":"verificarDiploma","outputs":[{"name":"mensaje","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conteoDiplomas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cedula","type":"uint256"},{"name":"sesionID","type":"bytes32"},{"name":"nuevaCedula","type":"uint256"},{"name":"nuevaContrasena","type":"string"},{"name":"nuevoDocumentoSecreto","type":"string"},{"name":"nuevoNombre","type":"string"},{"name":"nuevoRol","type":"uint256"}],"name":"agregarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"cedula","type":"uint256"},{"name":"contrasena","type":"string"},{"name":"documentoSecreto","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoIngresar","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoSalir","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoAgregarFuncionario","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoCambiarContrasena","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedulaRol3","type":"uint256"},{"indexed":true,"name":"cedulaRol4","type":"uint256"}],"name":"EventoHabilitarFuncionario","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"},{"indexed":true,"name":"codigo","type":"bytes32"},{"indexed":true,"name":"hashDiploma","type":"bytes32"}],"name":"EventoAgregarDiploma","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cedula","type":"uint256"}],"name":"EventoDeshabilitarFuncionario","type":"event"}]);
    var    instance = contract.at("0xc69e0116457c20ae4e9c0ba8eaa85cea8986494d");
    var consulsesion=instance.enviarSesionID.call(user,password,md5_document);
    console.log(consulsesion);
    return res.json({data5: consulsesion}); 
   
    
  });



module.exports = router;
