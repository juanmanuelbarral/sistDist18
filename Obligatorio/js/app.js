//Objetos que pueden ser necesarios despues, o no... ver
var partidos = [];
var equipos = [];
var fans = [];
var periodistas = [];
// --------------------------------------------------------------------------------------


// Objeto Vue para la pagina de calificacion
var appCalificacion = new Vue({
    el: "#app-calificacion",
    data: {
        // DATOS DEL VUE
        partidos_vue : [],
        // Los objetos partido van a tener (al menos) los atributos LOCAL, VISITANTE, FECHA, HORA
        equipos_vue : [],
        // Los objetos equipo van a tener (al menos) los atributos NOMBRE (del pais), IMAGE (para la ruta a la bandera)
        // JUGADORES (una lista de los jugadores del equipo)
        // a su vez, lo jugadores tienen que tener un atributo NOMBRE
        calificaciones_vue : [],
        // crear la lista de calificaciones
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



// HACER JS PARA INDEX
// HACER JS PARA REGISTRAR
// HACER JS PARA RESULTADOS (similar a calificacion)



// ------------------------------- para pagina CALIFICACION -----------------------------------------
//con un for crear los elementos del array calificacines (del 1 al 10)

//hacer una solicitud AJAX con jQuery para obtener los partidos que se pueden calificar

//hacer una funcion para el boton calificar que obtiene los equipos involucrados en el partido
//entonces hace una solicitud AJAX con jQuery de la informacion de esos equipos

//adicionar un boton guardar que verifica se haya votado a todos los jugadores de los equipos, y envie las predicciones
//al servidor para que las haga persistentes en la base de datos
//mostrar mensajes de si se pudo o no registrar dichas predicciones

//se puede pensar alguna forma de actualizar periodicamente los datos por el tema de que importa el tiempo
// ------------------------------- para pagina CALIFICACION -----------------------------------------



// ------------------------------- para pagina RANKING FANS -----------------------------------------
//Con jQuery y AJAX hay que solicitar los json de los fans
//Se podría llegar a hacer un filtro
// ------------------------------- para pagina RANKING FANS -----------------------------------------



// ------------------------------- para pagina RANKING PERIODISTAS -----------------------------------------
//Con jQuery y AJAX hay que solicitar los json de los periodistas
//Se podría llegar a hacer un filtro
// ------------------------------- para pagina RANKING PERIODISTAS -----------------------------------------