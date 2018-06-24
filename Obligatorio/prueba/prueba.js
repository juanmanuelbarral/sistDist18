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
