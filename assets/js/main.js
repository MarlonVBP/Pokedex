const buttom_pesquisa = document.getElementById('button_pesquisa');
const buttom_pesquisa_modal = document.getElementById('button_pesquisar_modal');

buttom_pesquisa.addEventListener('click', () => {
    iniciar();
})
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        iniciar();
    }
});

function iniciar() {
    // Pegando o valor do input
    const pokemom = document.getElementById('input_pesquisa').value.toLowerCase();
    if (pokemom) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemom}`;

        // Chamando elementos do HTML
        const img = document.getElementById('img_poke');
        const nome = document.getElementById('nome');
        const habilidade = document.getElementById('habilidade');
        const forma = document.getElementById('formas');
        const especie = document.getElementById('especie');
        const tipo = document.getElementById('tipo');
        const experiencia = document.getElementById('experiencia');
        const altura = document.getElementById('altura');

        // Chamndo API
        getItem(url, img, nome, habilidade, forma, especie, tipo, experiencia, altura)

        // Limpando os spans
        img.setAttribute('src', 'assets/imagens/pokemon-g4d28e9f6b_640.jpg');
        nome.innerText = 'Desconhecido'
        habilidade.innerText = ''
        forma.innerText = ''
        tipo.innerText = ''
        especie.innerText = ''
        experiencia.innerText = ''
        altura.innerText = ''
    }
}

function getItem(url, img, nome, habilidade, forma, especie, tipo, experiencia, altura) {
    fetch(url)
        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            nome.innerText = `${dados['name']}`
            especie.innerText = `${dados['species']['name']}`
            img.setAttribute('src', `${dados['sprites']['versions']['generation-v']['black-white']['animated'][`front_shiny`]}`);
            experiencia.innerText = `${dados['base_experience']}`;
            altura.innerText = `${dados['height']}`

            dados.abilities.forEach((item) => {
                habilidade.innerHTML += `${item['ability']['name']}<br>`
            })

            dados.forms.forEach((item) => {
                forma.innerHTML += `${item['name']}<br>`
            })

            dados.types.forEach((item) => {
                tipo.innerHTML += `${item['type']['name']}<br>`
            })

            // Limpando o input
            document.getElementById('input_pesquisa').value = '';
        })
        .catch(_ => { console.log(_) })
        .finally(() => { console.log('Processo finalizado!') });
}

function list_pokemons() {
    let list = document.getElementById('list_pokemon')
    let pokemon_name = []

    for (let index = 1; index < 1011; index++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${index}`

        fetch(url)
            .then(response => response.json())
            .then(dados => {
                pokemon_name.push(`${dados['name']}`)
            })
            .catch(_ => { console.log(_) });
    }
    setTimeout(() => {
        pokemon_name.sort()

        pokemon_name.forEach((_item, index) => {
            list.innerHTML += `
            <option value="${pokemon_name[index]}" class="form-control option">${pokemon_name[index]}</option>
            `;
        })

        exibir_escolha()
    }, 2000);

}
let button_modal = document.getElementById('button_pesquisar_modal');
let button_show_modal = document.getElementById('button_show_modal')

button_modal.addEventListener('click', () => {
    exiber_remove_show('remove')
    escolha_option();
})
button_show_modal.addEventListener('click', () => {
    exiber_remove_show('add')
})

function escolha_option() {
    let pokemom = document.getElementById('input_pesquisa');
    pokemom.value = document.querySelector('#list_pokemon').value;
    setTimeout(()=>{
        iniciar()
    },500)
}

function exiber_remove_show(dado) {
    if (dado == 'remove') {
        list_modal = document.querySelector('.list_pokemon_modal');
        list_modal.classList.remove('show');
    } else if (dado == 'add') {
        list_modal = document.querySelector('.list_pokemon_modal');
        list_modal.classList.add('show');
    }
}

function exibir_escolha() {
    button_show_modal.classList.add('show')
}


list_pokemons()

