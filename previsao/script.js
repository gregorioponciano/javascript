

const key = "83fae9caeae8113a406628dd5cb2f6bc"


        //botao de burcar ligado ao input da cidade
function cliqueibuscar() {

    const cidade = document.querySelector(".input-cidade").value

    buscarcidade(cidade)
}

//buscar cidade
async function buscarcidade(cidade) {

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then( resposta => resposta.json()) 

    colocardadosnatela(dados)
    
}

function colocardadosnatela(dados) {
    
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = "Temperatura de " + Math.floor( dados.main.temp) + "°C"
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "umidade de " + dados.main.humidity + "%"
    
    
}




