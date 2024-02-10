var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

//------------------Configuração de dificuldade----------------------

if(nivel === 'normal') {
	//1500 milesimos de segundo
	criaMosquitoTempo = 1500 //1,5 segundos
} else if(nivel === 'dificil') {
	//1000
	criaMosquitoTempo = 1000 //1 segundo
} else if (nivel === 'chucknorris') {
	//750
	criaMosquitoTempo = 750 //0,5 segundos
}

//----------------Faz com que o mosquito nao passe da tela-----------------

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight //Retorna a altura do monitor
	largura = window.innerWidth //Retorna a largura do monitor

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//-----------------Cronometro---------------------------------------

var cronometro = setInterval(function() { //setInterval a cada segundo

	tempo -= 1

	if(tempo < 0) { //Se o tempo ficar 0 acabou
		clearInterval(cronometro) //Zera o cronometro
		clearInterval(criaMosca) //Zera a mosca
		window.location.href = 'vitoria.html' //Muda pra vitoria
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1450) //A cada 1450 milesimos de seguno muda

//----------------------Posição Randomica-----------------------------

function posicaoRandomica() {
    // Remover o mosquito anterior, se existir
    var mosquitoAnterior = document.getElementById('mosquito');
    if (mosquitoAnterior) {
        mosquitoAnterior.remove();

        // Redirecionar para a página de fim de jogo se o número de vidas for maior que 3
        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html';
            return; // Sair da função para evitar a criação de um novo mosquito
        } else {
            // Alterar a imagem do coração para vazio
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }

    // Gerar coordenadas aleatórias para posicionar o mosquito
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    // Criar o elemento HTML para o mosquito
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';

    mosquito.onclick = function() {
        // Remover o mosquito
        this.remove();
    
        // Criar o elemento HTML para a nova imagem
        var imagemSubstituta = document.createElement('img');
        imagemSubstituta.src = 'imagens/sangue.png'; // Altere para o caminho da nova imagem desejada
        imagemSubstituta.style.position = 'absolute';
        imagemSubstituta.style.left = posicaoX + 'px'; // Certifique-se de definir a posição correta para a nova imagem
        imagemSubstituta.style.top = posicaoY + 'px'; // Certifique-se de definir a posição correta para a nova imagem
    
        // Adicionar a nova imagem ao corpo do documento
        document.body.appendChild(imagemSubstituta);
    
        // Reproduzir o som de clique
        var somClick = new Audio('musica/som-click.mp3');
        somClick.volume = 0.2;
        somClick.play();
    };
    
    
    

    // Adicionar evento de passar o mouse sobre o mosquito para alterar o cursor
    mosquito.onmouseover = function() {
        this.style.cursor = 'url("imagens/mata_mosca_batendo.png"), auto'; // Alterar o cursor do mouse
    };

    // Adicionar o mosquito ao corpo do documento
    document.body.appendChild(mosquito);
}

//-------------------Faz com que o mosquito tenha um tamanho aleatorio--------------------------

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

//--------------------Coloca o mosquito aleatoriamente--------------------------------------------

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}


