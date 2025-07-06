const numeros = [1,2,3,4,5]

const soma = numeros.reduce((acumulador, atual) => {
    const total  = acumulador + atual

    return total
}, 1) // acumulador começa com 1

console.log(soma)

/*
    Reduce( Reduzir o array a um unico valor )
        - Reduz um array inteiro a um UNICO valor
            - Você tem acesso a 4 dados:
                - Acumulador
                - Valor Atual
                - Posição Atual
                - Array Completo
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
    {id: 10, nome: "Caixa de Som Portátil Sony", preco: 1000.00, temDesconto: true, quantidade: 3}
]


// QUAL SERA O FATURAMENTO, SE VENDERMOS TODO O ESTOQUE

const totalVendas = produtos.reduce((acumulador, produto) => {
    return acumulador + (produto.preco * produto.quantidade)
}, 0)

console.log(totalVendas.toLocaleString('pt-br', {
    style: 'currency', currency: 'BRL',
}),)