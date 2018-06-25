// ROLES
// periodista = 1
// fan = 2

var usuario = {
    email : "",
    rol : 0,
};

// Objeto Vue para el modal
var modalContacto = new Vue({
    el: "#modal-contacto",
    data: {
        usuarioEmail : "",
        usuarioRol : "",
        usuarioNombre : "",
        usuarioApellido : "",
        usuarioPuntos : 0,
    }
});

// Objeto para la pagina index (login)
var appLogin = new Vue({
    el: "#app-login",
    data: {
        email_selected: "",
        contra_selected: "",
    }
});

// Objeto para la pagina registrar
var appRegistrar = new Vue({
    el: "#app-registrar",
    data: {
        email_selected: "",
        contra_selected: "",
        contra2_selected: "",
        nombre_selected: "",
        apellido_selected: "",
        rol_selected: "",
    }
});

// Objeto Vue para la pagina de calificacion
var appCalificacion = new Vue({
    el: "#app-calificacion",
    data: {
        // DATOS DEL VUE
        partidos_vue : [],
        // Objetos partido:{local_nombre, visita_nombre, local_equipo <id del equipo>, visita_equipo <id del equipo>, date, id <id del partido>}
        equipos_vue : [],
        // Objetos equipo:{equipo <id del equipo>, nombre, urlFoto}
        jugadores_vue : [],
        // Objetos jugadores:{equipo <id del equipo pertenecen>, camiseta, nombre, calificacion <=0>}
        calificaciones_vue : [],
        partido_selected : "",
        
    },
    methods: {
        sortCamiseta: function(jugadores) {
          // Set slice() to avoid to generate an infinite loop!
          return jugadores.slice().sort(function(a, b) {
            return a.camiseta - b.camiseta;
          });
        }
    }
});

// Objeto Vue para la pagina de resultado
var appResultados = new Vue({
    el: "#app-resultados",
    data: {
        // DATOS DEL VUE
        partidosTerminados_vue : [],
        // Objetos partido:{local_nombre, visita_nombre, local_equipo <id del equipo>, visita_equipo <id del equipo>, date, id <id del partido>}
        equipos_vue : [],
        // Objetos equipo:{equipo <id del equipo>, nombre, urlFoto}
        jugadoresEvaluados_vue : [],
        // Objetos jugadores:{equipo <id del equipo pertenecen>, camiseta, nombre, calificacion <=0>}
        partido_selected : "",
    },
    methods: {
        sortCamiseta: function(jugadores) {
          // Set slice() to avoid to generate an infinite loop!
          return jugadores.slice().sort(function(a, b) {
            return a.camiseta - b.camiseta;
          });
        }
    }
});

// Objeto Vue para la pagina de ranking-fans
var appRankingFans = new Vue({
    el: "#app-ranking-fans",
    data: {
        // DATOS DEL VUE
        fans_vue : [],
        //Objetos fan: {nombre, apellido, puntaje}
    },
    methods: {
        sortPuntaje: function(fans) {
          // Set slice() to avoid to generate an infinite loop!
          return fans.slice().sort(function(a, b) {
            return b.puntaje - a.puntaje;
          });
        }
    }
});

// Objeto Vue para la pagina de ranking-periodistas
var appRankingPeriodistas = new Vue({
    el: "#app-ranking-periodistas",
    data: {
        // DATOS DEL VUE
        periodistas_vue : [],
        //Objetos periodista: {nombre, apellido, puntaje}
    },
    methods: {
        sortPuntaje: function(periodistas) {
          // Set slice() to avoid to generate an infinite loop!
          return periodistas.slice().sort(function(a, b) {
            return b.puntaje - a.puntaje;
          });
        }
    }
});

function alIniciar(){
    usuario.email = localStorage.getItem("email");
    modalContacto.usuarioEmail = localStorage.getItem("email");
    modalContacto.usuarioRol = localStorage.getItem("rol");
    if(modalContacto.usuarioRol == "Periodista"){
        usuario.rol = 1;
    } else{
        usuario.rol = 2;
    }
    modalContacto.usuarioNombre = localStorage.getItem("nombre");
    modalContacto.usuarioApellido = localStorage.getItem("apellido");
    modalContacto.usuarioPuntos = localStorage.getItem("puntaje");
}



