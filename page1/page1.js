'use strict'

const numeros = JSON.parse(localStorage.getItem('numeroValido'))
console.log(numeros)

async function buscarTodosUsuario(numero) {
    try {
        const response = await fetch(`https://api-zaz.onrender.com/v1/whatzapp/usuario/contatos/${numero}`)
        const dados = await response.json()
        console.log(dados)
        return dados

    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro)
        return false
    }
}

async function exibirContatos(numeros) {

    const contato = buscarTodosUsuario(numeros)

    const main = document.getElementById('main')



    let arrayContatos = await contato

    arrayContatos.contatos.forEach(cont => {

        const containerContato = document.createElement('div')
        containerContato.className = 'contato'

        let img = document.createElement('img')
        img.src = `../img_contatos/${cont.imagem}`

        let containerInfo = document.createElement('div')
        containerInfo.className = 'informacoes_contato'

        let nome = document.createElement('h3')
        nome.className = 'nome_contato'
        nome.textContent = cont.nome

        let descricao = document.createElement('p')
        descricao.className = 'descricao_contato'
        descricao.textContent = cont.descricao

        containerInfo.append(nome, descricao)
        containerContato.append(img, containerInfo)
        main.append(containerContato)


    })



}
exibirContatos(numeros)

