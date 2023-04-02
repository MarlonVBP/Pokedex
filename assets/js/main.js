
const buttom_pesquisa = document.getElementById('button_pesquisa');

buttom_pesquisa.addEventListener('click', () => {
    // Chamando elementos do HTML
    const img = document.getElementById('img_poke');
    const nome = document.getElementById('nome');
    const habilidade = document.getElementById('habilidade');
    const forma = document.getElementById('formas');
    const especie = document.getElementById('especie');
    const tipo = document.getElementById('tipo');
    const experiencia = document.getElementById('experiencia');
    const altura = document.getElementById('altura');

    // Pegando o valor do input
    const pokemom = document.getElementById('input_pesquisa').value;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemom}`;
    // Chamndo API
    async function getItem(url) {
        fetch(url)
            .then(response => response.json())
            .then(dados => {
                nome.innerText = `${dados['name']}`
                for (let i = 0, valido = `${dados['abilities']['length']}`; i < valido; i++) {
                    habilidade.innerHTML += `${dados['abilities'][i]['ability']['name']}<br>`
                }
                forma.innerText = `${dados['forms']['0']['name']}`
                especie.innerText = `${dados['species']['name']}`
                for (let i = 0, valido = `${dados['types']['length']}`; i < valido; i++) {
                    tipo.innerHTML += `${dados['types'][i]['type']['name']}<br>`
                }
                img.setAttribute('src', `${dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}`);
                experiencia.innerText = `${dados['base_experience']}`;
                altura.innerText = `${dados['height']}`
            })
            .catch(_ => { console.log(_) })
            .finally(() => { console.log('Processo finalizado!') });
    }
    getItem(url)    

    // Limpando os spans
    img.setAttribute('src', 'assets/imagens/pokemon-g4d28e9f6b_640.jpg');
    nome.innerText = 'Desconhecido'
    habilidade.innerText = ''
    forma.innerText = ''
    tipo.innerText = ''
    experiencia.innerText = ''
    altura.innerText = ''
})
