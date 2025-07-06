/* Functions / Funções
    
        [] Função VOID (vazia)
        [] Função com parametros
        [] Função Return
        [] Função function
        [] Arrow Function

*/

function meuNome() {  // VOID nao usa return
        console.log('gregorio ponci')
}

meuNome();


function digaUmNome(nome){ // com parametros. no lugar do nome poderia ser uma variavel
    console.log(nome)
} 
digaUmNome('maria');
digaUmNome('rodolfo');

function digaUmNumero(numero1, numero2) { // com parametros. no lugar do numero poderia ser uma variavel
    const resultado = numero1 + numero2
    console.log(resultado)
}

digaUmNumero(2, 4)



function estaEndividado(receita, gastos) {  // funçao com return
    if(receita > gastos) {
        return 'esta no azul'
    }
    else {
        return 'esta no vermelho'
    }
    
}

const maria = estaEndividado(40, 30)
const joao = estaEndividado(30, 40)

console.log(maria, joao)

function abacate() {} // forma classica
const abacate = () => { // forma moderna arrow function
    console.log('gregorio')

}

abacate()
