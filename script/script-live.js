const listaUser = JSON.parse(localStorage.getItem('users'));
const loginCheck = JSON.parse(localStorage.getItem('login_check'));
const userOnline = loginCheck ? loginCheck.username : null;
let listaLiveMessage = JSON.parse(localStorage.getItem('liveMessages')) || [];
const campoMessages = document.querySelector('#chat-messages');
const btnEnviar = document.querySelector('#chat-send');

window.onload = function() {
    verifyUser();
    readMessages();
}

function verifyUser() {
    if (!userOnline) {
        let redeSocial = document.getElementById('chat-form');
        redeSocial.innerHTML = ''
        redeSocial.innerHTML = `
        <h4>Faça login para enviar mensagens!</h4>
        `
    }
}
// #CREATE

function criaMensagem(dados){
    const newMessage = {
        message: dados.message,
        username: dados.username,
        idMessage: listaLiveMessage.length+1
    }
    listaLiveMessage.push(newMessage);
    saveMessages();
    readMessages();
}


// #READ

function readMessages(){
    campoMessages.innerHTML = '';
    if (listaLiveMessage.length!=0){
        listaLiveMessage.forEach(element => {
            if(element.username === loginCheck.username){
                const message = document.createElement('div');
                message.className = 'chat-message'
                message.id = `message${element.idMessage}`
                message.innerHTML = `
                    <p style = "color: green"> ${element.username}: ${element.message}</p>
                    <button class="delete-button" id="delete${element.idMessage}" onclick = "deleteMessage(${element.idMessage})"><i class="fas fa-trash"></i></button>
                `
                campoMessages.append(message);
            }
            else{
                const message = document.createElement('div');
                message.className = 'chat-message'
                message.id = `message${element.idMessage}`
                message.innerHTML = `
                    <p> ${element.username}: ${element.message}</p>
                `
                campoMessages.append(message)
            }

        });
    }
    else{
        campoMessages.innerHTML = `
        <p style = "color:gray">Seja o primeiro a comentar!</p>
        `
    }

}

// #DELETE
function deleteMessage(id){
    listaLiveMessage = listaLiveMessage.filter(message => message.idMessage !== id);
    saveMessages();
    readMessages();
}

function saveMessages() {
    localStorage.setItem('liveMessages', JSON.stringify(listaLiveMessage));
}

btnEnviar.addEventListener('click', function(event){
    event.preventDefault();
    let newMessage = criaMensagem({
        message: document.getElementById("chat-input").value,
        username: userOnline
    });
})

