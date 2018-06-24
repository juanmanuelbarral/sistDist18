var app = new Vue({
    el: "#prueba",
    data: {
        // DATOS DEL VUE
        personas:[
            {
                nombre:"Pedro",
                calificacion:0,
            },
            {
                nombre:"Juan",
                calificacion:0,
            },
            {
                nombre:"Lucia",
                calificacion:0,
            }
        ],
        calificaciones_vue : [],

    }
});

for (var i = 1; i <= 10; i++) {
    app.calificaciones_vue.push(i);
}

function funcionPrueba(){
    var texto = "";
    app.personas.forEach(function(persona){
        texto += " ";
        texto += persona.calificacion;
    });
    console.log(texto);
}

var lis = app.personas;

function comprobacion(lista){
    var len = lista.length;
    for(var i=0; i<len; i++){
        console.log(lista[i].calificacion);
        if(lista[i].calificacion == 0){
            console.log("entro al if");
            return false;
            console.log("paso por arriba del return");
        }

    }
    return true;
}

var jsonson = JSON.stringify(app.personas[0]);

function hola(){
    alert("hola");
}


// Boton para enviar las calificaciones al servidor
$("#btn-enviar-calificaciones").on("click", function(){
    var idUsuario = usuario.email;
    var idPartido = appCalificacion.partido_selected.id;
    var listaJugadores = appCalificacion.jugadores_vue;
    var len = listaJugadores.length;
    
    enviarCalificacionesRecursiva(idUsuario, idPartido, listaJugadores, len-1);
});

function enviarCalificacionesRecursiva(idUsuario,idPartido, listaJugadores, indice){
    console.log("entrada recursiva: " + indice);
    if(indice < 0){
        console.log("se registraron calificaciones");
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
                    // ver si volver a intentar mandar. Peligro de loop.
                }
            });
        } else{
            console.log("calificacion de 0 encontrada");
        }
    }
}