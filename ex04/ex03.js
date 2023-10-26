var agora = new Date()
var diaSem = agora.getDay()
/*
   0 Domingo
   1 Segunda
   2 Terça
   3 Quarta
   4 Quinta gravei na quinta 
   5 Sexta
   6 Sabado
*/

 // if (diaSem == 4)
 // console.log('Quinta')

 console.log(`Hoje é ${diaSem}`)
 // podemons usa switch{ + case  + break } 
 // podemos usar case
 // break no final para parar a ação
 switch(diaSem) {
    case 0:
        console.log('Domingo')
        break
    case 1:
        console.log('Segunda')
        break
    case 2:
        console.log('Terça')
        break
    case 3:
        console.log('Quarta')
        break
    case 4:
        console.log('Quinta')
        break
    case 5:
        console.log('Sexta')
        break
    case 6:
        console.log('Sabado')
        break

    default: //default prevenindo erros
        console.log('[ERRO] Dia inválido!')
        break //opiconal
        
 }

 