// ------------------------------- para pagina INDEX -----------------------------------------
// Funcion que se ejecuta al presionar el boton INGRESAR
$("#btn-ingresar").on("click", function(){
    // var direccion = window.location.href.split("/");
    // direccion[direccion.length-1] = "calificacion.html";
    // direccion = direccion.join("/");
    // window.location.href = direccion;

    // GET con parametros los datos del usuario
    var auxEmail = appLogin.email_selected;
    var auxContra = appLogin.contra_selected;
    var direLogin = "http://localhost:8080/rest/users/login?email=" + auxEmail + "&contrasena=" + auxContra;

    $.ajax({
        method : "GET",
        url : direLogin,
        success : function (data) {
            if(data != ""){
                localStorage.setItem("email",data.email);
                localStorage.setItem("nombre",data.nombre);
                localStorage.setItem("apellido",data.apellido);
                var auxPuntaje = "" + data.puntaje;
                localStorage.setItem("puntaje", auxPuntaje);
                if(data.rol == 1){
                    modalContacto.usuarioRol = "Periodista";
                    localStorage.setItem("rol","Periodista");
                } else{
                    modalContacto.usuarioRol = "Fan";
                    localStorage.setItem("rol","Fan");
                }
                usuario.email = data.email;
                usuario.rol = data.rol;
                modalContacto.usuarioNombre = data.nombre;
                modalContacto.usuarioApellido = data.apellido;
                modalContacto.usuarioEmail = data.email;
                modalContacto.usuarioPuntos = data.puntaje;
                
                //cargar calificacion.html
                var direccion = window.location.href.split("/");
                direccion[direccion.length-1] = "calificacion.html";
                direccion = direccion.join("/");
                window.location.href = direccion;
            } else{
                alert("Las credenciales ingresadas no son correctas");
            }
        },
        error : function() {
            alert("El loggeo no fue exitoso, revise los datos ingresados");
        }
    });
});
// ------------------------------- para pagina INDEX -----------------------------------------



// ------------------------------- para pagina REGISTRAR -----------------------------------------
// Funcion que se ejecuta al presionar el boton REGISTRAR
$("#btn-registrar").on("click", function(){
    var auxEmail = appRegistrar.email_selected;
    var auxContra = appRegistrar.contra_selected;
    var auxContra2 = appRegistrar.contra2_selected;
    var auxNombre = appRegistrar.nombre_selected;
    var auxApellido = appRegistrar.apellido_selected;
    var auxRol = appRegistrar.rol_selected;

    var direccion = "http://localhost:8080/rest/users/registro?email=" + auxEmail + "&nombre=" + auxNombre + "&apellido=" + auxApellido + "&contrasena=" + auxContra + "&rol=" + auxRol + "&pais=x";

    if(auxContra == auxContra2){
        $.ajax({
            method : "POST",
            url : direccion,
            success : function (data) {
                if(data != ""){
                    localStorage.setItem("email",data.email);
                    localStorage.setItem("nombre",data.nombre);
                    localStorage.setItem("apellido",data.apellido);
                    var auxPuntaje = "" + data.puntaje;
                    localStorage.setItem("puntaje", auxPuntaje);
                    if(data.rol == 1){
                        modalContacto.usuarioRol = "Periodista";
                        localStorage.setItem("rol","Periodista");
                    } else{
                        modalContacto.usuarioRol = "Fan";
                        localStorage.setItem("rol","Fan");
                    }
                    usuario.email = data.email;
                    usuario.rol = data.rol;
                    modalContacto.usuarioNombre = data.nombre;
                    modalContacto.usuarioApellido = data.apellido;
                    modalContacto.usuarioEmail = data.email;
                    modalContacto.usuarioPuntos = data.puntaje;
                    
                    //cargar calificacion.html
                    var direccion = window.location.href.split("/");
                    direccion[direccion.length-1] = "calificacion.html";
                    direccion = direccion.join("/");
                    window.location.href = direccion;
                } else{
                    alert("Las credenciales ingresadas no son correctas");
                }
            },
            error : function() {
                alert("El loggeo no fue exitoso, revise los datos ingresados");
            }
        });
    } else{
        alert("Las contraseñas ingresadas no concuerdan!");
    }

});
// ------------------------------- para pagina REGISTRAR -----------------------------------------



