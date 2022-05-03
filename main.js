/* Declarações das variáveis do html */

var response = undefined;
var interval = undefined;
var mensagemJson = {};
var origem = document.getElementById("origemInput");
var destino = document.getElementById("destinoInput");
var mensagens = document.getElementById("mensagens");






// Função pesquisar
function pesquisar() {
  destino.innerText = destino.value;
  // Tornando possível a comunicação assíncrona com um servidor web
  var xhr = new XMLHttpRequest();
  // Chamando este método para uma requisição já ativada (uma que open() já tenha sido chamada) é equivalente a chamar abort() .
  xhr.open(
    "GET",
    `https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${origem.value}&destino=${destino.value}`
  );
  // requisição ao servidor
  xhr.send(null);
  // onreadystatechange contém o manipulador de eventos que é chamado quando o evento readystatechange é disparado, 
  // ....ou seja, toda vez que a propriedade readyState do XMLHttpRequest é modificada. 
  xhr.onreadystatechange = function () {
    // readyState tem por objetivo identificar o status de carregamento de um documento.
    // Serve para interagir com a página em determinados estados de carregamento 4.

    // Estado 4 significa que a solicitação foi enviada, o servidor terminou de retornar a resposta e o navegador terminou de baixar o conteúdo da resposta.
    //  Portanto, é correto dizer que a chamada AJAX foi concluída.
    if (xhr.readyState === 4) {
      // quando o status for OK (Status == 200) ele resolve e quando diferente disso ele rejeita.
      if (xhr.status === 200) {
        // retorna todo o texto e o html que existem no elemento. 
        mensagens.innerHTML = "";
        // retornando o conteúdo do corpo da resposta como Array
        response = JSON.parse(xhr.responseText);
        console.log(response);
        // Laços e iterações 
        for (let x = 0; x < response.length; x++) {
          // criando um objeto já criado e retornado a função
          var li = document.createElement("li");
          var dd = document.createElement("dd");
          var texto = document.createTextNode(`${response[x].mensagens}`);
          // inserindo o dd  a estrutura addText.
          dd.appendChild(addText);
          // inserindo o li  a estrutura add.
          li.appendChild(add);
          // Se origem for igual a origem li adiciona txt direita e add adiciona fun_direita
          if (response[x].origem === origem.value) {
            li.classList.add("txt_direita");
            dd.classList.add("fun_direita");
          } else {
            add.classList.add("fun_esquerda");
          }
          // inserindo no chat  a estrutura li do DOM de um documento
          texto.appendChild(li);
        }
      }
    }
  };
}
// Fim de função pesquisar
var texto = function () {
  // O método clearInterval() limpa um timer definido com o método 
  clearInterval(interval);
  mensagemJson = {
    // valor a uma variavel
    destino: destino.value,
    origem: origem.value,
    mensagens: mensagens.value
  };

  var xhr = new XMLHttpRequest(); // Criando uma instância

  //está API disponível em linguagens de script para navegadores web tais como JavaScript. É utilizada para enviar requisições
  //... HTTP ou HTTPS diretamente para um servidor web e carregar os dados de resposta do servidor diretamente de volta ao script.
  xhr.open(
    "POST",
    "https://barth.com.br/ApiChatCliqx/chat/inserirMensagem.php"
  ); // Abrindo uma url

  xhr.send(JSON.stringify(mensagemJson)); // indicando se vai ter envio de algo ou não.

  xhr.onreadystatechange = () => {    // checando o status de prontidão.
    if (xhr.readyState === 4) { // se consegue acessar ou não a api, se retornar 4 eu tenho acesso api "ok"
      // checando se algo foi criado com exito 
      if (xhr.status === 201) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(JSON.parse(xhr.responseText));
      }
    }
  };


}



