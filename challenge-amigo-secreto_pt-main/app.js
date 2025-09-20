//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let participantes = [];
let nomesDisponiveis = [];
let sorteios = {}; // Guarda os sorteios de cada participante

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        atualizarLista();
        input.value = '';
        nomesDisponiveis = participantes.slice(); // Atualiza nomes disponíveis
    }
}

function atualizarLista() {
    const ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';
    participantes.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        ul.appendChild(li);
    });
}

function limparLista() {
    participantes = [];
    nomesDisponiveis = [];
    sorteios = {};
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
}

function embaralhar(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Sorteia todos de uma vez, garantindo que ninguém tire a si mesmo
function sortearTodos() {
    if (participantes.length < 2) {
        document.getElementById('resultado').innerHTML = '<li>Adicione pelo menos dois participantes.</li>';
        return;
    }
    let sorteados;
    let tentativas = 0;
    do {
        sorteados = embaralhar(participantes.slice());
        tentativas++;
        // Garante que ninguém tire a si mesmo
    } while (participantes.some((nome, i) => nome === sorteados[i]) && tentativas < 100);

    if (tentativas === 100) {
        document.getElementById('resultado').innerHTML = '<li>Não foi possível sortear sem repetições. Tente novamente.</li>';
        return;
    }

    sorteios = {};
    participantes.forEach((nome, i) => {
        sorteios[nome] = sorteados[i];
    });

    mostrarListaRevelar();
}

function mostrarListaRevelar() {
    const resultadoUl = document.getElementById('resultado');
    resultadoUl.innerHTML = '';
    participantes.forEach(nome => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nome}: <span id="amigo-${nome}">******</span></span>
            <button onclick="toggleRevelar('${nome}')">Revelar</button>
        `;
        resultadoUl.appendChild(li);
    });
}

function toggleRevelar(nome) {
    const span = document.getElementById(`amigo-${nome}`);
    const btn = span.nextElementSibling;
    if (span.textContent === '******') {
        span.textContent = sorteios[nome];
        btn.textContent = 'Ocultar';
    } else {
        span.textContent = '******';
        btn.textContent = 'Revelar';
    }
}

function limparSorteio() {
    sorteios = {};
    document.getElementById('resultado').innerHTML = '';
}