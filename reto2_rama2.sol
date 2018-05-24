pragma solidity ^0.4.3;
contract Reto2 {
 /*--------------------------ESTADOS Y DEFINICIONES DEL SISTEMA-----------------------*/ 
    address creador;
    //uint duracionSesion = 300;//Despues de 300 segundos al tratar de ejecutar una función se desactiva la sesión
    uint cantidadDiplomas = 0;//conteo de diplomas
    mapping(bytes32 => bytes32) diplomas;//Relación código a hash del diploma
    mapping(bytes32 => bytes32) listaDiplomas;//Indexa con el código y almacena el código para poder establecer si ya existe
    mapping(uint => Funcionario) funcionarios; //Lista indexada de Funcionarios de estructura Funcionario, el indice es la cédula
    uint[] cedulasFuncionarios;// Permite visualizar la lista completa de cédulas
    struct Funcionario { //Estructura del Funcionario
        uint cedula;
        string nombre;
        bytes32 contrasena;
        bytes32 documentoSecreto;
        uint rol;//2: Director, 3: Funcionario, 5: retirado, 0: inválido
        bytes32 sesion;//Hash del sesionID aleatorio que identifica cada sesion
        bytes32 sesionIDTemporal;//almacenamiento temporal del SesionID en texto plano
        bool sesionActiva;//sesion activa o inactiva
        uint tiempoInicial;
        bool habilitado;//habilitado para subir hash
    }
/*-----------------------    Eventos--------------------------------------------*/
event EventoIngresar(uint indexed cedula);
event EventoSalir(uint indexed cedula);
event EventoAgregarFuncionario(uint indexed cedula);
event EventoCambiarContrasena(uint indexed cedula);
event EventoHabilitarFuncionario(uint indexed cedulaRol3,uint indexed cedulaRol4);
event EventoAgregarDiploma(uint indexed cedula,bytes32 indexed codigo,bytes32 indexed hashDiploma);
event EventoDeshabilitarFuncionario(uint indexed cedula);

/*---------------------------Funciones del sistema------------------------------------*/
    function Reto2(uint cedula, string contrasena,string documentoSecreto)public {//Constructor: se agrega el usuario Director de la institución
         creador = msg.sender;
         funcionarios[cedula].cedula = cedula;
         funcionarios[cedula].nombre = "Dirección de la Universidad";
         funcionarios[cedula].contrasena = keccak256(contrasena,funcionarios[cedula].nombre); //Se almacena el hash de la contraseña salado
         funcionarios[cedula].documentoSecreto = keccak256(documentoSecreto,funcionarios[cedula].nombre);
         funcionarios[cedula].rol = 2;
         funcionarios[cedula].sesion = "0";
         funcionarios[cedula].sesionActiva = false;
         funcionarios[cedula].habilitado = false;
         cedulasFuncionarios.push(cedula);
    }
    function ingresar(uint cedula,string contrasena,string documentoSecreto)public {
        require(msg.sender == creador);
        if (funcionarios[cedula].contrasena == keccak256(contrasena,funcionarios[cedula].nombre) && funcionarios[cedula].documentoSecreto == keccak256(documentoSecreto,funcionarios[cedula].nombre)) {
           funcionarios[cedula].sesionIDTemporal = keccak256(block.timestamp,contrasena); //Se genera un identificador de sesión con el hash del tiempo de bloque y la contraseña
           bytes32 sesionID = funcionarios[cedula].sesionIDTemporal;
           funcionarios[cedula].sesion = keccak256(sesionID); //se almacena el hash del sesionID
           funcionarios[cedula].tiempoInicial = block.timestamp;
           funcionarios[cedula].sesionActiva = true;
           EventoIngresar(cedula);
        }   
    }
    function enviarSesionID(uint cedula,string contrasena,string documentoSecreto)public constant returns(bytes32 sesionID,uint rol) {
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].contrasena == keccak256(contrasena,funcionarios[cedula].nombre) && funcionarios[cedula].documentoSecreto == keccak256(documentoSecreto,funcionarios[cedula].nombre)) {
        sesionID = funcionarios[cedula].sesionIDTemporal;
        rol = funcionarios[cedula].rol;
        return (sesionID,rol);
        }else {
            return (sesionID,0);
        }
    }
    function borrarSesionIdTemporal(uint cedula)public {
        funcionarios[cedula].sesionIDTemporal = "0";
    }
    function salir(uint cedula, bytes32 sesionID)public {
        require(msg.sender == creador);
        if (funcionarios[cedula].sesion == keccak256(sesionID)) {
            funcionarios[cedula].sesion = "0";
            funcionarios[cedula].sesionActiva = false;
            EventoSalir(cedula);
        }
    }
