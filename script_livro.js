window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNamesLivro = [];
var opnioes_livro = document.querySelector('#opnioes_livro');
var ul_livro = document.createElement('ul_livro');
var Input_livro = document.getElementById('Input_livro');
var form_livro = document.getElementById('Formulario_livro');
var PosicaoLivro;


var IsEditing = false;


function start() {
  PrevenirComportamentoDefault(form_livro);
  AplicarFoco(Input_livro);
  CapturarValoresDigitados(Input_livro);
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
      var ValorDigitadoLivro = event.target.value; // Obtendo conteudo digitado

      // Editar e inseris se algo for digitado
      if (ValorDigitadoLivro) {
        if (IsEditing) {
          // Editando valores
          GlobalNamesLivro.splice(PosicaoLivro, 1, ValorDigitadoLivro);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNamesLivro.push(ValorDigitadoLivro); // Inserindo no array GlobalNames
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
  ul_livro.innerHTML = '';
  Input_livro.value = '';

  

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNamesLivro.forEach(PercorrerVetor);
  opnioes_livro.appendChild(ul_livro); // Adicionar ul na div nomes para ser exibida no site

}



function PercorrerVetor(item) {
  var li = document.createElement('li');


 
  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul_livro.appendChild(li);
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
  var valorLivro = event.target.innerHTML;

  var indexLivro = GlobalNamesLivro.indexOf(valorLivro); // Identificando índice
  Input_livro.value = GlobalNamesLivro[indexLivro];
  AplicarFoco(Input_livro); // Aplicando Foco no Input
  IsEditing = true;
  PosicaoLivro = indexLivro;

}


// Deleta elementos da lista que forem clicados
ul_livro.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valorLivro = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var indexLivro = GlobalNamesLivro.indexOf(valorLivro); // Identificando índice
    GlobalNamesLivro.splice(indexLivro, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
}



);