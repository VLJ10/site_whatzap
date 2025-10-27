'use strict'


const message_erro = document.getElementById('erro')

async function buscarTodosUsuario(numero) {
    try {
        const response = await fetch(`https://api-zaz.onrender.com/v1/whatzapp/usuario/${numero}`)
        const dados = await response.json()
        console.log(dados)
        return dados

    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro)
        return false
    }
}

async function informacaoUsuario(numero) {

    const numeros = numero

    botaoEntra.disabled = true

    const usuario = await buscarTodosUsuario(numeros)

    botaoEntra.disabled = false

    if (usuario == false) {
        message_erro.textContent = 'Numero inválido!'
    }

    if (numeros === usuario.perfil.numero) {

        localStorage.setItem('numeroValido', JSON.stringify(numero))
        window.location.href = './page1/page1.html'
    }
}

const botaoEntra = document.getElementById('entra')
botaoEntra.addEventListener('click', async () => {
    const numero = inputNumero.value


    if (numero === '') {

        message_erro.textContent = 'Digite um Número antes de continuar'
        return

    }
    message_erro.textContent = ''
    await informacaoUsuario(numero)

})
const inputNumero = document.getElementById('inputNumero')
inputNumero.addEventListener('input', () => {
    inputNumero.value = inputNumero.value.replace(/[^0-9]/g, '')
})
