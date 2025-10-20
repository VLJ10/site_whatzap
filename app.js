'use strict'

async function buscarTodosUsuario(numero) {
    const response = await fetch(`https://api-zaz.onrender.com/v1/whatzapp/usuario/${numero}`)
    const dados = await response.json()
    return dados
}

async function informacaoUsuario(numero) {
    const usuario = buscarTodosUsuario(numero)

    if (numero == usuario.perfil.numero) {
        
        return true
    } else {
        return false
    }
}

const botaoEntra = document.getElementById('entra')
botaoEntra.addEventListener('click', async () => {
    informacaoUsuario()
    
} )
const inputNumero = document.getElementById('inputNumero')
inputNumero.addEventListener('input', () => {
    inputNumero.value = inputNumero.value.replace(/[^0-9]/g ,'')
})
buscarTodosUsuario()