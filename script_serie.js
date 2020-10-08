window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNamesSerie = [];
var opnioes_serie = document.querySelector('#opnioes_serie');
var ul_serie = document.createElement('ul_serie');
var Input_serie = document.getElementById('Input_serie');
var form_serie = document.getElementById('Formulario_serie');
var PosicaoSerie;


var IsEditing = false;


function start() {
  PrevenirComportamentoDefault(form_serie);
  AplicarFoco(Input_serie);
  CapturarValoresDigitados(Input_serie);
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
      var ValorDigitadoSerie = event.target.value; // Obtendo conteudo digitado

      // Editar e inseris se algo for digitado
      if (ValorDigitadoSerie) {
        if (IsEditing) {
          // Editando valores
          GlobalNamesSerie.splice(PosicaoSerie, 1, ValorDigitadoSerie);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNamesSerie.push(ValorDigitadoSerie); // Inserindo no array GlobalNames
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
  ul_serie.innerHTML = '';
  Input_serie.value = '';

  

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNamesSerie.forEach(PercorrerVetor);
  opnioes_serie.appendChild(ul_serie); // Adicionar ul na div nomes para ser exibida no site

}



function PercorrerVetor(item) {
  var li = document.createElement('li');


 
  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul_serie.appendChild(li);
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
  var valorSerie = event.target.innerHTML;

  var indexSerie = GlobalNamesSerie.indexOf(valorSerie); // Identificando índice
  Input_serie.value = GlobalNamesSerie[indexSerie];
  AplicarFoco(Input_serie); // Aplicando Foco no Input
  IsEditing = true;
  PosicaoSerie = indexSerie;

}


// Deleta elementos da lista que forem clicados
ul_serie.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valorSerie = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var indexSerie = GlobalNamesSerie.indexOf(valorSerie); // Identificando índice
    GlobalNamesSerie.splice(indexSerie, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
}



);