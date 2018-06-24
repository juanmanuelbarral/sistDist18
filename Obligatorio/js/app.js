var usuario = {
    id : "",
    rol : "",
};

var calificacion = {
    idUsuario : "",
    rolUsuario : "",
    idPartido : "",
    idEquipo : "",
    camisetaJugador : "",
    calificacion : 0,
};
//Objetos que pueden ser necesarios despues, o no... ver --------------------------------
var partidos = [];
var equipos = [];
var jugadores = [];
var partidosTerminados = [];
var jugadoresEvaluados = [];
var fans = [];
var periodistas = [];
// --------------------------------------------------------------------------------------

// Objeto Vue para el modal
var modalContacto = new Vue({
    el: "#modal-contacto",
    data: {
        usuarioNombre : "",
        usuarioRol : "",
        usuarioEmail : "",
        usuarioPuntos : "",
    }
});

// Objeto Vue para la pagina de calificacion
var appCalificacion = new Vue({
    el: "#app-calificacion",
    data: {
        // DATOS DEL VUE
        partidos_vue : [],
        // Los objetos partido van a tener (al menos) los atributos LOCAL, VISITANTE, FECHA, HORA, IDPARTIDO
        equipos_vue : [],
        // Los objetos equipo van a tener (al menos) los atributos NOMBRE (del pais), IMAGE (para la ruta a la bandera), IDEQUIPO
        jugadores_vue : [],
        // JUGADORES (una lista de los jugadores de los equipos seleccionados)
        // a su vez, lo jugadores tienen que tener un atributo IDEQUIPO, IDJUGADOR y NOMBRE, CALIFICACION
        calificaciones_vue : [],
        // crear la lista de calificaciones
        partido_selected : "",

    }
});

// Objeto Vue para la pagina de resultado
var appResultados = new Vue({
    el: "#app-resultados",
    data: {
        // DATOS DEL VUE
        partidosTerminados_vue : [],
        // Los objetos partido van a tener (al menos) los atributos LOCAL, VISITANTE, FECHA, HORA, IDPARTIDO
        equipos_vue : [],
        // Los objetos equipo van a tener (al menos) los atributos NOMBRE (del pais), IMAGE (para la ruta a la bandera), IDEQUIPO
        jugadoresEvaluados_vue : [],
        // JUGADORES (una lista de los jugadores evaluados de los equipos seleccionados)
        // a su vez, lo jugadores tienen que tener un atributo IDEQUIPO, IDJUGADOR, NOMBRE y CALIFICACION
        partido_selected : "",
    }
});

// Objeto Vue para la pagina de ranking-fans
var appRankingFans = new Vue({
    el: "#app-ranking-fans",
    data: {
        // DATOS DEL VUE
        fans_vue : [],
        //Objetos fan que por lo menos tienen los atributos NOMBRE y PUNTAJE
    }
});

// Objeto Vue para la pagina de ranking-periodistas
var appRankingPeriodistas = new Vue({
    el: "#app-ranking-periodistas",
    data: {
        // DATOS DEL VUE
        periodistas_vue : [],
        //Objetos periodista que por lo menos tienen los atributos NOMBRE y PUNTAJE
    }
});



// ------------------------------- para pagina INDEX -----------------------------------------
// hacer la funcion que se ejecuta al presionar el boton ingresar
// ------------------------------- para pagina INDEX -----------------------------------------



// ------------------------------- para pagina REGISTRAR -----------------------------------------
// hacer la funcion que se ejecuta al presionar el boton registrar
// ------------------------------- para pagina REGISTRAR -----------------------------------------



// ------------------------------- para pagina CALIFICACION -----------------------------------------
// Funcion que se ejecuta al cargar la pagina Calificacion
function onLoadCalificacion(){
    //Solicitud AJAX con jQuery para obtener los partidos que se pueden calificar
    $.ajax({
        method : "GET",
        // url : "https://ha.edu.uy/api/brands", --> ACÁ IRÍA EL LINK DE DONDE SE OBTIENE LA INFO PARA PARTIDOS A SER JUGADOS
        success : function (data) {
            appCalificacion.partidos_vue = data;
        },
        error : function() {
            alert("No se pudo obtener la info de la API partidos a ser jugados!");
        }
    });
    
    //Con un for se crean los elementos del array calificaciones (del 1 al 10 en el caso de fans, y periodistas con decimales)
    if(usuario.rol == "fan"){
        for (var i = 1; i <= 10; i++) {
            appCalificacion.calificaciones_vue.push(i);
        }
    } else {
        // rol de periodista puede calificar con decimales
        // ver si el formato de decimales esta bien 
        for (var i = 1; i <= 10; i = i+0,1) {
            appCalificacion.calificaciones_vue.push(i);
        }
    }
};

