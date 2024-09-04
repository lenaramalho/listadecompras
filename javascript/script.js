const itemInput = document.getElementById("input-item");
const botaoSalvarItem = document.getElementById("adicionar-botao");
const listaDeCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-comprados");
let contador = 0;

// adicionar um novo item
function adicionarItem(event) {
    event.preventDefault();

    const itemTexto = itemInput.value.trim();
    if (!itemTexto) return; // não adiciona item se o input estiver vazio

    const itemDaLista = document.createElement("li");
    itemDaLista.classList.add("item-lista");

    const containerItemLista = document.createElement("div");
    containerItemLista.classList.add("item-lista-container");

    const containerNomeDoItem = document.createElement("div");
    containerNomeDoItem.classList.add("container-item-compra");

    const containerCheckbox = document.createElement("div");
    containerCheckbox.classList.add("checkbox-container");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.id = "checkbox-" + contador++;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkboxInput.id);

    const checkboxCustomizado = document.createElement("div");
    checkboxCustomizado.classList.add("checkbox-customizado");

    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(checkboxCustomizado);

    containerCheckbox.appendChild(checkboxLabel);
    containerNomeDoItem.appendChild(containerCheckbox);

    const nomeDoItem = document.createElement("p");
    nomeDoItem.id = "item-titulo";
    nomeDoItem.innerText = itemTexto;
    containerNomeDoItem.appendChild(nomeDoItem);

    const containerBotoes = document.createElement("div");
    containerBotoes.classList.add("botoes-container");

    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao-acao");
    botaoRemover.innerHTML = '<i class="ph ph-trash"></i>';
    botaoRemover.addEventListener("click", () => {
        itemDaLista.remove();
    });

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-acao");
    botaoEditar.innerHTML = '<i class="ph ph-pencil-simple"></i>';
    botaoEditar.addEventListener("click", () => {
        const novoTexto = prompt("Editar item:", itemTexto);
        if (novoTexto !== null && novoTexto.trim() !== "") {
            nomeDoItem.innerText = novoTexto.trim();
        }
    });

    containerBotoes.appendChild(botaoRemover);
    containerBotoes.appendChild(botaoEditar);

    containerItemLista.appendChild(containerNomeDoItem);
    containerItemLista.appendChild(containerBotoes);
    itemDaLista.appendChild(containerItemLista);

    const itemData = document.createElement("p");
    itemData.classList.add("item-lista-texto");
    itemData.innerText = `${new Date().toLocaleDateString("pt-BR", { weekday: "long" })} (${new Date().toLocaleDateString()}) às ${new Date().toLocaleTimeString("pt-BR", { hour: "numeric", minute: "numeric" })}`;
    itemDaLista.appendChild(itemData);

    listaDeCompras.appendChild(itemDaLista);
    itemInput.value = ""; // limpar o campo de input
}

// atualizar o checkbox
function atualizarEstadoCheckbox(event) {
    const checkboxInput = event.target;
    const checkboxCustomizado = checkboxInput.nextElementSibling;
    const itemTitulo = checkboxInput.closest(".item-lista-container").querySelector("#item-titulo");
    const itemDaLista = checkboxInput.closest(".item-lista");

    if (checkboxInput.checked) {
        checkboxCustomizado.classList.add("checked");
        itemTitulo.style.textDecoration = "line-through";
        if (!listaComprados.contains(itemDaLista)) {
            listaComprados.appendChild(itemDaLista);
        }
    } else {
        checkboxCustomizado.classList.remove("checked");
        itemTitulo.style.textDecoration = "none";
        if (!listaDeCompras.contains(itemDaLista)) {
            listaDeCompras.appendChild(itemDaLista);
        }
    }
}

// event listener ao container da lista de compras e lista de itens comprados
listaDeCompras.addEventListener("change", function(event) {
    if (event.target.classList.contains("checkbox-input")) {
        atualizarEstadoCheckbox(event);
    }
});

listaComprados.addEventListener("change", function(event) {
    if (event.target.classList.contains("checkbox-input")) {
        atualizarEstadoCheckbox(event);
    }
});

// evento de click ao botão para adicionar um item
botaoSalvarItem.addEventListener("click", adicionarItem);

// evento de keypress no input para capturar o Enter e adicionar o item
itemInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        adicionarItem(event);
    }
});
