const key = "83fae9caeae8113a406628dd5cb2f6bc";

// Função chamada ao clicar no botão "Buscar"
function cliqueibuscar() {
    const cidade = document.querySelector(".input-cidade").value;
    if (cidade) {
        buscarcidade(cidade);
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
}
        // Escuta a tecla pressionada dentro do input
document.querySelector('.input-cidade').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        cliqueibuscar(); // chama a função ao apertar Enter
    }
});

// Buscar dados da cidade na API OpenWeather
async function buscarcidade(cidade) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        const dados = await resposta.json();

        if (dados.cod === 200) {
            colocardadosnatela(dados);
        } else {
            alert("Cidade não encontrada. Tente novamente.");
        }
    } catch (error) {
        alert("Erro ao buscar os dados. Verifique sua conexão com a internet.");
    }
}

// Exibir os dados na tela
function colocardadosnatela(dados) {
    const cidade = document.querySelector(".cidade");
    const temp = document.querySelector(".temp");
    const textoPrevisao = document.querySelector(".texto-previsao");
    const umidade = document.querySelector(".umidade");
    const iconeClima = document.querySelector("#icone-clima");

    cidade.innerHTML = `Tempo em ${dados.name}`;
    temp.innerHTML = `Temperatura: ${Math.round(dados.main.temp)}°C`;
    textoPrevisao.innerHTML = ` ${dados.weather[0].description}`;
    umidade.innerHTML = `Umidade: ${dados.main.humidity}%`;

    temp.style.color = 'red'
    textoPrevisao.style.color = 'rgb(129, 194, 44)';
    umidade.style.color = 'rgb(0, 162, 255)';

    const icone = dados.weather[0].icon;
    iconeClima.src = `https://openweathermap.org/img/wn/${icone}@2x.png`;
    iconeClima.alt = dados.weather[0].description;
    iconeClima.style.display = "block";


}