//  function verificarDuracionSesion(uint cedula)internal {
//     if (block.timestamp - funcionarios[cedula].tiempoInicial > duracionSesion) {
//            funcionarios[cedula].sesionActiva = false;
//     }
//   }

    function agregarFuncionario(uint cedula,bytes32 sesionID,uint nuevaCedula,string nuevaContrasena,string nuevoDocumentoSecreto,string nuevoNombre, uint nuevoRol)public { //Se agrega un funcionario a la lista de funcionarios
         require(msg.sender == creador);//solo un nodo con el address del creador puede realizar operaciones
        // verificarDuracionSesion(cedula);
         if (funcionarios[cedula].sesionActiva && funcionarios[cedula].sesion == keccak256(sesionID) && funcionarios[cedula].rol == 2) {
             if (nuevaCedula != funcionarios[nuevaCedula].cedula) {
                funcionarios[nuevaCedula].cedula = nuevaCedula;
                funcionarios[nuevaCedula].nombre = nuevoNombre;
                funcionarios[nuevaCedula].contrasena = keccak256(nuevaContrasena,nuevoNombre); //Se almacena el hash de la contraseña salado con el nombre
                funcionarios[nuevaCedula].documentoSecreto = keccak256(nuevoDocumentoSecreto,nuevoNombre);
                funcionarios[nuevaCedula].rol = nuevoRol;
                funcionarios[nuevaCedula].sesion = "0";
                funcionarios[nuevaCedula].habilitado = false;
                cedulasFuncionarios.push(nuevaCedula);  
                EventoAgregarFuncionario(cedula);
             }        
        }
    } 
    function cambiarContrasena(uint cedula,string contrasena,bytes32 sesionID,string nuevaContrasena)public {
        require(msg.sender == creador);
       // verificarDuracionSesion(cedula);
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].contrasena == keccak256(contrasena,funcionarios[cedula].nombre) && funcionarios[cedula].sesion == keccak256(sesionID)) {
            funcionarios[cedula].contrasena = keccak256(nuevaContrasena);
            EventoCambiarContrasena(cedula);
        }
    }

    function consultarcontrasena(uint cedula,string contrasena,bytes32 sesionID) public constant returns( bool) {
       require(msg.sender == creador);
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].contrasena == keccak256(contrasena,funcionarios[cedula].nombre) && funcionarios[cedula].sesion == keccak256(sesionID)) {
            return true;
        }
        else {
            return false;
        }
    }

    function habilitarFuncionario(uint cedulaRol2,bytes32 sesionIdRol2,uint cedulaRol3)public {
       require(msg.sender == creador);
       //verificarDuracionSesion(cedulaRol3);
       if (funcionarios[cedulaRol2].sesionActiva && funcionarios[cedulaRol2].sesion == keccak256(sesionIdRol2) && funcionarios[cedulaRol2].rol == 2) {
            funcionarios[cedulaRol3].habilitado = true;
            EventoHabilitarFuncionario(cedulaRol2,cedulaRol3);
       }
    }
    function agregarDiploma (uint cedula,bytes32 sesionID,string nuevoHash,bytes32 nuevoCodigo)public {
        require(msg.sender == creador);
        //verificarDuracionSesion(cedula);
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].sesion == keccak256(sesionID) && funcionarios[cedula].rol == 3 && funcionarios[cedula].habilitado) {
            if (listaDiplomas[nuevoCodigo] != nuevoCodigo) {
                 cantidadDiplomas += 1;
                 diplomas[nuevoCodigo] = keccak256(nuevoHash);//Se almacena el hash del hash del diploma
                 listaDiplomas[nuevoCodigo] = nuevoCodigo;
                 EventoAgregarDiploma(cedula,nuevoCodigo,diplomas[nuevoCodigo]);
            }
        }
    } 
    function desabilitarFuncionario(uint cedula,bytes32 sesionID,uint cedulaFuncionario)public {
        require(msg.sender == creador);
        //verificarDuracionSesion(cedula);
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].sesion == keccak256(sesionID) && funcionarios[cedula].rol == 2) {
            funcionarios[cedulaFuncionario].habilitado = false;
            EventoDeshabilitarFuncionario(cedulaFuncionario);
        }
    }
    function verificarDiploma(bytes32 codigoDiploma, string hashVerificar)public constant returns(string mensaje) {
                  if (diplomas[codigoDiploma] == keccak256(hashVerificar)) {
                    mensaje = "El diploma es auténtico";
                  }else {
                   mensaje = "El diploma ha sido alterado";
                  }
        return mensaje;
    }
    function conteoDiplomas()public constant returns(uint) {
        return cantidadDiplomas;
    } 
    function verFuncionario(uint cedula,bytes32 sesionID,uint cedulaFuncionario)public constant returns(string nombre, uint rol,bool habilitado) {
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].sesion == keccak256(sesionID) && funcionarios[cedula].rol == 2) {
          nombre = funcionarios[cedulaFuncionario].nombre;
          rol = funcionarios[cedulaFuncionario].rol;
          habilitado = funcionarios[cedulaFuncionario].habilitado;
          return (nombre,rol,habilitado);
        }
    } 
        function verFuncionario2(uint cedulaFuncionario)public constant returns(string nombre, uint rol,bool habilitado) {
          nombre = funcionarios[cedulaFuncionario].nombre;
          rol = funcionarios[cedulaFuncionario].rol;
          habilitado = funcionarios[cedulaFuncionario].habilitado;
          return (nombre,rol,habilitado);       
    }
    function verFuncionarios(uint cedula,bytes32 sesionID)public constant returns(uint[]) {
        if (funcionarios[cedula].sesionActiva && funcionarios[cedula].sesion == keccak256(sesionID) && funcionarios[cedula].rol == 2) {
        return cedulasFuncionarios;
        }    
    } 
        function verFuncionarios2()public constant returns(uint[]) {
        return cedulasFuncionarios;         
    } 
    function verDiploma(bytes32 codigo)public constant returns(bytes32) {
        return diplomas[codigo];
    } 
    function verEstadoSesion(uint cedula)public constant returns(bool,string) {
             if (funcionarios[cedula].sesionActiva) {
                 return (true,"Sesión activa");
             }else {
                 return (false,"Sesión inactiva");
             }
    }

}
