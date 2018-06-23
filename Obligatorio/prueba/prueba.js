var app = new Vue({
    el: "#prueba",
    data: {
        // DATOS DEL VUE
        personas:[
            {
                nombre:"Pedro",
                calificacion:34,
            },
            {
                nombre:"Juan",
                calificacion:1,
            },
            {
                nombre:"Lucia",
                calificacion:67,
            }
        ],
        calificaciones_vue : [0,1,2,3,4,5],

    }
});

for (var i = 0; i <= 10; i++) {
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