let quantidade;
let primeiraCartaVirada = null;
let segundaCartaVirada = null;
let bloqueioClick = false;
let jogadas = 0;
let cartas = [];
let segundos = 0
let intervaloRelogio

function jogo(){
    quantidade = prompt('Quantas cartas deseja receber?');

    // Verifica se a quantidade de cartas é válida
    while (quantidade !== null && (quantidade % 2 !== 0 || quantidade < 4 || quantidade > 14)) {
        alert("[ERRO]!!!! Digite novamente um número PAR entre 4 e 14.");
        quantidade = prompt('Quantas cartas deseja receber?');
    }

    // Se o usuário cancelou, exiba uma mensagem
    if (quantidade === null) {
        alert("Opção não informada");
        document.querySelector('.relogio').remove()
        return; // Retorna para evitar iniciar o jogo sem a quantidade de cartas
    }

    // Zera as variáveis relacionadas ao jogo
    primeiraCartaVirada = null;
    segundaCartaVirada = null;
    bloqueioClick = false;
    jogadas = 0;
    cartas = []; // Limpa o array de cartas
    segundos = 0
    

    const images = [
        'img/bobrossparrot.gif',
        'img/bobrossparrot.gif',
        'img/explodyparrot.gif',
        'img/explodyparrot.gif',
        'img/fiestaparrot.gif',
        'img/fiestaparrot.gif',
        'img/metalparrot.gif',
        'img/metalparrot.gif',
        'img/revertitparrot.gif',
        'img/revertitparrot.gif',
        'img/tripletsparrot.gif',
        'img/tripletsparrot.gif',
        'img/unicornparrot.gif',
        'img/unicornparrot.gif'
        // Adicione mais caminhos de imagens conforme necessário
    ];

    // Preencher o array de cartas com a quantidade selecionada
    for (let i = 0; i < quantidade; i++) {
        cartas[i] = `
            <div class="carta" onclick="clicar(this)">
                <div class="back-face face"><img class="verso" src="${images[i]}" alt=""> </div>
                <div class="front-face face"><img class="frente" src="img/front.png" alt=""></div>
            </div>`;
    }

    // Embaralhar as cartas
    cartas.sort(() => Math.random() - 0.5);

    // Adicionar as cartas ao elemento com a classe "cartas"
    document.querySelector('.cartas').innerHTML = cartas.join('');

    iniciarRelogio()
   
}

function iniciarRelogio(){
    intervaloRelogio = setInterval(() => {
        segundos++;
        atualizarRelogio();
    }, 1000);
}

function atualizarRelogio(){
    const relogio = document.querySelector('.relogio');
    relogio.innerHTML = `${segundos}`
}

function clicar(elemento) {
    if (bloqueioClick) return; // Impede cliques enquanto as cartas estão sendo viradas

    if (!elemento.classList.contains('virada')) {
        jogadas++;

        if (primeiraCartaVirada === null) {
            // Virar a primeira carta
            elemento.classList.add('virada');
            primeiraCartaVirada = elemento;
        } else if (segundaCartaVirada === null) {
            // Virar a segunda carta
            elemento.classList.add('virada');
            segundaCartaVirada = elemento;

            // Verificar se as cartas são iguais
            if (primeiraCartaVirada.querySelector('.verso').src === segundaCartaVirada.querySelector('.verso').src) {
                // Cartas iguais
                primeiraCartaVirada = null;
                segundaCartaVirada = null;
                
                // Verificar se todas as cartas foram viradas corretamente
                if (document.querySelectorAll('.virada').length === cartas.length) {
                    setTimeout(() => {
                        let reiniciar = prompt(`Você ganhou em ${jogadas} jogadas e em ${segundos} segundos!

                        Deseja jogar novamente? (sim/não)`);
                        if (reiniciar.toLowerCase() === 'sim') {
                            clearInterval(intervaloRelogio)
                            document.querySelector('.relogio').innerHTML = '0'
                            jogo(); // Reinicia o jogo
                        } else {
                            alert('Obrigado por jogar!');
                            document.querySelector('.cartas').innerHTML = ''
                            document.querySelector('.relogio').remove()
                            clearInterval(intervaloRelogio)
                        }
                    }, 50);
                }
            } else {
                // Cartas diferentes
                bloqueioClick = true;
                setTimeout(() => {
                    primeiraCartaVirada.classList.remove('virada');
                    segundaCartaVirada.classList.remove('virada');
                    primeiraCartaVirada = null;
                    segundaCartaVirada = null;
                    bloqueioClick = false;
                }, 1000); // Aguarda 1 segundo antes de virar as cartas de volta
            }
        }
    }
}

// Iniciar o jogo
jogo();