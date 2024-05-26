// function verifica_ID(event) {
//     event.preventDefault();

//     let id = document.getElementById('username').value;
//     let msgErro = document.getElementById('error-message');
//     let formulario = document.getElementById('registration-form')
//     formulario.setAttribute('style', 'background-color: red');
//     if (id === '2') { 
//      msgErro.innerHTML = 'Nome de Usuário Inválido';
//     }   

// }


// document.getElementById('registration-form').addEventListener('submit', verifica_ID);

// function verifica_ID_senha(event) {
//     event.preventDefault();

//     let id = document.getElementById('senha').value;
//     let msgErro = document.getElementById('error-message');

//     if (id === '2' && senha === '3') { 
//         msgErro.innerHTML = 'Nome de Usuário e Senha Inválido';
//     }   
// }

let cadastrar_btn = document.getElementById('Cadastrar')

function verificaUsername(id,event){
    let campo_id = document.querySelector(id)
    let usuario_id = document.getElementById('username').value;
    let erro_msg_username = document.getElementById('error-message-username');

    event.preventDefault();
    if(usuario_id.length<7){
        erro_msg_username.innerHTML = '<p>Usuário deve conter mais de 7 digitos</p>';
    }
    else{
        erro_msg_username.innerHTML = '';
        console.log('usuario aprovado');  
        campo_id.setAttribute('style', 'border-color: green; border-width: 2px');   
    }

}

// function verificaNome(id){
//     let usuario_nome = document.getElementById("name");
//     if (isNaN(usuario_nome)){
//         erro_msg_name.innerHTML = '';
//         campo_id.setAttribute('style', 'border-color: green; border-width: 2px');
//     }
// }

cadastrar_btn.addEventListener('click', verificaUsername())

