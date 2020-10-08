window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNamesAnime = [];
var opnioes_anime = document.querySelector('#opnioes_anime');
var ul_anime = document.createElement('ul_anime');
var Input_anime = document.getElementById('Input_anime');
var form_anime = document.getElementById('Formulario_anime');
var PosicaoAnime;


var IsEditing = false;


function start() {
  PrevenirComportamentoDefault(form_anime);
  AplicarFoco(Input_anime);
  CapturarValoresDigitados(Input_anime);
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
      var ValorDigitadoAnime = event.target.value; // Obtendo conteudo digitado

      // Editar e inseris se algo for digitado
      if (ValorDigitadoAnime) {
        if (IsEditing) {
          // Editando valores
          GlobalNamesAnime.splice(PosicaoAnime, 1, ValorDigitadoAnime);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNamesAnime.push(ValorDigitadoAnime); // Inserindo no array GlobalNames
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
  ul_anime.innerHTML = '';
  Input_anime.value = '';

  

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNamesAnime.forEach(PercorrerVetor);
  opnioes_anime.appendChild(ul_anime); // Adicionar ul na div nomes para ser exibida no site

}



function PercorrerVetor(item) {
  var li = document.createElement('li');


 
  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul_anime.appendChild(li);
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
  var valorAnime = event.target.innerHTML;

  var indexAnime = GlobalNamesAnime.indexOf(valorAnime); // Identificando índice
  Input_anime.value = GlobalNamesAnime[indexAnime];
  AplicarFoco(Input_anime); // Aplicando Foco no Input
  IsEditing = true;
  PosicaoAnime = indexAnime;

}


// Deleta elementos da lista que forem clicados
ul_anime.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valorAnime = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var indexAnime = GlobalNamesAnime.indexOf(valorAnime); // Identificando índice
    GlobalNamesAnime.splice(indexAnime, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
}



);