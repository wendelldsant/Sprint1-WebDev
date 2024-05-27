const username_id = document.getElementById('username');
const btn_cadastrar = document.getElementById('btn_cadastrar');
const error_msg_username = document.getElementById('error-message')
const name_id = document.getElementById('name')

function verificaEspacos(inputValue){
    if(inputValue.includes(' ')){
        console.log('alert')
        return true
    }
    else{
        return false
    }
}
function verificaUsername(){
    let username = username_id.value;
    if(username.length<10 || verificaEspacos(username)){
        console.log('okokok')
        error_msg_username.innerHTML = 'O ID de usuário deve ter no mínimo 10 caracteres'
        error_msg_username.setAttribute('style', 'color: red')
    }
    else{
        error_msg_username.innerHTML = ''
        username_id.setAttribute('style', 'border-color: green; border-width: 2px')
    }
}


btn_cadastrar.addEventListener('click', function(event){
    event.preventDefault();
    verificaUsername()
})

