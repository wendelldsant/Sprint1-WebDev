const username_id = document.getElementById('username');
const btn_cadastrar = document.getElementById('btn_cadastrar');
const error_msg_username = document.getElementById('error-message-username');
const error_msg_name = document.getElementById('error-message-name');
const name_id = document.getElementById('name');

function verificaEspacos(inputValue){
    let has_Space = false;
    if(inputValue.includes(' ')){
        console.log('alert');
        has_Space = true;
    }
    return has_Space;
}

function containsNumber(inputValue) {
    let has_Number = false;
    inputValue.split('').forEach(char => {
        if (!isNaN(char) && char !== ' ') {
            has_Number = true;
        }
    });
    return has_Number;
}

function verificaUsername(){
    let username = username_id.value;
    if(username.length<10 || verificaEspacos(username)){
        error_msg_username.innerHTML = 'O ID de usuário deve ter no mínimo 10 caracteres e não pode conter espaços' ;
        error_msg_username.setAttribute('style', 'color: red');
        username_id.setAttribute('style', 'border-color: red; border-width: 2px');
    }
    else{
        error_msg_username.innerHTML = '';
        username_id.setAttribute('style', 'border-color: green; border-width: 2px');
    }
}

function verificaName(){
    let name = containsNumber(name_id.value)
    if(name){
        error_msg_name.innerHTML = 'Não pode conter números' ;
        error_msg_name.setAttribute('style', 'color: red');
        name_id.setAttribute('style', 'border-color: red; border-width: 2px');
    }
    else{
        error_msg_name.innerHTML = '';
        name_id.setAttribute('style', 'border-color: green; border-width: 2px');
    }
    
}

btn_cadastrar.addEventListener('click', function(event){
    event.preventDefault();
    verificaUsername();
    verificaName();
})

