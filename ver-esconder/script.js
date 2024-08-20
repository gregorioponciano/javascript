const botao1 = document.getElementById('botao1');
const botao2 = document.getElementById('botao2');

botao1.addEventListener('click', function() {
    botao1.style.display = 'none';
    botao2.style.display = 'block';
});

botao2.addEventListener('click', function() {
    botao2.style.display = 'none';
    botao1.style.display = 'block';
});