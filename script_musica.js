window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNamesMusica = [];
var opnioes_musica = document.querySelector('#opnioes_musica');
var ul_musica = document.createElement('ul_musica');
var Input_musica = document.getElementById('Input_musica');
var form_musica = document.getElementById('Formulario_musica');
var PosicaoMusica;


var IsEditing = false;


function start() {
  PrevenirComportamentoDefault(form_musica);
  AplicarFoco(Input_musica);
  CapturarValoresDigitados(Input_musica);
  ExibirVetor();
}

function PrevenirComportamentoDefault(Objeto) {
  Objeto.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}

function AplicarFoco(Objeto) {
  Objeto.focus();
}

function CapturarValoresDigitados(Objeto) {
  Objeto.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      var ValorDigitadoMusica = event.target.value; // Obtendo conteudo digitado

      // Editar e inseris se algo for digitado
      if (ValorDigitadoMusica) {
        if (IsEditing) {
          // Editando valores
          GlobalNamesMusica.splice(PosicaoMusica, 1, ValorDigitadoMusica);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNamesMusica.push(ValorDigitadoMusica); // Inserindo no array GlobalNames
        }
      }

      ExibirVetor(); // Atualiza e Exibi vetor com novo valor
    }
  });
}

function PrevenirComportamentoDefaultF(ObjetoF) {
  ObjetoF.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}

function AplicarFocoF(ObjetoF) {
  ObjetoF.focus();
}



function ExibirVetor() {
  // Limpa conteudo da ul e input para ter novos valoresy
  ul_musica.innerHTML = '';
  Input_musica.value = '';

  

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNamesMusica.forEach(PercorrerVetor);
  opnioes_musica.appendChild(ul_musica); // Adicionar ul na div nomes para ser exibida no site

}



function PercorrerVetor(item) {
  var li = document.createElement('li');


 
  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul_musica.appendChild(li);
}



function CriarBotao() {
  var botao = document.createElement('button');
  // Adicionando classe DeleteButton
  botao.classList.add('DeleteButton');
  botao.textContent = 'x'; // Adicionando conteúdo x

  // Retornando botão criado ao ponto de chamada desta função
  return botao;
}

function CriarSpan(valor) {
  var span = document.createElement('span');
  span.textContent = valor; // Adicionando o valor dentro do span
  span.classList.add('clicavel');
  span.addEventListener('click', EditarItem);
  // Retornando valor dentro do span
  return span;
}

function EditarItem(event) {
  // Capturando valor do elemento clicado
  var valorMusica = event.target.innerHTML;

  var indexMusica = GlobalNamesMusica.indexOf(valorMusica); // Identificando índice
  Input_musica.value = GlobalNamesMusica[indexMusica];
  AplicarFoco(Input_musica); // Aplicando Foco no Input
  IsEditing = true;
  PosicaoMusica = indexMuscia;

}


// Deleta elementos da lista que forem clicados
ul_musica.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valorMusica = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var indexMusica = GlobalNamesMusica.indexOf(valorMusica); // Identificando índice
    GlobalNamesMusica.splice(indexMusica, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
}



);