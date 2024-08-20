function insert(num) {

    var numero = document.getElementById('resultado').innerHTML     // pega o valor que foi inserido
    document.getElementById('resultado').innerHTML = numero + num // pega o valor que ja tinha e insere um novo valor
}


            //APAGA TUDO
function limpar() {
    document.getElementById('resultado').innerHTML = ""
}


            //APAGA UM DE CADA VEZ
function voltar() {
    var resultado = document.getElementById('resultado').innerHTML
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length - 1)
}

function calcular() {
    var resultado = document.getElementById('resultado').innerHTML
    if(resultado)
    {
        document.getElementById('resultado').innerHTML = eval(resultado)
    }
}