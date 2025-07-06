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


// Adicionar + 10 em cada produto 
// Filtrar so os em promoçao 
//saber quel é o faturamento se vendermos todos em promoçao


const faturamentoToral = produtos.map( produto => {
    return { ...produto, quantidade: produto.quantidade + 10}
}).filter( produto => produto.temDesconto).reduce( (acumulador, produto) => acumulador + ( produto.quantidade * produto.preco), 0 )

console.log(faturamentoToral.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}))