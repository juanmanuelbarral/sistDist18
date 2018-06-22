//Codigo JS para ranking de fans

var fans = [];

var appRankingFans = new Vue({
    el: "#app-ranking-fans",
    data: {
        // DATOS DEL VUE
        fans_vue : [],
        //Objetos fan que por lo menos tienen los atributos NOMBRE y PUNTAJE
    }
});

//Con jQuery y AJAX hay que solicitar los json de los fans
//Se podría llegar a hacer un filtro