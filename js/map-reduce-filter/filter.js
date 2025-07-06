
const numeros = [1,2,3,4,5,6,7,8,9,10, 16]

const pares = numeros.filter(numero => {
    return numero % 2 === 0
})

console.log(pares)

/*
    Filter ( Filtrar o array )
        -Criar um novo array filtrando os valores desejados do array original
        - Voçe tem acesso a 3 dados:
            - Items por item do array
            - Posicçâo atual do array
            - Array Comleto
*/


const produtos = [
    {id: 1, nome: "Smartphone Galaxy S21", preco: 3999.99, temDesconto: true, quantidade: 1},
    {id: 2, nome: "Notebook Dell Inspiron", preco: 4500.00, temDesconto: false, quantidade: 3},
    {id: 3, nome: "Smart TV LG 55", preco: 2799.00, temDesconto: true, quantidade: 5},
    {id: 4, nome: "Fone de Ouvido Bluetooth JBL", preco: 299.00, temDesconto: false, quantidade: 2},
    {id: 5, nome: "Camera DSLR Canon", preco: 3200.00, temDesconto: true, quantidade: 1},
    {id: 6, nome: "Tablet iPad Air", preco: 4199.00, temDesconto: false, quantidade: 8},
    {id: 7, nome: "Console PlayStation 5", preco: 4699.00, temDesconto: true, quantidade: 2},
    {id: 8, nome: "Smartwatch Aple Watch", preco: 2499.00, temDesconto: false, quantidade: 7},
    {id: 9, nome: "Impressora HP Multifuncional", preco: 599.00, temDesconto: true, quantidade: 5},
    {id: 10, nome: "Caixa de Som Portátil Sony", preco: 1000.00, temDesconto: false, quantidade: 3}
]

// FILTRAR SOMENTO OS PRODUTOS EM PROMOÇAO

const promocao = produtos.filter(produto => !produto.temDesconto) // ! faz com que filtra os que nao estao em promocao (FALSE)


console.log(promocao)
