const numeros = [1, 2, 3, 4, 5];

const dobro = numeros.map((numero) => {
   return numero * 4;
});

console.log(dobro); // [4, 8, 12, 16, 20]



/*
   Map (Mepear item por item do Array)
   - Criar um novo array com a mesma qunaridade de itens do array original
   - O novo array Voce opode alterar o que quiser em relação ao array original.
   - Voce tem acesso a 3 dados:
      - Item por item do array
      - Posição atual do array
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
    {id: 10, nome: "Caixa de Som Portátil Sony", preco: 1000.00, temDesconto: false, quantidade: 3}
]


   // CRIAR UM NOVO ARRAY FORMATANDO A MOEDA E DANDO DESCONTO AOS CLIENTS
const novosProdutos = produtos.map( produto => {
const novoPreco = produto.temDesconto ? produto.preco * 0.9 : produto.preco
   return {
      id: produto.id,
      nome:  produto.nome,
      preco: novoPreco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}),
      quantidade: produto.quantidade

    // Ternario = IF / else ? = if / : else
   }
})

console.log(novosProdutos)