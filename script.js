window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNames = [];
var opnioes = document.querySelector('#opnioes');
var ul = document.createElement('ul');
var Input = document.getElementById('Input');
var Input2 = document.getElementById('Input2');
var Input3 = document.getElementById('Input3');
var form = document.getElementById('Formulario');
var form2 = document.getElementById('Formulario2');
var form3 = document.getElementById('Formulario3');
var IsEditing = false;
var Posicao;

function start() {
  PrevenirComportamentoDefault(form);
  AplicarFoco(Input);
  CapturarValoresDigitados(Input);
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
      var ValorDigitado = event.target.value; // Obtendo conteudo digitado

      // Editar e inseris se algo for digitado
      if (ValorDigitado) {
        if (IsEditing) {
          // Editando valores
          GlobalNames.splice(Posicao, 1, ValorDigitado);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNames.push(ValorDigitado); // Inserindo no array GlobalNames
        }
      }

      ExibirVetor(); // Atualiza e Exibi vetor com novo valor
    }
  });
}

function ExibirVetor() {
  // Limpa conteudo da ul e input para ter novos valores
  ul.innerHTML = '';
  Input.value = '';

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNames.forEach(PercorrerVetor);
  opnioes.appendChild(ul); // Adicionar ul na div nomes para ser exibida no site
}

function PercorrerVetor(item) {
  var li = document.createElement('li');

  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul.appendChild(li); // Adicionando li na ul
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
  var valor = event.target.innerHTML;

  var index = GlobalNames.indexOf(valor); // Identificando índice
  Input.value = GlobalNames[index];
  AplicarFoco(Input); // Aplicando Foco no Input
  IsEditing = true;
  Posicao = index;
}

// Deleta elementos da lista que forem clicados
ul.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valor = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var index = GlobalNames.indexOf(valor); // Identificando índice
    GlobalNames.splice(index, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
});