// ------------------------------- para pagina CALIFICACION -----------------------------------------
// Funcion que se ejecuta al cargar la pagina Calificacion
function onLoadCalificacion(){
    alIniciar();

    if(usuario.rol == 2){
        // es un fan, no puede simular el fin del periodo de votacion
        $("#simular-promediar").hide();
    }

    // Solicitud AJAX con jQuery para obtener los partidos que se pueden calificar
    var direccion = "http://localhost:8080/rest/matches/";
    if(usuario.rol == 1){
        direccion += "allGamesPeriodista";
    } else{
        direccion += "allGamesAficionado";
    }
    $.ajax({
        method : "GET",
        url : direccion,
        success : function (data) {
            appCalificacion.partidos_vue = data;
        },
        error : function() {
            alert("No se pudo obtener la info de la API partidos a ser jugados!");
        }
    });
    
    //Con un for se crean los elementos del array calificaciones (del 1 al 10 en el caso de fans, y periodistas con decimales)
    for (var i = 1; i <= 10; i++) {
        appCalificacion.calificaciones_vue.push(i);
    }
   
};

//Funcion para el boton CALIFICAR que obtiene los equipos involucrados en el partido seleccionado
//entonces hace una solicitud AJAX con jQuery de la informacion de esos equipos y jugadores
$("#btn-calificar").on("click", function(){
    var partido = appCalificacion.partido_selected;
    if(partido != ""){
        //Obtengo la info de los equipos
        var direEquipos = "http://localhost:8080/rest/fotos/load/equipo?equipo=";
        var direJugadores = "http://localhost:8080/rest/players/allPlayers/id?id=";
        var aux = "";
        var auxJugadores = [];
        appCalificacion.equipos_vue = [];

        //GET del equipo local
        aux = direEquipos + partido.local_equipo;
        $.ajax({
            method : "GET",
            url : aux,
            success : function (data) {
                // Inserto el equipo en el array de equipos del vue
                appCalificacion.equipos_vue.push(data);
                
                // GET del equipo visita
                aux = direEquipos + partido.visita_equipo;
                $.ajax({
                    method : "GET",
                    url : aux,
                    success : function (data) {
                        // Inserto el equipo en el array de equipos del vue
                        appCalificacion.equipos_vue.push(data);
                        
                        //Obtengo los jugadores del equipo local
                        aux = direJugadores + partido.local_equipo;
                        $.ajax({
                            method : "GET",
                            url : aux,
                            success : function (data) {
                                auxJugadores = auxJugadores.concat(data);
                                
                                // Obtengo los jugadores del equipo visitante
                                aux = direJugadores + partido.visita_equipo;
                                $.ajax({
                                    method : "GET",
                                    url : aux,
                                    success : function (data) {
                                        auxJugadores = auxJugadores.concat(data);
                                        
                                        //Inserto los jugadores en el array de jugadores de vue
                                        appCalificacion.jugadores_vue = auxJugadores;
                                    },
                                    error : function() {
                                        alert("No se pudo obtener la info de los jugadores de " + partido.visita_nombre + "!");
                                    }
                                });
                            },
                            error : function() {
                                alert("No se pudo obtener la info de la jugadores de " + partido.local_nombre + "!");
                            }
                        });
                    },
                    error : function() {
                        alert("No se pudo obtener la info de " + partido.visita_nombre + "!");
                    }
                });
            },
            error : function() {
                alert("No se pudo obtener la info de " + partido.local_nombre + "!");
            }
        });
        
    }
});



// Boton para enviar las calificaciones al servidor
$("#btn-enviar-calificaciones").on("click", function(){
    var idUsuario = usuario.email;
    var idPartido = appCalificacion.partido_selected.id;
    var listaJugadores = appCalificacion.jugadores_vue;
    var len = listaJugadores.length;
    
    alert("Sus calificaciones se estan enviando");
    enviarCalificacionesRecursiva(idUsuario, idPartido, listaJugadores, len-1);
});

function enviarCalificacionesRecursiva(idUsuario,idPartido, listaJugadores, indice){
    console.log("entrada recursiva: " + indice);
    if(indice < 0){
        alert("Exito, se registraron sus calificaciones!");
        return;
    } else{
        var jugador = listaJugadores[indice];
        if(jugador.calificacion != 0){
            $.ajax({
                method : "POST",
                url : "http://localhost:8080/rest/players/calificar?idUsuario=" + idUsuario + "&idPartido=" + idPartido + "&jugador_camiseta=" + jugador.camiseta + "&id_equipo=" + jugador.equipo + "&puntaje=" + jugador.calificacion,
                success : function (data) {
                    enviarCalificacionesRecursiva(idUsuario, idPartido, listaJugadores, indice-1);
                },
                error : function() {
                    console.log("error en envio de calificacion: " + indice);
                    enviarCalificacionesRecursiva(idUsuario, idPartido, listaJugadores, indice-1);
                }
            });
        } else{
            enviarCalificacionesRecursiva(idUsuario, idPartido, listaJugadores, indice-1);
            console.log("calificacion de 0 encontrada");
        }
    }
}



