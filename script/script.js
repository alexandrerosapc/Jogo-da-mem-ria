let quantidade = prompt('Quantas cartas deseja receber?')
while ((quantidade % 2 !== 0) || (quantidade < 4) || (quantidade > 14)){
    alert("[ERRO]!!!! Digite novamente um número PAR entre 4 e 14.")
    quantidade = prompt('Quantas cartas deseja receber?')
}

let cartas = []


for (let i = 0; i < quantidade; i++){
    cartas [i] = `<div class="carta" onclick ="clicar()"><img src="img/front.png" alt=""></div>`;
    document.querySelector('.cartas').innerHTML += cartas[i];
}

function comparador() { 
	return Math.random() - 0.5; 
}

cartas.sort(comparador);


function clicar(){
    
}