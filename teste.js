var teste

function captura(){
    var aux;
    var val = fetch('http://localhost:8080/jogos',{method:'get'})
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        aux = data;
        console.log(aux);
    })
    .catch(function(err){
        console.error('Failed retrieving information', err);
    });
    console.log(val);
    return aux;
}
const value = captura();