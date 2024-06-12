const listaUser = JSON.parse(localStorage.getItem('users'));
const loginCheck = JSON.parse(localStorage.getItem('loginCheck'));
userTeste = 'wendelldsant';
listaLiveMessage = [];
const campoMessages = document.querySelector('#chat-messages');
const btnEnviar = document.querySelector('#chat-send');
// #CREATE

function criaMensagem(dados){
    const newMessage = {
        message: dados.message,
        username: dados.username,
        idMessage: listaLiveMessage.length+1
    }
    listaLiveMessage.push(newMessage);
    readMessages();
}


// #READ

function readMessages(){
    campoMessages.innerHTML = '';
    if (listaLiveMessage.length!=0){
        listaLiveMessage.forEach(element => {
            const message = document.createElement('div');
            message.id = `message${element.idMessage}`
            message.innerHTML = `
                <p> ${element.username}: ${element.message}</p>
            `
            campoMessages.append(message)
        });
    }
    else{
        console.log('null')
    }

}


btnEnviar.addEventListener('click', function(event){
    event.preventDefault();
    let newMessage = criaMensagem({
        message: document.getElementById("chat-input").value,
        username: userTeste
    });
})