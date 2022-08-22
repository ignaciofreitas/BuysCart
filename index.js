document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('usuarios')){
        usuarios = JSON.parse(localStorage.getItem('usuarios'))
    }
})

let formulario = document.getElementById("form")


let usuarios = [];


formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    let nombreForm = document.getElementById("nombre").value
    let apellidoForm = document.getElementById("apellido").value
    let emailForm = document.getElementById("email").value
    let comentarioForm = document.getElementById("comentario").value
    let usuario={nombre: nombreForm, apellido: apellidoForm, email: emailForm, comentario: comentarioForm}
    usuarios.push(usuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
})
