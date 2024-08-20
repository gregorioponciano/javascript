
    function verificar() {
        var data = new Date()
        var ano = data.getFullYear()
        var fano = window.document.getElementById('txtano')
        var res = window.document.querySelector('div#res')
     
        if (fano.value.length == 0 || Number (fano.value) > ano) {
        window.alert('[ERRO] Verifique os dado e tente novamente!')
        } else {
            //var fsex = document.querySelector("input[name='radsex']:checked").value;
            var fsex = document.getElementsByName('radsex')  
            var idade = ano - Number(txtano.value)
            var genero =  ''
            var img = document.createElement('img')
            img.setAttribute('id', 'foto')
            if (fsex[0].checked) {
                genero = 'Homem'
                if (idade >=0 && idade < 10) {
                    //criança
                    img.setAttribute('src', 'h12.png')
                } else if (idade < 21) {
                    //jovem
                    img.setAttribute('src', 'h20.png')
                } else if (idade < 50) {
                    //adulto
                    img.setAttribute('src', 'h44.png')
                } else  {
                    //idoso
                    img.setAttribute('src', 'h65.png')
                }
                
            }  else if (fsex[1].checked) {
                genero = 'Mulher'
                if (idade >=0 && idade < 10) {
                    //criança
                    img.setAttribute('src', 'm12.png')
                } else if (idade < 21) {
                    //jovem
                    img.setAttribute('src', 'm20.png')
                } else if (idade < 50) {
                    //adulto
                    img.setAttribute('src', 'm40.png')
                } else  {
                    //idosa
                    img.setAttribute('src', '65m.png')
                }
            }
            res.style.textAling = 'center'
            res.innerHTML = ` detectamos ${genero} com ${idade} anos`
            res.appendChild(img)
        }

        }
    