// Botón para simular el evento promediar un partido con sus correspondientes calificaciones
$("#btn-promediar").on("click", function(){
    var idPartido = appCalificacion.partido_selected.id;

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/rest/jugadoresCalificados/actualizarPromedio?partido=" + idPartido,
        success : function (data) {
            alert("Se estan promediando las calificaciones para el partido: " + idPartido);
            console.log("Se envio la orden de promediar las calificaciones para los jugadores del partido: " + idPartido);
        },
        error : function() {
            console.log("Error al enviar la orden de promediar");
        }
    });    
});
// ------------------------------- para pagina CALIFICACION -----------------------------------------



// ------------------------------- para pagina RESULTADOS -----------------------------------------
//hacer una solicitud AJAX con jQuery para obtener los partidos terminados
function onLoadResultados(){
    alIniciar();

    // Solicitud AJAX con jQuery para obtener los partidos ya calificados y promediados
    // $.ajax({
    //     method : "GET",
    //     url : "https://", //--> ACÁ IRÍA EL LINK DE DONDE SE OBTIENE LA INFO PARA PARTIDOS
    //     success : function (data) {
    //         appResultados.partidosTerminados_vue = data;
    //     },
    //     error : function() {
    //         alert("No se pudo obtener la info de la API partidos!");
    //     }
    // });
};


// Funcion para el boton VER que obtiene los equipos involucrados en el partido terminado
$("#btn-ver").on("click", function(){
    var partido = appResultados.partido_selected;
    if(partido != ""){
        //Obtengo la info de los equipos
        appResultados.equipos_vue.push(partido.local);
        appResultados.equipos_vue.push(partido.visita);
        
        //Obtengo los jugadores de cada equipo
        var direJugadores = "http://localhost:8080/rest/players/allPlayers/id?id=";
        var auxJugadores = [];

        //Jugadores del local
        var aux1 = direJugadores + partido.local.equipo;
        $.ajax({
            method : "GET",
            url : aux1,
            success : function (data) {
                auxJugadores = auxJugadores.concat(data);
                
                //Jugadores del visitante
                var aux2 = direJugadores + partido.visita.equipo;
                $.ajax({
                    method : "GET",
                    url : aux2,
                    success : function (data) {
                        auxJugadores = auxJugadores.concat(data);
                        
                        appResultados.jugadoresEvaluados_vue = auxJugadores;
                    },
                    error : function() {
                        alert("No se pudo obtener la info de la jugadores visitantes!");
                    }
                });
            },
            error : function() {
                alert("No se pudo obtener la info de la jugadores locales!");
            }
        });
        
        
    }
});
// ------------------------------- para pagina RESULTADOS -----------------------------------------



// ------------------------------- para pagina RANKING FANS -----------------------------------------
//Con jQuery y AJAX hay que solicitar los json de los fans
function onLoadRankingFans(){
    alIniciar();

    // Solicitud AJAX con jQuery para obtener los partidos ya calificados y promediados
    $.ajax({
        method : "GET",
        url : "https://localhost:8080/rest/users/allAficionados",
        success : function (data) {
            appRankingFans.fans_vue = data;
        },
        error : function() {
            alert("No se pudo obtener ranking de fans!");
        }
    });
};
// ------------------------------- para pagina RANKING FANS -----------------------------------------



// ------------------------------- para pagina RANKING PERIODISTAS -----------------------------------------
//Con jQuery y AJAX hay que solicitar los json de los periodistas
function onLoadRankingPeriodistas(){
    alIniciar();

    // Solicitud AJAX con jQuery para obtener los partidos ya calificados y promediados
    $.ajax({
        method : "GET",
        url : "https://localhost:8080/rest/users/allPeriodistas",
        success : function (data) {
            appRankingPeriodistas.periodistas_vue = data;
        },
        error : function() {
            alert("No se pudo obtener ranking de periodistas!");
        }
    });
};
// ------------------------------- para pagina RANKING PERIODISTAS -----------------------------------------