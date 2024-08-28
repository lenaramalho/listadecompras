const item = document.getElementById("input-item");
const botaoSalvarItem = document.getElementById("adicionar-botao")

botaoSalvarItem.addEventListener("click", adicionarItem)

function adicionarItem(event) {
    event.preventDefault()
    
    const itemDaLista = document.createElement("li");
    const containerItemLista = document.createElement("div");
    containerItemLista.classList.add("item-lista-container");

    const containerNomeDoItem = document.createElement("div");
    const nomeDoItem = document.createElement("p");
    nomeDoItem.innerText = item.value;
    containerNomeDoItem.appendChild(nomeDoItem);

    const containerBotoes = document.createElement("div");
    const botaoRemover = document.createElement("button");
    botao removeEventListener.classList.add("botao-acao");

    const imagemRemover = document.createElement("img");

    itemDaLista.appendChild(containerItemLista);
}