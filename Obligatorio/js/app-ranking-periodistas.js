//Codigo JS para ranking de periodistas

var fans = [];

var appRankingPeriodistas = new Vue({
    el: "#app-ranking-periodistas",
    data: {
        // DATOS DEL VUE
        periodistas_vue : [],
        //Objetos periodista que por lo menos tienen los atributos NOMBRE y PUNTAJE
    }
});

//Con jQuery y AJAX hay que solicitar los json de los periodistas
//Se podría llegar a hacer un filtro