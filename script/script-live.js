userTeste = 'wendelldsant';
listaLiveMessage = [];

// #CREATE

function criaMensagem(dados){
    const newMessage = {
        message: dados.message,
        username: dados.username,
        idMessage: listaLiveMessage.lenght+1
    }
    listaLiveMessage.push(newMessage)
    readMessages();
}


// #READ

function readMessages(){
    const campoMessages = document.querySelector('#chat-messages');
    campoMessages.innerHTML = '';
    listaLiveMessage.forEach(element => {
        let message = document.createElement('div');
        message.id = `message${element.idMessage}`
        message.innerHTML = `
            <p> ${element.username} ${element.message}</p>
        `
        campoMessages.append(element)
    });
}

const btnEnviar = document.querySelector('#chat-send');
btnEnviar.addEventListener('click', function(event){
    event.preventDefault();
    let newMessage = criaMensagem({
        message: document.getElementById("chat-input").value,
        username: userTeste,
        id: 1
    });

    readMessages();
})