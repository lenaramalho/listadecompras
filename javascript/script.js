document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('input-item');
    const botaoSalvarItem = document.getElementById('adicionar-botao');
    const listaDeCompras = document.getElementById('lista-de-compras');
    const listaComprados = document.getElementById('lista-comprados');
    const mensagemListaVazia = document.getElementById('mensagem-lista-vazia');
    const tituloComprados = document.getElementById('titulo-comprados'); // Adicione isso para o título "Comprados"
    const hrComprados = document.getElementById('hr-comprados'); // Adicione isso para o segundo <hr>
    let contador = 0;

    // items ocultados inicialmente
    listaComprados.style.display = 'none';
    tituloComprados.style.display = 'none';
    hrComprados.style.display = 'none';

    // armazenar itens adicionados via input
    let itensAdicionadosPeloInput = [];

    // verificar a visibilidade da mensagem
    function verificarMensagemListaVazia() {
        const itensAdicionados = listaDeCompras.querySelectorAll('li[data-adicionado-pelo-input="true"]');
        const todosComprados = Array.from(itensAdicionados).every(item => item.querySelector('.checkbox-input').checked);

        if (itensAdicionados.length === 0 || todosComprados) {
            mensagemListaVazia.style.display = 'block';
        } else {
            mensagemListaVazia.style.display = 'none';
        }
    }

    // atualizar a visibilidade da lista de comprados
    function atualizarVisibilidadeListaComprados() {
        const itensComprados = listaComprados.querySelectorAll('li');
        if (itensComprados.length > 0) {
            listaComprados.style.display = 'block';
            tituloComprados.style.display = 'block'; // Mostra o título
            hrComprados.style.display = 'block'; // Mostra o <hr>
        } else {
            listaComprados.style.display = 'none';
            tituloComprados.style.display = 'none'; // Oculta o título
            hrComprados.style.display = 'none'; // Oculta o <hr>
        }
    }

    // adicionar novo item
    function adicionarItem(event) {
        event.preventDefault();

        const itemTexto = itemInput.value.trim();
        if (!itemTexto) return; // não adiciona item se o input estiver vazio

        const itemDaLista = document.createElement('li');
        itemDaLista.classList.add('item-lista');
        itemDaLista.dataset.adicionadoPeloInput = true;

        const containerItemLista = document.createElement('div');
        containerItemLista.classList.add('item-lista-container');

        const containerNomeDoItem = document.createElement('div');
        containerNomeDoItem.classList.add('container-item-compra');

        const containerCheckbox = document.createElement('div');
        containerCheckbox.classList.add('checkbox-container');

        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('checkbox-input');
        checkboxInput.id = 'checkbox-' + contador++;

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', checkboxInput.id);

        const checkboxCustomizado = document.createElement('div');
        checkboxCustomizado.classList.add('checkbox-customizado');

        checkboxLabel.appendChild(checkboxInput);
        checkboxLabel.appendChild(checkboxCustomizado);

        containerCheckbox.appendChild(checkboxLabel);
        containerNomeDoItem.appendChild(containerCheckbox);

        const nomeDoItem = document.createElement('p');
        nomeDoItem.classList.add('item-titulo');
        nomeDoItem.innerText = itemTexto;
        containerNomeDoItem.appendChild(nomeDoItem);

        const containerBotoes = document.createElement('div');
        containerBotoes.classList.add('botoes-container');

        const botaoRemover = document.createElement('button');
        botaoRemover.classList.add('botao-acao');
        botaoRemover.innerHTML = '<i class="ph ph-trash"></i>';
        botaoRemover.addEventListener('click', () => {
            if (confirm("Tem certeza de que deseja remover este item?")) {
                itemDaLista.remove();
                itensAdicionadosPeloInput = itensAdicionadosPeloInput.filter(i => i !== itemDaLista);
                verificarMensagemListaVazia(); 
                atualizarVisibilidadeListaComprados(); 
            }
        });

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('botao-acao');
        botaoEditar.innerHTML = '<i class="ph ph-pencil-simple"></i>';
        botaoEditar.addEventListener('click', () => {
            const novoTexto = prompt('Editar item:', itemTexto);
            if (novoTexto !== null && novoTexto.trim() !== '') {
                nomeDoItem.innerText = novoTexto.trim();
            }
        });

        containerBotoes.appendChild(botaoRemover);
        containerBotoes.appendChild(botaoEditar);

        containerNomeDoItem.appendChild(containerBotoes);
        containerItemLista.appendChild(containerNomeDoItem);
        itemDaLista.appendChild(containerItemLista);

        const itemData = document.createElement('p');
        itemData.classList.add('item-lista-texto');
        itemData.innerText = `${new Date().toLocaleDateString('pt-BR', { weekday: 'long' })} (${new Date().toLocaleDateString()}) às ${new Date().toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' })}`;
        itemDaLista.appendChild(itemData);

        listaDeCompras.appendChild(itemDaLista);
        itensAdicionadosPeloInput.push(itemDaLista); // Adiciona o item à lista de itens adicionados pelo input
        itemInput.value = ''; // Limpar o campo de input

        verificarMensagemListaVazia(); 
        atualizarVisibilidadeListaComprados(); 
    }

    // atualizar o estado dos checkboxes
    function atualizarEstadoCheckbox(event) {
        const checkboxInput = event.target;
        const checkboxCustomizado = checkboxInput.nextElementSibling;
        const itemTitulo = checkboxInput.closest('.item-lista-container').querySelector('.item-titulo');
        const itemDaLista = checkboxInput.closest('li');

        if (checkboxInput.checked) {
            checkboxCustomizado.classList.add('checked');
            itemTitulo.style.textDecoration = 'line-through';
            if (!listaComprados.contains(itemDaLista)) {
                listaComprados.appendChild(itemDaLista);
            }
        } else {
            checkboxCustomizado.classList.remove('checked');
            itemTitulo.style.textDecoration = 'none';
            if (!listaDeCompras.contains(itemDaLista)) {
                listaDeCompras.appendChild(itemDaLista);
            }
        }

        verificarMensagemListaVazia(); 
        atualizarVisibilidadeListaComprados(); 
    }

    botaoSalvarItem.addEventListener('click', adicionarItem);
    itemInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            adicionarItem(event);
        }
    });

    listaDeCompras.addEventListener('change', function(event) {
        if (event.target.classList.contains('checkbox-input')) {
            atualizarEstadoCheckbox(event);
        }
    });

    listaComprados.addEventListener('change', function(event) {
        if (event.target.classList.contains('checkbox-input')) {
            atualizarEstadoCheckbox(event);
        }
    });
    
    verificarMensagemListaVazia();
});
