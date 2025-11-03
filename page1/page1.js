'use strict'

const numeros = JSON.parse(localStorage.getItem('numeroValido'))




async function buscarTodosUsuario(numero) {
    try {
        const response = await fetch(`https://api-zaz.onrender.com/v1/whatzapp/usuario/contatos/${numero}`)
        const dados = await response.json()
        return dados

    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro)
        return false
    }
}


async function buscarConversaExpecifica(numeros, contatoClick) {

    const response = await fetch(`https://api-zaz.onrender.com/v1/whatzapp/usuario/expecific/messages?userNumber=${numeros}&contactNumber=${contatoClick}`)
    const dados = await response.json()
    console.log(dados)
    return dados
}





async function exibirContatos(numeros) {

    const contato = await buscarTodosUsuario(numeros)

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


        containerContato.addEventListener('click', async () => {
            localStorage.setItem('numeroContato', JSON.stringify(cont.numero))
            mostrarConversa()

        })
    })



}

async function mostrarConversa() {


    const contatoClick = JSON.parse(localStorage.getItem('numeroContato'))
    console.log(contatoClick)

    const mensagens = await buscarConversaExpecifica(numeros, contatoClick)

    const mainSection2 = document.getElementById('messagem')

    mainSection2.replaceChildren(  )
    mensagens.trocaMensagem.mensagens.forEach(mensage => {


        const containermMensagens = document.createElement('div')
        containermMensagens.className = 'messagens'

        const nome = document.createElement('h3')
        nome.className = 'nome'
        nome.textContent = mensage.remetente

        const conteudo = document.createElement('p')
        conteudo.className = 'conteudo'
        conteudo.textContent = mensage.texto

        const horario = document.createElement('p')
        horario.className = 'hora'
        horario.textContent = mensage.hora

        if (mensage.remetente === numeros) {
            containermMensagens.classList.add('usuario')
        } else {
            containermMensagens.classList.add('contato') 
        }

        containermMensagens.append(nome, conteudo, horario)
        mainSection2.append(containermMensagens)
    })

}
exibirContatos(numeros)

