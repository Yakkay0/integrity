Web3 = require('web3')

try {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var balance=web3.eth.getBalance(coinbase).toNumber();
}
catch(err) {
   console.log("ud no esta nonectado a una red blockchian")
}


var coinbase= web3.eth.coinbase;
var hola="hello world";
var balance=web3.eth.getBalance(coinbase).toNumber();
console.log("el balance de la cuenta es:");
console.log("el balance de la cuenta es:");
//console.log(web3.version);
//web3.eth.getAccounts(console.log);
var cuentas=web3.eth.getAccounts;
console.log(cuentas);
var numerobloques=web3.eth.blockNumber;
//console.log("numero de bloques en la blockchain:");
console.log("el numero de bloques es:");
console.log(numerobloques);
//version del nodo 
var version = web3.version.node;
console.log(version);
/// verificar si se esta conectado a la red privada etheruem
if(web3.isConnected()) {
    
    console.log("usted esta conectado");
  
  } else {
   
    console.log("usted no esta conectado");
    
  }
// codificacion y decodificacion de hashs

var hash = web3.sha3("Some string to be hashed");
//console.log(hash); // "0xed973b234cf2238052c9ac87072c71bcf33abc1bbd721018e0cca448ef79b379"

var hashOfHash = web3.sha3(hash, {encoding: 'hex'});
//console.log(hashOfHash); // "0x85dd39c91a64167ba20732b228251e67caed1462d4bcf036af88dc6856d0fdcc"

// conversion a ascii
var str = web3.toAscii("0x85dd39c91a64167ba20732b228251e67caed1462d4bcf036af88dc6856d0fdcc");
//console.log(str); // "ethereum"


// obtener cuenta por default
var defaultAccount = web3.eth.defaultAccount;
console.log("cuenta default"); 
console.log(defaultAccount); 

// Estado de la sincronización  de los bloques 
var sync = web3.eth.syncing;
console.log(sync);

/*
function    doGetNodeStatus()  {
    
        // Asynch version
        web3.net.getListening(function(error, result){
            if(error) setData('get_peer_count',error,true);
            else {
                // Since connected lets get the count
                web3.net.getPeerCount(  function(  error,  result ) {
                if(error){
                    setData('get_peer_count',error,true);
                } else {
                    setData('get_peer_count','Peer Count: '+result,(result == 0));
                }
            });
            }
        });
    }*/

  /*  web3.eth.isSyncing(function(error, sync){
        if(!error) {
            // stop all app activity
            if(sync === true) {
               // we use `true`, so it stops all filters, but not the web3.eth.syncing polling
               web3.reset(true);
            
            // show sync info
            } else if(sync) {
               console.log(sync.currentBlock);
            
            // re-gain app operation
            } else {
                // run your app init function...
            }
        }
    }); */

    //valor del gas 
    var gasPrice = web3.eth.gasPrice;
    console.log("valor del precio del gas:");
    console.log(gasPrice.toString(10));

    //cuentas 
    var accounts = web3.eth.accounts;
    console.log("cuentas nodos de la blockchain:");
    console.log(accounts);

    //información cliptografica del bloque 
    var info = web3.eth.getBlock(3);
    console.log("información del bloque 3:");
    console.log(info);

/// información cliptografica del bloque 
    var info = web3.eth.getBlock(4);
    console.log("información del bloque 4:");
    console.log(info);

    /// información cliptografica del bloque 
    var info = web3.eth.getBlock(5);
    console.log("información del bloque 5:");
    console.log(info);


    var info = web3.eth.getBlock(5086);
    console.log("información del bloque 5086:");
    console.log(info);

    var info = web3.eth.getBlock(5087);
    console.log("información del bloque 5087:");
    console.log(info);


 // numero de peers a los que la blockchain esta conectada
 var peerCount = web3.net.peerCount;
 console.log("los numeros de peers a los que se esta conectados son:")
 console.log(peerCount);   