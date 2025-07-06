const users = [
    {name: 'rodolfo', age: 33, contact: '(19) 94343-3334 ' },
    {name: 'paulo', age: 32, contact: '(11) 93443-3435' },
    {name: 'aline', age: 31, contact: '(19) 94566-3737' },
    {name: 'maria', age: 13, contact: '(15) 94321-2342' },
    {name: 'jose', age: 29, contact: '(14) (19) 97265-0432' },
]

users.forEach(function(item, index, array){
    if(item.age < 18){
        console.log(`${item.name}, posição ${index} é menor de idade`)
    }
   // console.log(item)
   // console.log(index)
})