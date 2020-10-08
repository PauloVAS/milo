window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNamesFilme = [];
var opnioes_filme = document.querySelector('#opnioes_filme');
var ul_filme = document.createElement('ul_filme');
var Input_filme = document.getElementById('Input_filme');
var form_filme = document.getElementById('Formulario_filme');
var PosicaoFilme;


var IsEditing = false;


function start() {
  PrevenirComportamentoDefault(form_filme);
  AplicarFoco(Input_filme);
  CapturarValoresDigitados(Input_filme);
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
      var ValorDigitadoFilme = event.target.value; // Obtendo conteudo digitado

      // Editar e inseris se algo for digitado
      if (ValorDigitadoFilme) {
        if (IsEditing) {
          // Editando valores
          GlobalNamesFilme.splice(PosicaoFilme, 1, ValorDigitadoFilme);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNamesFilme.push(ValorDigitadoFilme); // Inserindo no array GlobalNames
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
  ul_filme.innerHTML = '';
  Input_filme.value = '';

  

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNamesFilme.forEach(PercorrerVetor);
  opnioes_filme.appendChild(ul_filme); // Adicionar ul na div nomes para ser exibida no site

}



function PercorrerVetor(item) {
  var li = document.createElement('li');


 
  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul_filme.appendChild(li);
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
  var valorFilme = event.target.innerHTML;

  var indexFilme = GlobalNamesFilme.indexOf(valorFilme); // Identificando índice
  Input_filme.value = GlobalNamesFilme[indexFilme];
  AplicarFoco(Input_filme); // Aplicando Foco no Input
  IsEditing = true;
  PosicaoFilme = indexFilme;

}


// Deleta elementos da lista que forem clicados
ul_filme.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valorFilme = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var indexFilme = GlobalNamesFilme.indexOf(valorFilme); // Identificando índice
    GlobalNamesFilme.splice(indexFilme, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
}



);