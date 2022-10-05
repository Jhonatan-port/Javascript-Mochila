const form = document.getElementById("novoItem");
const lista = document.getElementById("lista"); 
const itens = JSON.parse(localStorage.getItem("itens")) || [];


itens.forEach((item) => {
    criaElemento(item);
});

form.addEventListener("submit", function(evento){
    evento.preventDefault();/*previne que a pagina de um "F5" automatico*/
   
    const nome = evento.target.elements['nome']; /* ambos estão pegando oque esta sendo escrito nos campos nome  equantiade atravers de um "id"*/
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value);

    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);

        itens[existe.id] = itemAtual;
    }else{

        itemAtual.id = itens.length;
 
        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens)); /*stringfy esta transformando um objeto em uma string*/

    nome.value = "";
    quantidade.value = "";
    
})

/*Funções*/
function criaElemento(item){

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");/* Adiciona a classe item ao nvoItem*/

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id/*utilizado para criar um atrbuto data, equivalente do html*/
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}