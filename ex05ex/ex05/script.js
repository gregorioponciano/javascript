function carregar() {
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('imagem')
    var data = new Date()
    var hora = data.getHours()
    var minuto = data.getMinutes()
    //var hora = 21
    msg.innerHTML = `Agora são ${hora}:${minuto} horas`
    if (hora >= 0 && hora < 12) {
        img.src = 'manha.png'
        window.document.body.style.background = '#91AEB1'
        //BOM DIA!
    }
    else if (hora >= 12 && hora < 18) {
        img.src = 'tarde.png'
        window.document.body.style.background = '#BE9674'
        //BOA TARDE!
    }
    else {
        img.src = 'noite.png'
        window.document.body.style.background = '#7E2B13'
        //BOA NOITE!
    }

}