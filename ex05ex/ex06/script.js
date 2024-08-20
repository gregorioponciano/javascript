
    function calcular() {
        var data = new Date()
        var ano = data.getFullYear()
        var txtano = window.document.getElementById('txtano')
        var msg = window.document.getElementById('res')
        
        if (txtano.value.length == 0 || Number (txtano.value) > ano) {
        window.alert('[ERRO] Verifique os dado e tente novamente!')
        } else {
            var fsex = document.querySelector("input[name='radsex']:checked").value;
            var idade = ano - Number(txtano.value)
             
    
       
        }
        msg.innerHTML = "Você é " + fsex + " com " + idade + " anos." ;
        }
    