//Funcion para el boton CALIFICAR que obtiene los equipos involucrados en el partido seleccionado
//entonces hace una solicitud AJAX con jQuery de la informacion de esos equipos y jugadores
$("#btn-calificar").on("click", function(){
    var partido = appCalificacion.partido_selected;
    if(partido != ""){
        //Obtengo la info de los equipos
        appCalificacion.equipos_vue.push(partido.local);
        appCalificacion.equipos_vue.push(partido.visitante);
        
        //Obtengo los jugadores de cada equipo
        var auxJugadores = [];
        //Jugadores del local
        $.ajax({
            method : "GET",
            // url : "https://ha.edu.uy/api/brands", --> LINK PARA JUGADORES LOCALES
            success : function (data) {
                auxJugadores = auxJugadores.concat(data);
            },
            error : function() {
                alert("No se pudo obtener la info de la jugadores locales!");
            }
        });
        
        //Jugadores del visitante
        $.ajax({
            method : "GET",
            // url : "https://ha.edu.uy/api/brands", --> LINK PARA JUGADORES VISITANTES
            success : function (data) {
                auxJugadores = auxJugadores.concat(data);
            },
            error : function() {
                alert("No se pudo obtener la info de la jugadores locales!");
            }
        });
        
        appCalificacion.jugadores_vue = auxJugadores;
    }
});

// Funcion para cuando se apreta el enviar calificaciones
// verifica se haya votado a todos los jugadores de los equipos, y envia las predicciones
// al servidor para que las haga persistentes en la base de datos
// mostrar mensajes de si se pudo o no registrar dichas predicciones
$("#btn-enviar-calificaciones").on("click", function(){
    var calificados = todosCalificados(appCalificacion.jugadores_vue);
    var calificaciones = [];
    if(calificados){
        calificacion.idUsuario = usuario.id;
        calificacion.rolUsuario = usuario.rol;
        calificacion.idPartido = appCalificacion.partido_selected.idPartido;

        appCalificacion.jugadores_vue.array.forEach(function(jugador){
           calificacion.idEquipo = jugador.idEquipo;
           calificacion.camisetaJugador = jugador.camisetaJugador;
           calificacion.calificacion = jugador.calificacion;
           
           var jsonCalificacion = JSON.stringify(calificacion);
           calificaciones.push(jsonCalificacion);
        });
        //en calificaciones estan todos los jsons de calificaciones

        //Hago un POST con las calificaciones
        $.ajax({
            method : "POST",
            // url : "https://ha.edu.uy/api/brands", --> LINK PARA RECIBIR LAS CALIFICACIONES
            data : JSON.stringify(calificaciones),
            success : function (data) {
                alert("Se enviaron tus calificaciones!");
            },
            error : function() {
                alert("Lo sentimos pero no se pudieron enviar tus calificaciones!");
            }
        });
        
        calificacion.idEquipo = "";
        calificacion.camisetaJugador = "";
        calificacion.calificacion = 0;
    } else{
        alert("Debes calificar a todos los jugadores primero");
    }
});

// ------------------------------- para pagina CALIFICACION -----------------------------------------



// ------------------------------- para pagina RESULTADOS -----------------------------------------
//hacer una solicitud AJAX con jQuery para obtener los partidos terminados
// 
//hacer una funcion para el boton ver que obtiene los equipos involucrados en el partido terminado
//entonces hace una solicitud AJAX con jQuery de la informacion de esos equipos
// ------------------------------- para pagina RESULTADOS -----------------------------------------



// ------------------------------- para pagina RANKING FANS -----------------------------------------
//Con jQuery y AJAX hay que solicitar los json de los fans
//Se podría llegar a hacer un filtro
// ------------------------------- para pagina RANKING FANS -----------------------------------------



// ------------------------------- para pagina RANKING PERIODISTAS -----------------------------------------
//Con jQuery y AJAX hay que solicitar los json de los periodistas
//Se podría llegar a hacer un filtro
// ------------------------------- para pagina RANKING PERIODISTAS -----------------------------------------

// ------------------------------- FUNCIONES AUXILIARES -----------------------------------------
function todosCalificados(lista){
    var len = lista.length;
    for(var i=0; i<len; i++){
        if(lista[i].calificacion == 0){
            return false;
        }
    }
    return true;
}