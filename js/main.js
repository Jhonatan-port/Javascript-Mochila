
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista"); 
const itensDelete = document.querySelectorAll(".item")
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

    if(existe && validaItem(itemAtual)){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else if(!existe && validaItem(itemAtual)){

        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
 
        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens)); /*stringfy esta transformando um objeto em uma string*/

    nome.value = "";
    quantidade.value = "";
    
})

// lista.addEventListener("dblclick", function(evento){
//     console.log(itens.findo)
//     evento.target.remove();
// })

/*Funções*/
function criaElemento(item){

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");/* Adiciona a classe item ao nvoItem*/

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id/*utilizado para criar um atrbuto data, equivalente do html*/
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);

}

function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function validaItem(item){
    const erro = document.querySelector(".erro");
    if(item.nome.length === 0 || item.quantidade.length === 0){
        erro.style.visibility = 'visible';/* adicionar contador de 5s*/
        return false;
    }else{
        erro.style.visibility = 'hidden';
        return true;
    }
}

function  botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "x";

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentElement,id)
    })

    return elementoBotao;
}

