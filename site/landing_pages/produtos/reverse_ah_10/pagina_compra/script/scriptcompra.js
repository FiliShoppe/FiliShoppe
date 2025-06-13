document.addEventListener('DOMContentLoaded', function () {
    // Funcionalidade para copiar os cupons
    const btnsCopiar = document.querySelectorAll('.validar-btn');

    btnsCopiar.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.previousElementSibling;

            // Copia o conteúdo do input
            navigator.clipboard.writeText(input.placeholder).then(() => {
                const textoOriginal = this.textContent;
                this.textContent = 'COPIADO!';
                this.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    this.textContent = textoOriginal;
                    this.style.backgroundColor = '#555';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar:', err);
            });
        });
    });

    // Contador regressivo com animação pulsante
    function iniciarContador() {
        const elementoContagem = document.querySelector('.contagem');

        let minutos = 14;
        let segundos = 59;

        const intervalo = setInterval(function () {
            segundos--;

            if (segundos < 0) {
                segundos = 59;
                minutos--;
            }

            if (minutos < 0) {
                minutos = 14;
                segundos = 59;
            }

            const minutosFormatados = minutos.toString().padStart(2, '0');
            const segundosFormatados = segundos.toString().padStart(2, '0');

            elementoContagem.textContent = `00:${minutosFormatados}:${segundosFormatados}`;

            // Adiciona classe para animação
            elementoContagem.classList.add('pulsando');

            // Remove após a animação
            setTimeout(() => {
                elementoContagem.classList.remove('pulsando');
            }, 400);
        }, 1000);
    }

    iniciarContador();

    // Animação pulsante nos botões de compra
    const botoesCompra = document.querySelectorAll('.botao-comprar');

    botoesCompra.forEach(botao => {
        setInterval(() => {
            botao.classList.toggle('pulse');
        }, 2000);
    });
});
// Rolagem suave ao clicar no link "Início" do footer
const linkInicio = document.getElementById('link-inicio');

if (linkInicio) {
    linkInicio.addEventListener('click', function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}
